/**
 * This file takes standard api calls (like getRecentReports(trialID)) and translates
 * them in to airtable's unique API calls.
 *
 * Returns promises that resolve to the data requested.
 */
const Airtable = require("airtable");
const token = "keybsgJSLCrQQypOc"; // TODO: Hide in config somewhere
const base = new Airtable({ apiKey: token }).base("appb6JOOLhnlEHRxM");

/**
 * Gets the last x reports for a given trail id
 *
 * @param {int} trailID ECTA_Index of the trail to get
 * @returns object of the last X trail reports
 */
export async function getRecentReports(trailID, limit = 3) {
  const filter = trailID === "all" ? "" : `{trailID} = ${trailID}`;

  let allRecords = await base("Trail Reports")
    .select({
      filterByFormula: filter,
      sort: [{ field: "date", direction: "desc" }],
    })
    .all();

  // Cull the records that are over 30 days old
  await cullRecords(allRecords);

  // Process the promised records to return the expected output: object
  // with all fields and values (even if empty)
  async function processRecords(limit) {
    let limitedSet;
    if (limit === "all") {
      limitedSet = allRecords;
    } else {
      limitedSet = allRecords.slice(0, limit); // DEBUG
    }

    let recentReports = [];
    const reportFields = {
      index: "",
      trailID: "",
      date: "",
      status: "",
      comment: "",
      reporter: "",
    };
    for (let record of limitedSet) {
      recentReports.push({
        ...reportFields,
        ...record.fields,
        index: record.id,
      });
    }

    return recentReports;
  }

  return await processRecords(limit);
}

export async function createReport(report) {
  const newRecord = await base("Trail Reports").create([
    {
      fields: {
        trailID: report["trailID"],
        date: new Date().toISOString(),
        status: report["status"] || null,
        comment: report["comment"],
        reporter: report["reporter"],
      },
    },
  ]);
  return newRecord;
}

export async function updateReport(report) {
  console.log("Updating report", report);
  const updatedRecord = await base("Trail Reports").update(report.index, {
    date: report.date,
    status: report.status,
    comment: report.comment,
    reporter: report.reporter,
  });
  return updatedRecord;
}

export async function deleteReport(recordID) {
  console.log("Deleting record", recordID); // DEBUG
  const result = await base("Trail Reports").destroy(recordID);
  return result;
}

async function cullRecords(records) {
  // Create a new array of recors that are over 30 days old
  let oldRecords = [];
  for (let record of records) {
    if (new Date() - new Date(record.fields.date) > 2592000000) {
      oldRecords.push(record);
    }
  }

  async function deleteRecords() {
    // Delete the records
    for (let record of oldRecords) {
      await deleteReport(record.id);
    }
    return;
  }

  return await deleteRecords();
}

/**
 * Function to get detail from a single trail
 *
 * @param {int} trailID ECTA_Index of the trail to get
 * @returns Object of the trail's info
 */
export async function getTrailInfo(trailID) {
  const trailInfo = await base("Trail Info")
    .select({
      filterByFormula: `{trailID} = ${trailID}`,
      maxRecords: 1,
    })
    .all();
  return trailInfo[0].fields;
}
