import { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";

type Props = {
  open: boolean;
  message: string;
  duration?: number;
  alertType?: AlertColor;
  onClose: () => void;
};

const MuiToastAlert = (props: AlertProps, ref: any) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
};

const Alert = forwardRef<HTMLDivElement, AlertProps>(MuiToastAlert);

const Toast = ({ open, duration, message, alertType, onClose }: Props) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={duration || 5000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      message={message}
    >
      {alertType && (
        <Alert onClose={onClose} severity={alertType} sx={{ width: "100%" }}>
          {message}
        </Alert>
      )}
    </Snackbar>
  );
};

export default Toast;
