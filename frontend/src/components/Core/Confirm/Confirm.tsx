import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type ConfirmProps = {
  isOpen: boolean;
  title: string;
  description?: string;
  confirmBtnText: string;
  cancelBtnText: string;
  confirmfn: () => void;
  cancelfn: () => void;
};

const Confirm = ({
  isOpen,
  title,
  description,
  confirmBtnText,
  cancelBtnText,
  confirmfn,
  cancelfn,
}: ConfirmProps) => {
  return (
    <Dialog
      open={isOpen}
      onClose={cancelfn}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}

      {description && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
      )}

      <DialogActions>
        <Button color={"success"} onClick={cancelfn}>
          {cancelBtnText}
        </Button>
        <Button color={"error"} onClick={confirmfn}>
          {confirmBtnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Confirm;
