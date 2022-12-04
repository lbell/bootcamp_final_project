import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { createReport, updateReport, deleteReport } from "../api-airtable";

export default function TrailReportForm({
  trailID,
  setUpdated,
  editableData,
  edit,
  setEdit,
}) {
  //   console.log(editableData.index); // DEBUG

  const empty = {
    index: "",
    trailID: trailID,
    status: "",
    comment: "",
    date: "",
    reporter: "",
  };
  const [data, setData] = useState(empty);

  useEffect(() => {
    if (editableData.index) {
      setData(editableData);
    }
  }, [editableData]);

  function handleBlur(event) {
    setData({
      ...data,
      [event.target.id]: event.target.value,
    });
  }

  function handleStatusBlur(event) {
    setData({
      ...data,
      status: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (data.trailID === "") {
      alert("No trail selected. How did you even get here?");
      return;
    }
    if (data.status === "") {
      alert("Please select a status");
      return;
    }
    if (data.index === "") {
      // create a new report
      let result = await createReport(data);
      if (result) handleCancel(event.target);
    } else {
      // update an existing report
      let result = await updateReport(data);
      if (result) handleCancel(event.target);
    }
  }

  function handleCancel(target) {
    setData(empty);
    target.reset();
    setUpdated(true);
    setEdit(false);
  }

  async function handleDelete(event) {
    event.preventDefault();
    let result = await deleteReport(data.index);
    if (result) handleCancel(event.target.parentElement);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" onBlur={handleStatusBlur}>
        <Form.Check
          inline
          label="Clear"
          name="group1"
          type="radio"
          id="status-clear"
          value="Clear"
          onChange={handleStatusBlur}
          checked={data.status === "Clear"}
        />
        <Form.Check
          inline
          label="Minor Issues"
          name="group1"
          type="radio"
          id="status-issues"
          value="Minor Issues"
          onChange={handleStatusBlur}
          checked={data.status === "Minor Issues"}
        />
        <Form.Check
          inline
          label="Closed"
          name="group1"
          type="radio"
          id="status-closed"
          value="Closed"
          onChange={handleStatusBlur}
          checked={data.status === "Closed"}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="comment">
        <Form.Label>Comments</Form.Label>
        <Form.Control
          onBlur={handleBlur}
          type="text"
          defaultValue={data.comment}
          placeholder="Enter more details"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="reporter">
        <Form.Label>Reporter</Form.Label>
        <Form.Control
          onBlur={handleBlur}
          type="text"
          placeholder="Enter your name"
          defaultValue={data.reporter}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
      {edit && (
        <Button variant="danger" type="button" onClick={handleDelete}>
          Delete
        </Button>
      )}
    </Form>
  );
}
