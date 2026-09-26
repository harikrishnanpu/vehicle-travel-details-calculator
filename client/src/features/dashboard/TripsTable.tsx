import { Button } from "../../components/ui/Button";
import type { TripsTableProps } from "./trips-table.types";

export function TripsTable(props: TripsTableProps) {
  const pageSize = 5;
  const totalPages = Math.max(1, Math.ceil(props.trips.length / pageSize));
  let currentPage = props.page;

  if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  const start = (currentPage - 1) * pageSize;
  const pageTrips = props.trips.slice(start, start + pageSize);

  let allSelected = false;

  if (pageTrips.length > 0) {
    allSelected = true;

    for (let i = 0; i < pageTrips.length; i++) {
      const trip = pageTrips[i];

      if (!props.selectedIds.includes(trip.id)) {
        allSelected = false;
      }
    }
  }

  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-5 py-3">
        <h2 className="text-base font-semibold text-slate-900">Your Trips</h2>

        <Button
          type="button"
          variant="secondary"
          disabled={props.selectedIds.length === 0}
          onClick={props.onDelete}
        >
          Delete
        </Button>
      </div>

      {props.trips.length === 0 ? (
        <p className="px-5 py-8 text-sm text-slate-600">
          No trips yet.
        </p>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="w-12 px-5 py-3">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={(event) => props.onToggleAll(event.target.checked)}
                    />
                  </th>
                  <th className="px-5 py-3 font-medium">Trips</th>
                </tr>
              </thead>
              <tbody>
                {pageTrips.map((trip) => (
                  <tr key={trip.id} className="border-t border-slate-100">
                    <td className="px-5 py-3">
                      <input
                        type="checkbox"
                        checked={props.selectedIds.includes(trip.id)}
                        onChange={() => props.onToggle(trip.id)}
                      />
                    </td>
                    <td
                      className="cursor-pointer px-5 py-3 font-medium text-slate-900 hover:bg-slate-50"
                      onClick={() => props.onOpenTrip(trip.id)}
                    >
                      {trip.name}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-center gap-1 border-t border-slate-200 px-5 py-3">
            <button
              type="button"
              className="rounded px-2 py-1 text-sm text-slate-600 disabled:opacity-40"
              disabled={currentPage <= 1}
              onClick={() => props.onPageChange(currentPage - 1)}
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
                  onClick={() => props.onPageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              type="button"
              className="rounded px-2 py-1 text-sm text-slate-600 disabled:opacity-40"
              disabled={currentPage >= totalPages}
              onClick={() => props.onPageChange(currentPage + 1)}
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
