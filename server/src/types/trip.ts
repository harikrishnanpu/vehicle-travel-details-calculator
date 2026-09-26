export type CreateTripData = {
  userId: string;
  name: string;
  totalDistanceM: number;
  totalDurationSec: number;
  idleDurationSec: number;
  stoppageDurationSec: number;
  overspeedDurationSec: number;
  overspeedDistanceM: number;
  pointCount: number;
};

export type CreateGpsPointData = {
  latitude: number;
  longitude: number;
  timestamp: Date;
  ignition: string;
  sequence: number;
};

export type TripSummary = {
  id: string;
  name: string;
  totalDistanceM: number;
  totalDurationSec: number;
  idleDurationSec: number;
  stoppageDurationSec: number;
  overspeedDurationSec: number;
  overspeedDistanceM: number;
  pointCount: number;
  createdAt: string;
};
