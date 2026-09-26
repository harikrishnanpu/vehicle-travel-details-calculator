import type { TripStatsProps } from "./trip-stats.types";
import { formatDistance, formatDuration } from "./format";

export function TripStats(props: TripStatsProps) {
  const items = [
    {
      label: "Total Distance Travelled",
      value: formatDistance(props.trip.totalDistanceM),
    },
    {
      label: "Total Travelled Duration",
      value: formatDuration(props.trip.totalDurationSec),
    },
    {
      label: "Over Speeding Duration",
      value: formatDuration(props.trip.overspeedDurationSec),
    },
    {
      label: "Over Speeding Distance",
      value: formatDistance(props.trip.overspeedDistanceM),
    },
    {
      label: "Stopped Duration",
      value: formatDuration(props.trip.stoppageDurationSec),
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
        >
          <p className="text-lg font-semibold text-slate-900">{item.value}</p>
          <p className="mt-1 text-xs text-slate-500">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
