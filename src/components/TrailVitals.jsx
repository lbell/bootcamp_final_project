import React from "react";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Box } from "@mui/material";
import Title from "./Title";
import { Item } from "./Item";
import Rating from "./Rating";
import Difficulty from "./Difficulty";
import UsersGroups from "./UsersGroups";

export default function TrailVitals({ trail }) {
  return (
    <div>
      <Box sx={{ flexGrow: 1, backgroundColor: "", padding: 1 }}>
        <Grid container spacing={2} sx={{mb: 3}}>
          <Grid xs>
            <Difficulty diff={trail.difficulty} />
          </Grid>
          <Grid xs>
            <UsersGroups users={trail.users} />
          </Grid>
          <Grid xs>
            <Rating rating={trail.rating} />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid xs={6} md>
            <Title>Distance</Title>
            <Item>
              {trail.distance} miles
              <br />
              {(trail.distance * 1.609344).toFixed(1)} km
            </Item>
          </Grid>
          <Grid xs={6} md>
            <Title>Climbing</Title>
            <Item>
              Asc: {trail.ascending ? trail.ascending.toLocaleString() : ""} ft
              <br />
              Desc: {trail.ascending
                ? trail.descending.toLocaleString()
                : ""}{" "}
              ft
            </Item>
          </Grid>
          <Grid xs={6} md>
            <Title>Elevation</Title>
            <Item>
              Max:{" "}
              {trail.max_elevation ? trail.max_elevation.toLocaleString() : ""}{" "}
              ft
              <br />
              Min:{" "}
              {trail.min_elevation
                ? trail.min_elevation.toLocaleString()
                : ""}{" "}
              ft
            </Item>
          </Grid>
          <Grid xs={6} md>
            <Title>Slope</Title>
            <Item>
              Avg: {trail.grade_avg * 100}%
              <br />
              Max: {trail.grade_max * 100}%
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
