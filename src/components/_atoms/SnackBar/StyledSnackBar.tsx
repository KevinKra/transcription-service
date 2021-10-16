import { Alert, Snackbar } from "@mui/material";
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

  const showSnackBar: boolean =
    !!alertState.message && alertState.display !== "internal-only";

  // todo - update severity in redux to match alert handlers
  return (
    <Snackbar open={showSnackBar && open} autoHideDuration={6000}>
      <Alert
        className={`${alertState.type}-message`}
        onClose={handleClose}
        severity={alertState.type}
      >
        {alertState.message}
      </Alert>
    </Snackbar>
  );
};

export default StyledSnackBar;
