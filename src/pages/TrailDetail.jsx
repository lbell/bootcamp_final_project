import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TrailVitals from "../components/TrailVitals";
import TrailInfo from "../components/TrailInfo";
import { getTrailInfo } from "../api-airtable";
import Title from "../components/Title";
import { compressTrailUsers } from "../helpers";

export default function TrailDetail({ trails }) {
  const { trailID } = useParams();
  const [trailInfo, setTrailInfo] = useState({});

  useEffect(() => {
    async function fetchData() {
      let result = await getTrailInfo(trailID);
      result = await compressTrailUsers(result);
      setTrailInfo(result);
    }
    fetchData();
  }, [trailID]);

  return (
    <div>
      <Title>
        <h1>{trailInfo.name}</h1>
      </Title>
      <TrailVitals trail={trailInfo} />
      <TrailInfo trail={trailInfo} />
    </div>
  );
}
