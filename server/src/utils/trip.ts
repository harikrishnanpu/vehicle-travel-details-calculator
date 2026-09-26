import type { GpsPoint, Trip } from "@prisma/client";
import type { TripSummary } from "../types/trip.js";

export function toTripSummary(trip: Trip): TripSummary {
  return {
    id: trip.id,
    name: trip.name,
    totalDistanceM: trip.totalDistanceM,
    totalDurationSec: trip.totalDurationSec,
    idleDurationSec: trip.idleDurationSec,
    stoppageDurationSec: trip.stoppageDurationSec,
    overspeedDurationSec: trip.overspeedDurationSec,
    overspeedDistanceM: trip.overspeedDistanceM,
    pointCount: trip.pointCount,
    createdAt: trip.createdAt.toISOString(),
  };
}

export function toTripPoints(points: GpsPoint[]) {
  const result: {
    latitude: number;
    longitude: number;
    timestamp: string;
    ignition: string;
    sequence: number;
  }[] = [];

  for (let i = 0; i < points.length; i++) {
    const point = points[i];

    result.push({
      latitude: point.latitude,
      longitude: point.longitude,
      timestamp: point.timestamp.toISOString(),
      ignition: point.ignition,
      sequence: point.sequence,
    });
  }

  return result;
}
