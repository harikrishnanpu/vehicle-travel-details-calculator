export function TripLegend() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
      <span className="inline-flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
        Stopped
      </span>
      <span className="inline-flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-pink-500" />
        Idle
      </span>
      <span className="inline-flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
        Over speeding
      </span>
    </div>
  );
}
