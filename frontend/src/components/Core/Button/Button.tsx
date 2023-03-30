import { FormEvent, PropsWithChildren } from "react";
import Button from "@mui/material/Button";
import { Progress } from "./Button.styles";

type Props = PropsWithChildren<{
  onClick: (e: FormEvent) => void;
  fullWidth?: boolean;
  variant: "text" | "outlined" | "contained";
  disabled?: boolean;
  isLoading?: boolean;
}>;

const Btn = ({ children, onClick, fullWidth, variant, disabled, isLoading }: Props) => {
  return (
    <Button
      fullWidth={fullWidth}
      variant={variant}
      sx={{ mt: 3, mb: 2 }}
      onClick={onClick}
      disabled={isLoading ? true : disabled}
      size="large"
    >
      {children}
      {isLoading && <Progress />}
    </Button>
  );
};
export default Btn;
