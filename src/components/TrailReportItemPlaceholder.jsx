import React from "react";
import { Col, Row } from "react-bootstrap";
import { Placeholder } from "react-bootstrap";

export default function TrailReportItemPlaceholder({ report }) {
  return (
    <div className="report-item">
      <Row>
        <Col>
          <Placeholder xs={12} bg="light" className="m-2" />
        </Col>
        <Col>
          <Placeholder xs={12} bg="light" className="m-2" />
        </Col>
        <Col>
          <Placeholder xs={12} bg="light" className="m-2" />
        </Col>
        <Col xs={1}>
          <Placeholder xs={12} bg="light" className="m-2" />
        </Col>
      </Row>
    </div>
  );
}
