import { ReactNode, useEffect, useState } from "react";
import {
  Backdrop,
  CircularProgress,
  ContainerProps,
  Container as PageContainer,
} from "@mui/material";
import AlertToast from "components/Core/Toast";
import { AlertColor } from "@mui/material/Alert";

type Props = {
  children: ReactNode;
  isPageLoading?: boolean;
  alert?: {
    show: boolean;
    type: AlertColor;
    text: string;
  };
};

const Container = (Props: Props & ContainerProps) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<AlertColor>();
  const [message, setMessage] = useState("");

  const { alert, isPageLoading, children, ...rest } = Props;

  useEffect(() => {
    if (alert) {
      setShowAlert(alert.show);
      setAlertType(alert.type);
      setMessage(alert.text);
    }
  }, [alert]);

  return (
    <PageContainer {...rest}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isPageLoading || false}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <AlertToast
        open={showAlert}
        alertType={alertType}
        message={message}
        onClose={() => setShowAlert(false)}
      />

      {children}
    </PageContainer>
  );
};

export default Container;
