import { Box } from "@mui/material";
import React from "react";
import { ReactComponent as Equestrian } from "../icons/equestrian.svg";
import { ReactComponent as Hike } from "../icons/hike.svg";
import { ReactComponent as Bicycle } from "../icons/bicycle.svg";
import { ReactComponent as Motorcycle } from "../icons/motorcycle.svg";
import { ReactComponent as Atv } from "../icons/atv.svg";
import { ReactComponent as Fwd } from "../icons/4wd.svg";

function getUserType(user) {
  switch (user) {
    case "equestrian":
      return <Equestrian />;
    case "hike":
      return <Hike />;
    case "bicycle":
      return <Bicycle />;
    case "motorcycle":
      return <Motorcycle />;
    case "atv":
      return <Atv />;
    case "4wd":
      return <Fwd />;
    default:
      return null;
  }
}

export default function UsersGroups({ users }) {
  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center", height: 24 }}>
        {Array.isArray(users) &&
          users.map((user) => {
            return (
              <Box
                key={user}
                sx={{ display: "flex", ml: 0.5, mr: 0.5, height: 24 }}
              >
                {getUserType(user)}
              </Box>
            );
          })}
      </Box>
    </div>
  );
}
