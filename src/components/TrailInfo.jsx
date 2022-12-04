import { Box, Paper } from "@mui/material";
import React from "react";

export default function TrailInfo({ trail }) {
  //   console.log(trail); // DEBUG

  return (
    <Box sx={{ mt: 2 }}>
      <Paper
        elevation={4}
        sx={{
          p: 2,
          m: 4,
          fontStyle: "italic",
          fontWeight: 4,
          textAlign: "center",
        }}
      >
        {trail.teaser}
      </Paper>
      <h2>Description</h2>
      {trail.short_description}
      <h2>Details</h2>
      {trail.details}
    </Box>
  );
}
