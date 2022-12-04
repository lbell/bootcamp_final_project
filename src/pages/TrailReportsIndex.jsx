import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { getRecentReports } from "../api-airtable";
import TrailReportItem from "../components/TrailReportItem";
import { getObjectByValue } from "../helpers";

export default function TrailReportsIndex({ trailInfo }) {
  const [reports, setReports] = React.useState([]);
  console.log(trailInfo); // DEBUG

  useEffect(() => {
    // get all reports from the last week
    async function getMostRecentEach() {
      let allReports = await getRecentReports("all", "all");

      // Get the most recent report for each trail
      let culledReports = allReports.filter(
        (a, i) => allReports.findIndex((s) => a.trailID === s.trailID) === i
      );

      // Filter out any entries older than one week
      let weekReports = culledReports.filter(function (el) {
        return (
          Date.parse(el.date) > Date.now() - 7 * 24 * 60 * 60 * 1000 // within the last week
        );
      });

      setReports(weekReports);
    }
    getMostRecentEach();
  }, []);

  console.log(reports); // DEBUG

  return (
    <div>
      <h2>Latest Reports</h2>
      <p>
        These are the freshest reports for each trail. Only includes reports
        within the last week.
      </p>
      <Row className="fw-bold">
        <Col>Trail</Col>
        <Col xs={3}>Last Report</Col>
        <Col xs={2}>Status</Col>
        <Col>Comment</Col>
        <Col xs={1}>History</Col>
      </Row>
      {reports.map((report) => {
        const trailName = getObjectByValue(
          trailInfo,
          "ECTA_index",
          parseInt(report.trailID)
        )["TRAIL_NAME_LOWER"];

        return (
          <TrailReportItem
            key={report.index}
            reportData={report}
            preColumns={
              <Col>
                <a href={`/trail-detail/${report.trailID}`}>{trailName}</a>
              </Col>
            }
          />
        );
      })}
    </div>
  );
}
