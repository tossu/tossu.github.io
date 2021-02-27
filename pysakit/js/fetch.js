const API_URL = "https://api.digitransit.fi/routing/v1/routers/waltti/index/graphql/batch";
const QUERY = "query StopRoute($id_0:String!,$startTime_1:Long!,$timeRange_2:Int!,$numberOfDepartures_3:Int!) {stop(id:$id_0) {id,...F2}} fragment F0 on Stoptime{realtimeDeparture,scheduledDeparture,realtimeArrival,scheduledArrival,realtime,serviceDay,stopHeadsign,trip {pattern {route {shortName,longName}}}} fragment F1 on Stop {stoptimes:stoptimesWithoutPatterns(startTime:$startTime_1,timeRange:$timeRange_2,numberOfDepartures:$numberOfDepartures_3,omitCanceled:false) {...F0}} fragment F2 on Stop {...F1}";

function queryBuilder(id) {
  return [{
    "query": QUERY,
    "variables": {
      "id_0": id,
      "startTime_1": epoch(),
      "timeRange_2":43200,
      "numberOfDepartures_3":5
    }}];
}

async function fetchStop(id) {
  const options = {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(queryBuilder(id))
  };
  try {
    const response = await fetch(API_URL, options);
    if (!response.ok) {
      return [];
    }
    const json = await response.json();
    return json[0].payload.data.stop.stoptimes;
  } catch(e) {
    console.warn(e);
    return [];
  }
}

async function fetchStops(stops) {
  const stopTimes = await Promise.all(stops.map(stop => fetchStop(stop)));
  const times = stopTimes.flat().map(stop => {
    const realtimeArrival = new Date((stop.serviceDay + stop.realtimeArrival) * 1000);
    const scheduledDeparture = new Date((stop.serviceDay + stop.scheduledDeparture) * 1000);
    return {
      "name": stop.trip.pattern.route.shortName,
      "destination": stop.stopHeadsign,
      "isRealtime": stop.realtime,
      "arrival": realtimeArrival,
      "departure": scheduledDeparture,
    }
  });
  times.sort((a,b) => a.arrival - b.arrival);
  return times;
}
