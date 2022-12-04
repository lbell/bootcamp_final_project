import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { timeAgo } from "../helpers";

export default function TrailReportItem({
  reportData,
  setEditableData,
  setEdit,
  preColumns,
}) {
  function handleEditClick() {
    setEdit(true);
    setEditableData(reportData);
  }

  return (
    <div className="report-item">
      <Row className="border-top">
		{/* Add columns before if needed */}
        {preColumns}
        <Col xs={3}>{timeAgo(reportData.date)}</Col>
        <Col xs={2}>{reportData.status}</Col>
        <Col>{reportData.comment}</Col>
        <Col xs={1}>
          {setEdit ? (
            <Button variant="link" size="sm" onClick={handleEditClick}>
              Edit
            </Button>
          ) : (
            <Button
              variant="link"
              size="sm"
              href={`/trail-report/${reportData.trailID}`}
            >
              History
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
}
