import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Box, InputLabel } from "@mui/material";

export const Input = (Props: TextFieldProps) => {
  return <TextField margin="normal" fullWidth {...Props} />;
};

export const Input2 = (Props: TextFieldProps) => {
  return (
    <Box mb={2}>
      {Props.label && <InputLabel error={Props?.error}>{Props.label}</InputLabel>}
      <TextField fullWidth sx={{ mt: "5px" }} {...Props} label="" />
    </Box>
  );
};

export const Textarea = (Props: TextFieldProps) => {
  return <TextField fullWidth multiline rows={4} {...Props} />;
};

export const Textarea2 = (Props: TextFieldProps) => {
  return (
    <Box mb={2}>
      {Props.label && <InputLabel error={Props?.error}>{Props.label}</InputLabel>}
      <TextField fullWidth multiline rows={4} sx={{ mt: "5px" }} {...Props} label="" />
    </Box>
  );
};

export default Input;
