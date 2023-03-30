# Intuit-Tradie

# Frontend

# Frameworks used

`ReactTs: ^17.0.2`
`Yarn: 1.22.10`
`Serverless: >= 3.7` - used for deployment

#### Setup AWS

Install AWS cli, and configure:

```
brew install awscli
aws configure
```

`aws configure` - Enter `AWS Access Key ID` and `AWS Secret Access Key`

# Setup Project Locally

1. Install serverless `npm install -g serverless`
2. Clone repo
3. `cd to/project/root/directory`
4. Setup environment variables in .env file (Refer following section)
5. Install dependencies: `yarn install`
6. Build project: `yarn build`
7. To run on local machin: `yarn start`

# Setup Environment Variables

1. Create `.env` under project root directory
2. Enter following variables into .env file

```
REGION=
REACT_APP_STAGE=
// customer user pool
REACT_APP_C_USER_POOL_ID=
REACT_APP_C_CLIENT_ID=
// tradie user pool
REACT_APP_T_USER_POOL_ID
REACT_APP_T_CLIENT_ID=

REACT_APP_API_URL=
```

# How to deploy

##### From Local Machine:

1. Setup project including the environment variables
2. Run `serverless deploy --stage <STAGE>`
3. Deploy to staging `serverless deploy --stage staging`
4. Deploy to production `serverless deploy --stage production`
   **Note:** Update environment variable as per the stage before deploying

##### Deployment Automation:

1. Merge code or Push to `Main` branch will deploy the production
2. Merge code or Push to `Develop` branch will deploy the staging

# Backend

## Requirements

```
Node 14.*.*
Latest Yarn (1.17.3)
Serverless: >= 3.7
```

#### Setup AWS

Install AWS cli, and configure:

```
brew install awscli
aws configure
```

## Setup Environment Variables

1. Create `.env.staging` - for staging and local/development and created `.env.production` for production
2. Enter the following variables to environment file

```
REGION=
STAGE=
FE_URL=
DB_NAME=
DB_USERNAME=
DB_PASSWORD=
DB_HOST=
DB_PORT=
```

## Setup Project Locally

1. Install serverless `npm install -g serverless`
2. Clone repo
3. `cd to/project/root/directory`
4. Setup environment variables in .env file (Refer Setup Env Variables section)
5. Install dependencies: `yarn install`
6. To run on local machine: `yarn start`
7. To run it on local machine follow `Setup Cloud Architecture` section and then run `yarn start`

## Setup Cloud Architecture and Deploy (Staging and Production)

1. `cd to/project/root/directory`
2. Run `bash deploy.sh` 1. This will show options to select the stage 2. Select any stage by pressing Up/Down arrow on keyboard and press enter 3. After selecting stage it will show options of Stack to deploy 4. Move to options by pressing Up/Down arrow on keyboard and press space bar to select the option 5. Select `Cognito` and `Database`, and press enter this will setup Cognito and database 6. Update Cognito and Database related variables into environment variable file 7. Follow above steps and now select only `api` stack and press enter to deploy api
   **Note** Deploy required stack only (Deploy all if cloud architecture is not setup)

## Database Migrations

**Create Migration:** Refer https://sequelize.org/docs/v6/other-topics/migrations/#creating-the-first-model-and-migration
**Run Migration on Staging:** Run `db:migrate:staging`
**Run Migration on Staging:** Run `db:migrate:production`
