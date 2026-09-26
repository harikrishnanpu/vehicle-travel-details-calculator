import { useState } from "react";
import type { TripPointsTableProps } from "./trip-points-table.types";
import {
  formatClock,
  formatCoord,
  formatDistance,
  formatDuration,
} from "./format";

export function TripPointsTable(props: TripPointsTableProps) {
  const [page, setPage] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const pageSize = 6;
  const totalPages = Math.max(1, Math.ceil(props.rows.length / pageSize));
  let currentPage = page;

  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  const start = (currentPage - 1) * pageSize;
  const pageRows = props.rows.slice(start, start + pageSize);

  let selected = pageRows[0] || null;

  for (let i = 0; i < props.rows.length; i++) {
    if (props.rows[i].index === selectedIndex) {
      selected = props.rows[i];
    }
  }

  const pageNumbers = [];
  const maxPages = Math.min(totalPages, 7);

  for (let i = 1; i <= maxPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="grid lg:grid-cols-[1fr_220px]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-medium">Time</th>
                <th className="px-4 py-3 font-medium">Point</th>
                <th className="px-4 py-3 font-medium">Ignition</th>
                <th className="px-4 py-3 font-medium">Speed</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row) => {
                let rowClass = "cursor-pointer border-t border-slate-100 hover:bg-slate-50";

                if (selected && selected.index === row.index) {
                  rowClass = "cursor-pointer border-t border-slate-100 bg-slate-50";
                }

                let ignitionClass = "font-medium text-slate-500";

                if (row.ignition === "on") {
                  ignitionClass = "font-medium text-green-600";
                }

                return (
                  <tr
                    key={row.index}
                    className={rowClass}
                    onClick={() => setSelectedIndex(row.index)}
                  >
                    <td className="px-4 py-3 text-slate-700">
                      {formatClock(row.timeFrom)} to {formatClock(row.timeTo)}
                    </td>
                    <td className="px-4 py-3 text-slate-700">
                      {formatCoord(row.latitude, row.longitude)}
                    </td>
                    <td className="px-4 py-3">
                      <span className={ignitionClass}>{row.ignition.toUpperCase()}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{row.speedKmh.toFixed(1)} KM/H</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <aside className="border-t border-slate-200 bg-slate-50 p-4 text-sm lg:border-t-0 lg:border-l">
          {selected ? (
            <dl className="space-y-3">
              <div>
                <dt className="text-slate-500">Travel Duration</dt>
                <dd className="font-medium text-slate-900">{formatDuration(selected.durationSec)}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Stopped from</dt>
                <dd className="font-medium text-slate-900">
                  {formatDuration(selected.stoppageDurationSec)}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Distance</dt>
                <dd className="font-medium text-slate-900">{formatDistance(selected.distanceM)}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Over speeding Duration</dt>
                <dd className="font-medium text-slate-900">
                  {formatDuration(selected.overspeedDurationSec)}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="text-slate-500">Select a row to see details.</p>
          )}
        </aside>
      </div>

      <div className="flex items-center justify-center gap-1 border-t border-slate-200 px-4 py-3">
        <button
          type="button"
          className="rounded px-2 py-1 text-sm text-slate-600 disabled:opacity-40"
          disabled={currentPage <= 1}
          onClick={() => setPage(currentPage - 1)}
        >
          ‹
        </button>

        {pageNumbers.map((pageNumber) => {
          let className = "rounded px-2.5 py-1 text-sm text-slate-600";

          if (pageNumber === currentPage) {
            className = "rounded px-2.5 py-1 text-sm bg-slate-900 text-white";
          }

          return (
            <button
              key={pageNumber}
              type="button"
              className={className}
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          type="button"
          className="rounded px-2 py-1 text-sm text-slate-600 disabled:opacity-40"
          disabled={currentPage >= totalPages}
          onClick={() => setPage(currentPage + 1)}
        >
          ›
        </button>
      </div>
    </section>
  );
}
