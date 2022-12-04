import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

// This is the scaffolding page - lays everthing out.
// The <Outlet /> is a placeholder for the dynamic content.
// Info in the URL will determine what content is displayed.
// IF there is no info in the URL, then the DetailsIndex page will be displayed.

export default function TrailDetails(props) {
  //   console.log(props); // DEBUG

  return (
    <Container>
      <Outlet />
    </Container>
  );
}
