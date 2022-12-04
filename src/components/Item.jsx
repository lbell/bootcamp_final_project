import { Paper } from "@mui/material";
import React from "react";

export function Item(props) {
  return (
    <Paper
      elevation={4}
      sx={{
        p: 1,
        textAlign: "center",
      }}
    >
      {props.children}
    </Paper>
  );
}
