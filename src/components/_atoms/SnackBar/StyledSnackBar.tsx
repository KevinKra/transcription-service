import { Button, IconButton, Snackbar } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  clearAlert,
  selectAlert,
} from "../../../redux/slices/alertSlice/alertSlice";

const StyledSnackBar = (): JSX.Element => {
  const [open, setOpen] = useState(true);
  const alertState = useAppSelector(selectAlert);
  const dispatch = useAppDispatch();

  useEffect(() => {
    alertState.key && setOpen(true);
  }, [alertState]);

  const handleClose = (
    event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    dispatch(clearAlert());
  };

  const action = (
    <>
      <Button color="primary" size="small" onClick={handleClose}>
        Close
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        {/* <CloseIcon fontSize="small" /> */}
      </IconButton>
    </>
  );

  const showSnackBar: boolean =
    !!alertState.message && alertState.display !== "internal-only";

  return (
    <Snackbar
      open={showSnackBar && open}
      autoHideDuration={6000}
      message={alertState.message}
      onClose={handleClose}
      action={action}
    />
  );
};

export default StyledSnackBar;
