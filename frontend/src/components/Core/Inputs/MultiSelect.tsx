import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import { FormControl, FormHelperText } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";

export type OptionType = {
  label: any;
  value: any;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface MultiSelectProps extends SelectProps {
  label?: string;
  options: OptionType[];
  selectValue: any;
  setSelectValue: (value: any) => void;
  helperText?: ReactNode;
}

const MultiSelect = ({
  labelId,
  label,
  options,
  selectValue,
  setSelectValue,
  helperText,
  ...rest
}: MultiSelectProps) => {
  const isAllSelected = options.length > 0 && selectValue.length === options.length;

  return (
    <FormControl margin="normal" fullWidth>
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <Select
        multiple
        value={selectValue}
        onChange={(event: SelectChangeEvent<typeof selectValue>) => {
          const {
            target: { value },
          } = event;

          if (value[value.length - 1] === "all") {
            setSelectValue(
              selectValue.length === options.length
                ? []
                : options.map((option) => option.value),
            );
            return;
          }
          setSelectValue(typeof value === "string" ? value.split(",") : value);
        }}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => {
          const selectedLabels = options
            .filter((option) => selected.includes(option.value))
            .map((option) => option.label);
          return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selectedLabels.sort().map((value: any) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          );
        }}
        MenuProps={MenuProps}
        {...rest}
      >
        <MenuItem value="all">
          <Checkbox
            checked={isAllSelected}
            indeterminate={selectValue.length > 0 && selectValue.length < options.length}
          />
          <ListItemText primary="Select All" />
        </MenuItem>
        {options.map((option: OptionType) => (
          <MenuItem key={option.value} value={option.value}>
            <Checkbox checked={selectValue.indexOf(option.value) > -1} />
            <ListItemText primary={option.label} />
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText error>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default MultiSelect;
