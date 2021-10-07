import { Snackbar } from "@mui/material";
import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { selectAlert } from "../../../redux/slices/alertSlice/alertSlice";

const StyledSnackBar = () => {
  const alertState = useAppSelector(selectAlert);

  return (
    // <div>
    <Snackbar
      open={true}
      autoHideDuration={6000}
      //   onClose={handleClose}
      message={alertState.message}
      //   action={action}
    />
    // </div>
  );
};

export default StyledSnackBar;
