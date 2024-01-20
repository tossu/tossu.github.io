import { epoch } from './utils.js';

export interface Arrival {
    name: string;
    destination: string;
    isRealtime: boolean;
    arrival: Date;
    departure: Date;
};

interface Query {
    query: string;
    variables: {
        id_0: string;
        startTime_1: number;
        timeRange_2: number;
        numberOfDepartures_3: number;
    }
};

const SUBSCRIPTION_KEY = "dc1d754fa70c42a58d48e74c951a22d1"
const API_URL = `https://api.digitransit.fi/routing/v1/routers/waltti/index/graphql/batch?digitransit-subscription-key=${SUBSCRIPTION_KEY}`;
const QUERY: string = "query StopRoute($id_0:String!,$startTime_1:Long!,$timeRange_2:Int!,$numberOfDepartures_3:Int!) {stop(id:$id_0) {id,...F2}} fragment F0 on Stoptime{realtimeDeparture,scheduledDeparture,realtimeArrival,scheduledArrival,realtime,serviceDay,stopHeadsign,trip {pattern {route {shortName,longName}}}} fragment F1 on Stop {stoptimes:stoptimesWithoutPatterns(startTime:$startTime_1,timeRange:$timeRange_2,numberOfDepartures:$numberOfDepartures_3,omitCanceled:false) {...F0}} fragment F2 on Stop {...F1}";

function queryBuilder(stopId: number): Query[] {
    return [{
        "query": QUERY,
        "variables": {
            "id_0": "LINKKI:" + stopId,
            "startTime_1": epoch(),
            "timeRange_2": 43200,
            "numberOfDepartures_3": 5
        }
    }];
}

async function fetchStop(stopId: number) {
    const options: RequestInit = {
        method: "POST",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(queryBuilder(stopId))
    };
    try {
        const response: Response = await fetch(API_URL, options);
        if (!response.ok) {
            return [];
        }
        // TODO: return type
        // TODO: validate
        const json = await response.json();
        return json[0].payload.data.stop.stoptimes;
    } catch (e) {
        console.warn(e);
        return [];
    }
}

function cleanDestination(name: string): string {
    if (name === "Jyväskylä Keskusta") {
        return "Keskusta";
    }
    if (name === "Keskussairaala Nova") {
        return "Keskussairaala";
    }
    return name;
}

async function fetchStops(stops: number[]): Promise<Arrival[]> {
    const stopTimes = await Promise.all(stops.map(stopId => fetchStop(stopId)));
    const times: Arrival[] = stopTimes.flat().map(stop => {
        const name: string = stop.trip.pattern.route.shortName;
        const destination: string = stop.stopHeadsign;
        const isRealtime: boolean = stop.realtime;
        const realtimeArrival: Date = new Date((stop.serviceDay + stop.realtimeArrival) * 1000);
        const scheduledDeparture: Date = new Date((stop.serviceDay + stop.scheduledDeparture) * 1000);
        return {
            name: name,
            destination: cleanDestination(destination),
            isRealtime: isRealtime,
            arrival: realtimeArrival,
            departure: scheduledDeparture,
        };
    });
    times.sort((a: Arrival, b: Arrival) => a.arrival.getTime() - b.arrival.getTime());
    return times;
}

export { fetchStops };