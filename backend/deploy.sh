# !/bin/bash

function multiselect {
    # little helpers for terminal print control and key input
    ESC=$( printf "\033")
    cursor_blink_on(){
      printf "$ESC[?25h";
    }

    cursor_blink_off(){
      printf "$ESC[?25l";
    }

    cursor_to(){
      printf "$ESC[$1;${2:-1}H";
    }

    print_inactive(){
      printf "$2   $1 ";
    }

    print_active(){
      printf "$2  $ESC[7m $1 $ESC[27m";
    }

    get_cursor_row(){
      IFS=';' read -sdR -p $'\E[6n' ROW COL; echo ${ROW#*[};
    }

    key_input() {
      local key
      IFS= read -rsn1 key 2>/dev/null >&2
      if [[ $key = ""      ]]; then echo enter; fi;
      if [[ $key = $'\x20' ]]; then echo space; fi;
      if [[ $key = $'\x1b' ]]; then
        read -rsn2 key
        if [[ $key = [A ]]; then echo up;    fi;
        if [[ $key = [B ]]; then echo down;  fi;
      fi 
    }

    toggle_option() {
      local arr_name=$1
      eval "local arr=(\"\${${arr_name}[@]}\")"
      local option=$2
      if [[ ${arr[option]} == true ]]; then
        arr[option]=
      else
        arr[option]=true
      fi
      eval $arr_name='("${arr[@]}")'
    }

    local retval=$1
    local options=$2
    local defaults=$3

    IFS=';' read -r -a options <<< "$2"
    if [[ -z $3 ]]; then
      defaults=()
    else
      IFS=';' read -r -a defaults <<< "$3"
    fi
    local selected=()

    for ((i=0; i<${#options[@]}; i++)); do
      selected+=("${defaults[i]}")
      printf "\n"
    done

    # determine current screen position for overwriting the options
    local lastrow=`get_cursor_row`
    local startrow=$(($lastrow - ${#options[@]}))

    # ensure cursor and input echoing back on upon a ctrl+c during read -s
    trap "cursor_blink_on; stty echo; printf '\n'; exit" 2
    cursor_blink_off

    local active=0
    while true; do
      # print options by overwriting the last lines
      local idx=0
      for option in "${options[@]}"; do
        local prefix="[ ]"
        if [[ ${selected[idx]} == true ]]; then
          prefix="[\e[38;5;46m✔\e[0m]"
        fi

        cursor_to $(($startrow + $idx))
        if [ $idx -eq $active ]; then
            print_active "$option" "$prefix"
        else
            print_inactive "$option" "$prefix"
        fi
        ((idx++))
      done

      # user key control
      case `key_input` in
        space)  toggle_option selected $active;;
        enter)  break;;
        up)     ((active--));
                if [ $active -lt 0 ]; then active=$((${#options[@]} - 1)); fi;;
        down)   ((active++));
                if [ $active -ge ${#options[@]} ]; then active=0; fi;;
      esac
    done

    # cursor position back to normal
    cursor_to $lastrow
    printf "\n"
    cursor_blink_on

    local result=()
    for ((i=0; i<${#options[@]}; i++)); do
      if [[ ${selected[i]} == true ]]; then
        result+=("${options[i]}")
      fi
    done
    eval $retval='("${result[@]}")'
}

function selectoption {

  local retval=$1
  local menu=$2

  IFS=';' read -r -a menu <<< "$2"
    
  cur=0
  draw_menu() {
    for i in "${menu[@]}"; do
      if [[ ${menu[$cur]} == $i ]]; then
        tput setaf 2; echo " > $i"; tput sgr0
      else
        echo "   $i";
      fi
    done
  }

  clear_menu()  {
    for i in "${menu[@]}"; do tput cuu1; done
    tput ed
  }

  # Draw initial Menu
  draw_menu
  while read -r -sn1 key; do # 1 char (not delimiter), silent
    # Check for enter/space
    if [[ "$key" == "" ]]; then break; fi

    case $key in
      A) ((cur > 0)) && ((cur--));;
      B) ((cur < ${#menu[@]}-1)) && ((cur++));;
      C) ((cur < ${#menu[@]}-1)) && ((cur++));;
      D) ((cur > 0)) && ((cur--));;
    esac

    clear_menu
    draw_menu
  done

  eval $retval='("${menu[$cur]}")'
}

# select env
if getopts "e:" arg; then
  env="${OPTARG}"
  # TODO Add validation
else 
  echo "Select deployment env"
  selectoption env "staging;production"
fi
echo "Selected env ->" $env

# select stack for deployment
if getopts "d:" arg; then
  IFS=',' read -r -a deploystack <<< "$OPTARG"
  # TODO Add validation
else 
  echo "Select stack that you want to deploy"
  multiselect deploystack "api;cognito;database" ";;"
fi
echo "Selected stack ->" ${deploystack[@]}
echo "============================"

for ((i=0; i<${#deploystack[@]}; i++)); do
  case ${deploystack[i]} in
    "api")

      echo "Preparig .env ..."

      export $(grep -v '^#' .env.$env | xargs)
      
      DB_STACK_NAME="intuit-tradie-database-$env"
      SECRET=$(aws secretsmanager get-secret-value --secret-id ${DB_STACK_NAME} --region $REGION)
      SECRET_STRING=$(echo $SECRET | json SecretString)

      echo DB_NAME=$(echo $SECRET_STRING | json dbname) >> ".env.$env"
      echo DB_USERNAME=$(echo $SECRET_STRING | json username) >> ".env.$env"
      echo DB_PASSWORD=$(echo $SECRET_STRING | json password) >> ".env.$env"
      echo DB_HOST=$(echo $SECRET_STRING | json host) >> ".env.$env"
      echo DB_PORT=$(echo $SECRET_STRING | json port) >> ".env.$env"

      echo "Running db migration ..."
      yarn db:migrate:$env

      echo "Deploying API..."
      serverless deploy --stage $env

      if [ $? -ne 0 ]; then
        exit 1
      fi

      echo "Deployed API"
      echo "============================"
      ;;
    "cognito")
      echo "Deploying Cognito..."
      
      serverless deploy --config cognito.yml --stage $env
      if [ $? -ne 0 ]; then
        exit 1
      fi

      echo "Deployed Cognito"
      echo "============================"
      ;;
    "database")
      echo "Deploying Database..."
      
      serverless deploy --config database.yml --stage $env
      if [ $? -ne 0 ]; then
        exit 1
      fi

      echo "Deployed Database"
      echo "============================"
      ;;
  esac
done
