import { ReactNode } from "react";
import { Card, CardContent, Modal } from "@mui/material";
import { Box } from "@mui/system";

type ModalType = {
  open: boolean;
  onClose: (open: boolean) => void;
  width?: string;
  children: ReactNode;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  pt: 2,
  px: 4,
  pb: 3,
};

const Popup = ({ open, width, onClose, children }: ModalType) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ ...style }} width={width || "500px"}>
        <Card>
          <CardContent>{children}</CardContent>
        </Card>
      </Box>
    </Modal>
  );
};

export default Popup;
