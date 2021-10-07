import { Snackbar } from "@mui/material";
import React from "react";

const SnackBar = () => {
  return (
    // <div>
    <Snackbar
      open={true}
      //   autoHideDuration={6000}
      //   onClose={handleClose}
      message="Note archived"
      //   action={action}
    />
    // </div>
  );
};

export default SnackBar;
