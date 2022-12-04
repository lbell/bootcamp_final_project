/**
 * File of some useful functions
 */

/**
 * Convert timestring to "time ago" string
 * Copied from: https://stackoverflow.com/a/69122877/1061836
 * @param {string} input timestring
 * @returns {string} Time ago
 */
export function timeAgo(input) {
  const date = input instanceof Date ? input : new Date(input);
  const formatter = new Intl.RelativeTimeFormat("en");
  const ranges = {
    years: 3600 * 24 * 365,
    months: 3600 * 24 * 30,
    weeks: 3600 * 24 * 7,
    days: 3600 * 24,
    hours: 3600,
    minutes: 60,
    seconds: 1,
  };
  const secondsElapsed = (date.getTime() - 1000 - Date.now()) / 1000;
  for (let key in ranges) {
    if (ranges[key] < Math.abs(secondsElapsed)) {
      const delta = secondsElapsed / ranges[key];
      const result = formatter.format(Math.round(delta), key);
      return result === "2 seconds ago" ? "just now" : result;
    }
  }
}

// Get object from value in nested array
export function getObjectByValue(arr, key, val) {
  for (let target of arr) {
    if (target.hasOwnProperty(key) && target[key] === val) {
      return target;
    }
  }
}

// Extract trail data from featurecollection
export function extractTrailData(featureCollection) {
  return featureCollection.features.map((feature) => {
    return feature.properties;
  });
}

/**
 * Takes the bicycle=true, etc and creates an array ["bicycle", "hiking", etc]
 *
 * @param {arr} trail Trail Info array
 * @returns trail info object with users field
 */
export async function compressTrailUsers(trail) {
  let users = [];
  if (trail.equestrian) users.push("equestrian");
  if (trail.hike) users.push("hike");
  if (trail.bicycle) users.push("bicycle");
  if (trail.motorcycle) users.push("motorcycle");
  if (trail.atv) users.push("atv");
  if (trail["4wd"]) users.push("4wd");
  trail.users = users;
  return trail;
}
