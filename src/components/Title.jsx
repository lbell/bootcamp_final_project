import { Box } from "@mui/material";
import React from "react";

export default function Title(props) {
  return (
    <Box
      sx={{
        textAlign: "center",
        fontWeight: "bold",
      }}
    >
      {props.children}
    </Box>
  );
}
