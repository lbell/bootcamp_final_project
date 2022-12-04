import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export default function Reports(props) {
  // console.log(props); // DEBUG

  return (
    <Container>
      <h1>Trail Reports</h1>
      <Outlet />
    </Container>
  );
}
