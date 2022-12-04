import React from "react";
import { Box } from "@mui/material";
import Star from "@mui/icons-material/Star";
import { StarBorder } from "@mui/icons-material";

export default function Rating({ rating }) {
  const empty = rating ? 5 - rating : 4;

  return (
    <Box sx={{ display: "flex", justifyContent: "center", height: 24 }}>
      {Array(rating)
        .fill()
        .map((star, index) => {
          return <Star key={index} />;
        })}
      {Array(empty)
        .fill()
        .map((star, index) => {
          return <StarBorder key={index} />;
        })}
    </Box>
  );
}
