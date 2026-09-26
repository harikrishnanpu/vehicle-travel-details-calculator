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

export type TripPoint = {
  latitude: number;
  longitude: number;
  timestamp: string;
  ignition: string;
  sequence: number;
};

export type TripMarker = {
  type: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  sequence: number;
  durationSec: number;
};

export type TripPathSegment = {
  fromIndex: number;
  toIndex: number;
  type: string;
  speedKmh: number;
  distanceM: number;
  durationSec: number;
};

export type TripTableRow = {
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
};

export type TripDetail = {
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
  points: TripPoint[];
  markers: TripMarker[];
  pathSegments: TripPathSegment[];
  tableRows: TripTableRow[];
};

export type TripUploadResult = {
  trip: TripSummary;
  skipped: number;
  errors: string[];
};
