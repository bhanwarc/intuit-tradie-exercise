import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";

interface MultiSelectProps extends SelectProps {
  label?: string;
  options: any[];
  value?: any;
  helperText?: any;
  error?: boolean;
  onChange: (value: any) => void;
}

const SelectField = ({
  id,
  label,
  options,
  value,
  helperText,
  error,
  onChange,
}: MultiSelectProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id={id + "-label"}>{label}</InputLabel>
      <Select
        labelId={id + "-label"}
        id={id}
        value={value}
        label={label}
        onChange={handleChange}
        error={error}
      >
        {options.map((op, index) => (
          <MenuItem key={index} value={op.value}>
            {op.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText error={error}>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default SelectField;
