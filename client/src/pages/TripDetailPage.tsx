import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { Button } from "../components/ui/Button";
import { getTripRequest } from "../features/trips/trip.api";
import { TripLegend } from "../features/trips/TripLegend";
import { TripMap } from "../features/trips/TripMap";
import { TripPointsTable } from "../features/trips/TripPointsTable";
import { TripStats } from "../features/trips/TripStats";
import type { TripDetail } from "../features/trips/trip.types";
import { getErrorMessage } from "../lib/api";

export function TripDetailPage() {
  const { tripId } = useParams();
  const navigate = useNavigate();

  const [trip, setTrip] = useState<TripDetail | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTrip() {
      if (!tripId) {
        setError("Trip not found");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const data = await getTripRequest(tripId);
        setTrip(data);
      } catch (err) {
        setError(getErrorMessage(err));
        setTrip(null);
      } finally {
        setIsLoading(false);
      }
    }

    loadTrip();
  }, [tripId]);

  let tripName = "Trip";

  if (trip) {
    tripName = trip.name;
  }

  return (
    <div className="min-h-svh bg-slate-50">
      <AppHeader />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-50"
              onClick={() => navigate("/dashboard")}
            >
              Back
            </button>
            <h1 className="text-xl font-semibold text-slate-900">{tripName}</h1>
          </div>

          <Link to="/dashboard">
            <Button type="button">New</Button>
          </Link>
        </div>

        {isLoading ? <p className="text-sm text-slate-600">Loading trip...</p> : null}

        {error ? <p className="text-sm text-red-700">{error}</p> : null}

        {trip ? (
          <div className="flex flex-col gap-5">
            <TripLegend />
            <TripMap trip={trip} />
            <TripStats trip={trip} />
            <TripPointsTable rows={trip.tableRows} />
          </div>
        ) : null}
      </main>
    </div>
  );
}
