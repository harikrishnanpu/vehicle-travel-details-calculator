import { useEffect } from "react";
import {
  CircleMarker,
  MapContainer,
  Polyline,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import type { TripMapProps } from "./trip-map.types";
import { formatDuration } from "./format";

function FitBounds(props: { positions: number[][] }) {
  const map = useMap();

  useEffect(() => {
    if (props.positions.length === 0) {
      return;
    }

    if (props.positions.length === 1) {
      map.setView(props.positions[0] as [number, number], 15);
      return;
    }

    map.fitBounds(props.positions as [number, number][], { padding: [40, 40] });
  }, [map, props.positions]);

  return null;
}

function getSegmentColor(type: string) {
  if (type === "overspeed") {
    return "#22d3ee";
  }

  if (type === "stoppage") {
    return "#2563eb";
  }

  if (type === "idling") {
    return "#ec4899";
  }

  return "#3b82f6";
}

export function TripMap(props: TripMapProps) {
  const positions: number[][] = [];

  for (let i = 0; i < props.trip.points.length; i++) {
    const point = props.trip.points[i];
    positions.push([point.latitude, point.longitude]);
  }

  let center: [number, number] = [52.52, 13.4];

  if (positions.length > 0) {
    const first = positions[0];
    center = [first[0], first[1]];
  }

  return (
    <div className="h-[360px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm sm:h-[420px]">
      <MapContainer center={center} zoom={13} className="h-full w-full" scrollWheelZoom>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FitBounds positions={positions} />

        {props.trip.pathSegments.map((segment, index) => {
          const from = props.trip.points[segment.fromIndex];
          const to = props.trip.points[segment.toIndex];

          if (!from || !to) {
            return null;
          }

          return (
            <Polyline
              key={props.trip.id + "-seg-" + index}
              positions={[
                [from.latitude, from.longitude],
                [to.latitude, to.longitude],
              ]}
              pathOptions={{
                color: getSegmentColor(segment.type),
                weight: 5,
                opacity: 0.9,
              }}
            />
          );
        })}

        {props.trip.markers.map((marker) => {
          let color = "#db2777";
          let fillColor = "#ec4899";
          let label = "Idle for " + formatDuration(marker.durationSec);

          if (marker.type === "stoppage") {
            color = "#1d4ed8";
            fillColor = "#3b82f6";
            label = "Stopped for " + formatDuration(marker.durationSec);
          }

          return (
            <CircleMarker
              key={props.trip.id + "-" + marker.type + "-" + marker.sequence}
              center={[marker.latitude, marker.longitude]}
              radius={9}
              pathOptions={{
                color,
                fillColor,
                fillOpacity: 0.95,
              }}
            >
              <Popup>{label}</Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
