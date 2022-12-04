import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { getRecentReports } from "../api-airtable";
import TrailReportForm from "../components/TrailReportForm";
import TrailReportItem from "../components/TrailReportItem.jsx";
import TrailReportItemPlaceholder from "../components/TrailReportItemPlaceholder";

export default function TrailReport({ trails }) {
  let navigate = useNavigate();
  const numReports = 3;
  const { trailID } = useParams();
  const [updated, setUpdated] = useState(false);
  const [trail, setTrail] = useState({});
  const [reports, setReports] = useState([]);
  const [editableData, setEditableData] = useState({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    // Get the properties for the trail that matches the trailID
    let result = trails.features.find((feature) => {
      return feature.properties.ECTA_index === Number(trailID);
    });

    // If there is no matching record, redirect to 404 page
    if (result) {
      setTrail(result.properties);

      async function fetchData() {
        const recentReports = await getRecentReports(trailID, numReports);
        // reverse the array so the most recent report is last
        setReports(recentReports.reverse());
      }

      fetchData();
    } else {
      navigate("/404");
    }
  }, [updated, navigate, trailID, trails]);

  useEffect(() => {
    setUpdated(false);
  }, [updated]);

  let maybePlaceholder;
  if (reports.length === 0) {
    maybePlaceholder = Array(numReports)
      .fill()
      .map((item, index) => {
        return (
          <div key={index}>
            <TrailReportItemPlaceholder />
          </div>
        );
      });
  } else {
    maybePlaceholder = reports.map((reportData) => {
      return (
        <div key={reportData.index}>
          <TrailReportItem
            reportData={reportData}
            setEditableData={setEditableData}
            setEdit={setEdit}
          />
        </div>
      );
    });
  }

  const maybeTrailNumber = trail.TRAIL_NO ? `#${trail.TRAIL_NO}` : "";

  return (
    <div>
      <h2>
        {trail.TRAIL_NAME_LOWER} {maybeTrailNumber}
      </h2>
      <hr />
      {reports.length === 0 ? (
        <p>No reports! Why not be the first...</p>
      ) : (
        <p>Latest trail reports</p>
      )}
      <Container>
        <Row>
          <Col xs={3}>
            <p className="fw-bold">Date</p>
          </Col>
          <Col xs={2}>
            <p className="fw-bold">Status</p>
          </Col>
          <Col>
            <p className="fw-bold">Comment</p>
          </Col>
          <Col xs={1}></Col>
        </Row>
        {maybePlaceholder}
      </Container>

      <Container className="bg-light mt-5 p-3">
        <h3>{edit ? "Edit Report" : "Add a report"}</h3>
        <TrailReportForm
          trailID={trailID}
          editableData={editableData}
          setUpdated={setUpdated}
          edit={edit}
          setEdit={setEdit}
        />
      </Container>
    </div>
  );
}
