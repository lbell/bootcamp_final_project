import Button from "react-bootstrap/Button";
import React from "react";
import { ButtonGroup } from "react-bootstrap";

export default function PopupInfo({
  id,
  name,
  distance,
  elevation,
  difficulty,
  description,
}) {
  return (
    <div>
      <h4>{name}</h4>
      <p>Distance: {distance}</p>
      <p>Elevation: {elevation}</p>
      <p>Difficulty: {difficulty}</p>
      <p>Description: {description}</p>
      <ButtonGroup>
        <Button variant="outline-primary" href={`/trail-detail/${id}`}>
          More
        </Button>
        <Button variant="outline-primary" href={`/trail-report/${id}`}>
          Report
        </Button>
      </ButtonGroup>
    </div>
  );
}
