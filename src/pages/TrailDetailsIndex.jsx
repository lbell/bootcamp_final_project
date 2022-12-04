import { Link } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import React from "react";
// import { Table } from "react-bootstrap";

export default function TrailDetailsIndex({ trailInfo }) {
  //   console.log(trailInfo); // DEBUG

  const columns = [
    { field: "TRAIL_NO", headerName: "Trail #", width: 70 },
    {
      field: "TRAIL_NAME_LOWER",
      headerName: "Name",
      width: 300,
      renderCell: (params) => (
        <Link href={`/trail-detail/${params.row.ECTA_index}`}>
          {params.value}
        </Link>
      ),
    },
    { field: "difficulty", headerName: "Difficulty", width: 130 },
    { field: "distance", headerName: "Distance", width: 130 },
    { field: "openTo", headerName: "Open To", width: 130 },
  ];

  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        getRowId={(row) => row.ECTA_index}
        rows={trailInfo}
        columns={columns}
        // autoPageSize={true}
        pagination={true}
        autoHeight={true}
        // pageSize={20}
        // rowsPerPageOptions={[20]}
        // checkboxSelection
      />
    </div>
  );
}
