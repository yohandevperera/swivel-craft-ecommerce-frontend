import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

/**
 * Usage - This component is used as a dialog box to delete employee records.
 *
 * Description - The component is build based on the material UI Dialog components
 *
 * @props openState @typedef boolean
 * @props setOpenState @typedef React.Dispatch<React.SetStateAction<boolean>>
 * @props employeeId @typedef string
 * @props handleDelete @typedef function
 */

interface DeleteEmployeeDialogProps {
  openState: boolean;
  setOpenState: React.Dispatch<React.SetStateAction<boolean>>;
  employeeId: string;
  handleDelete: (employeeId: string) => void;
}

const DeleteEmployeeDialog: React.FC<DeleteEmployeeDialogProps> = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={props.openState}
        onClose={() => props.setOpenState(false)}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Delete Employee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to delete this record? This process cannot be
            undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => props.setOpenState(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => props.handleDelete(props.employeeId)}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteEmployeeDialog;
