import { getDistance } from "geolib";

type GpsRow = {
  latitude: number;
  longitude: number;
  timestamp: Date;
  ignition: string;
};

type MarkerStart = {
  sequence: number;
  latitude: number;
  longitude: number;
  timestamp: Date;
  durationSec: number;
};

export function calculateTrip(points: GpsRow[]) {
  let totalDistanceM = 0;
  let totalDurationSec = 0;
  let idleDurationSec = 0;
  let stoppageDurationSec = 0;
  let overspeedDurationSec = 0;
  let overspeedDistanceM = 0;

  const pathSegments: {
    fromIndex: number;
    toIndex: number;
    type: string;
    speedKmh: number;
    distanceM: number;
    durationSec: number;
  }[] = [];

  const markers: {
    type: string;
    latitude: number;
    longitude: number;
    timestamp: string;
    sequence: number;
    durationSec: number;
  }[] = [];

  const tableRows: {
    index: number;
    timeFrom: string;
    timeTo: string;
    latitude: number;
    longitude: number;
    ignition: string;
    speedKmh: number;
    distanceM: number;
    durationSec: number;
    overspeedDurationSec: number;
    stoppageDurationSec: number;
    type: string;
  }[] = [];

  if (points.length === 0) {
    return {
      metrics: {
        totalDistanceM,
        totalDurationSec,
        idleDurationSec,
        stoppageDurationSec,
        overspeedDurationSec,
        overspeedDistanceM,
      },
      pathSegments,
      markers,
      tableRows,
    };
  }

  const first = points[0];
  const last = points[points.length - 1];

  totalDurationSec = Math.round(
    (last.timestamp.getTime() - first.timestamp.getTime()) / 1000,
  );

  if (totalDurationSec < 0) {
    totalDurationSec = 0;
  }

  let stopStart: MarkerStart | null = null;
  let idleStart: MarkerStart | null = null;

  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];

    const distanceM = getDistance(
      { latitude: prev.latitude, longitude: prev.longitude },
      { latitude: curr.latitude, longitude: curr.longitude },
    );

    let durationSec = (curr.timestamp.getTime() - prev.timestamp.getTime()) / 1000;

    if (durationSec < 0) {
      durationSec = 0;
    }

    let speedKmh = 0;

    if (durationSec > 0) {
      speedKmh = (distanceM / durationSec) * 3.6;
    }

    totalDistanceM = totalDistanceM + distanceM;

    let type = "normal";
    let overspeedSec = 0;
    let stoppageSec = 0;

    if (prev.ignition === "off") {
      type = "stoppage";
      stoppageSec = durationSec;
      stoppageDurationSec = stoppageDurationSec + durationSec;

      if (!stopStart) {
        stopStart = {
          sequence: i - 1,
          latitude: prev.latitude,
          longitude: prev.longitude,
          timestamp: prev.timestamp,
          durationSec: 0,
        };
      }

      stopStart.durationSec = stopStart.durationSec + durationSec;
    } else if (stopStart) {
      markers.push({
        type: "stoppage",
        latitude: stopStart.latitude,
        longitude: stopStart.longitude,
        timestamp: stopStart.timestamp.toISOString(),
        sequence: stopStart.sequence,
        durationSec: Math.round(stopStart.durationSec),
      });

      stopStart = null;
    }

    if (prev.ignition === "on" && distanceM === 0) {
      type = "idling";
      idleDurationSec = idleDurationSec + durationSec;

      if (!idleStart) {
        idleStart = {
          sequence: i - 1,
          latitude: prev.latitude,
          longitude: prev.longitude,
          timestamp: prev.timestamp,
          durationSec: 0,
        };
      }

      idleStart.durationSec = idleStart.durationSec + durationSec;
    } else if (idleStart) {
      markers.push({
        type: "idling",
        latitude: idleStart.latitude,
        longitude: idleStart.longitude,
        timestamp: idleStart.timestamp.toISOString(),
        sequence: idleStart.sequence,
        durationSec: Math.round(idleStart.durationSec),
      });

      idleStart = null;
    } else if (type === "normal" && speedKmh > 60) {
      type = "overspeed";
      overspeedSec = durationSec;
      overspeedDurationSec = overspeedDurationSec + durationSec;
      overspeedDistanceM = overspeedDistanceM + distanceM;
    }

    pathSegments.push({
      fromIndex: i - 1,
      toIndex: i,
      type,
      speedKmh: Number(speedKmh.toFixed(2)),
      distanceM,
      durationSec: Math.round(durationSec),
    });

    tableRows.push({
      index: i - 1,
      timeFrom: prev.timestamp.toISOString(),
      timeTo: curr.timestamp.toISOString(),
      latitude: prev.latitude,
      longitude: prev.longitude,
      ignition: prev.ignition,
      speedKmh: Number(speedKmh.toFixed(2)),
      distanceM: Number(distanceM.toFixed(2)),
      durationSec: Math.round(durationSec),
      overspeedDurationSec: Math.round(overspeedSec),
      stoppageDurationSec: Math.round(stoppageSec),
      type,
    });
  }

  if (stopStart) {
    markers.push({
      type: "stoppage",
      latitude: stopStart.latitude,
      longitude: stopStart.longitude,
      timestamp: stopStart.timestamp.toISOString(),
      sequence: stopStart.sequence,
      durationSec: Math.round(stopStart.durationSec),
    });
  }

  if (idleStart) {
    markers.push({
      type: "idling",
      latitude: idleStart.latitude,
      longitude: idleStart.longitude,
      timestamp: idleStart.timestamp.toISOString(),
      sequence: idleStart.sequence,
      durationSec: Math.round(idleStart.durationSec),
    });
  }

  return {
    metrics: {
      totalDistanceM: Number(totalDistanceM.toFixed(2)),
      totalDurationSec,
      idleDurationSec: Math.round(idleDurationSec),
      stoppageDurationSec: Math.round(stoppageDurationSec),
      overspeedDurationSec: Math.round(overspeedDurationSec),
      overspeedDistanceM: Number(overspeedDistanceM.toFixed(2)),
    },
    pathSegments,
    markers,
    tableRows,
  };
}
