const apiURL = "https://api.digitransit.fi/routing/v1/routers/waltti/index/graphql/batch";
const query = "query StopRoute($id_0:String!,$startTime_1:Long!,$timeRange_2:Int!,$numberOfDepartures_3:Int!) {stop(id:$id_0) {id,...F2}} fragment F0 on Stoptime{realtimeDeparture,scheduledDeparture,realtimeArrival,scheduledArrival,realtime,serviceDay,stopHeadsign,trip {pattern {route {shortName,longName}}}} fragment F1 on Stop {stoptimes:stoptimesWithoutPatterns(startTime:$startTime_1,timeRange:$timeRange_2,numberOfDepartures:$numberOfDepartures_3,omitCanceled:false) {...F0}} fragment F2 on Stop {...F1}";

function graphqlQuery(id) {
  return [{
    "query": query,
    "variables": {
      "id_0": id,
      "startTime_1": epoch(),
      "timeRange_2":43200,
      "numberOfDepartures_3":3
    }}];
}

function fetchStop(id) {
  return fetch(apiURL, {
    method: "POST",
    cache: "no-cache",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(graphqlQuery(id))
  }).then(response => {
    if(response.status !== 200) {
      return null;
    }
    return response.json();
  }).then(json => {
    return json[0]['payload']['data']['stop']['stoptimes'];
  });
}

async function fetchStops(stops) {
  const stopTimes = await Promise.all(stops.map(stop => fetchStop(stop)));
  if (stopTimes === null) {
    alert("Pysäkkitietojen haku epäonnistui!");
    return [];
  }
  const times = stopTimes.flat().map(stop => {
    return {
      "name": stop["trip"]["pattern"]["route"]["shortName"],
      "destination": stop["stopHeadsign"],
      "realtime": stop["realtime"],
      "seconds": stop["realtimeArrival"]
    }
  });
  times.sort((a,b) => a["seconds"] - b["seconds"]);
  return times;
}
