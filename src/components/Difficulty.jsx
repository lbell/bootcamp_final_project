import React from "react";
import { ReactComponent as Blue } from "../icons/blue.svg";
import { ReactComponent as Black } from "../icons/black.svg";
import { ReactComponent as Green } from "../icons/green.svg";
import { ReactComponent as GreenBlue } from "../icons/greenblue.svg";
import { ReactComponent as BlueBlack } from "../icons/blueblack.svg";
import { ReactComponent as DoubleBlack } from "../icons/doubleblack.svg";
import { Box } from "@mui/system";

export default function Difficulty({ diff }) {
  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center", height: 24 }}>
        {(() => {
          switch (diff) {
            case "green":
              return <Green />;
            case "green-blue":
              return <GreenBlue />;
            case "blue":
              return <Blue />;
            case "blue-black":
              return <BlueBlack />;
            case "black":
              return <Black />;
            case "double-black":
              return <DoubleBlack />;
            default:
              return null;
          }
        })()}
      </Box>
    </div>
  );
}
