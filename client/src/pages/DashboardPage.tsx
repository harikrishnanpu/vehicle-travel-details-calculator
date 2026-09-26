import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "../components/AppHeader";
import { useAuth } from "../features/auth/useAuth";
import { WelcomeBanner } from "../features/dashboard/WelcomeBanner";
import { UploadTripSection } from "../features/dashboard/UploadTripSection";
import { TripsTable } from "../features/dashboard/TripsTable";
import { deleteTripsRequest, listTripsRequest } from "../features/trips/trip.api";
import type { TripSummary } from "../features/trips/trip.types";
import { useUpload } from "../features/upload/useUpload";
import { getErrorMessage } from "../lib/api";

export function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { upload } = useUpload();

  const [trips, setTrips] = useState<TripSummary[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  async function loadTrips() {
    setError("");

    try {
      const data = await listTripsRequest();
      setTrips(data);

      const stillSelected = [];

      for (let i = 0; i < selectedIds.length; i++) {
        let found = false;

        for (let j = 0; j < data.length; j++) {
          if (data[j].id === selectedIds[i]) {
            found = true;
          }
        }

        if (found) {
          stillSelected.push(selectedIds[i]);
        }
      }

      setSelectedIds(stillSelected);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadTrips();
  }, []);

  useEffect(() => {
    if (upload.status === "success") {
      loadTrips();
    }
  }, [upload.status]);

  function toggle(tripId: string) {
    if (selectedIds.includes(tripId)) {
      const next = [];

      for (let i = 0; i < selectedIds.length; i++) {
        if (selectedIds[i] !== tripId) {
          next.push(selectedIds[i]);
        }
      }

      setSelectedIds(next);
      return;
    }

    setSelectedIds([...selectedIds, tripId]);
  }

  function toggleAll(checked: boolean) {
    const pageSize = 5;
    const start = (page - 1) * pageSize;
    const pageTrips = trips.slice(start, start + pageSize);

    if (!checked) {
      const next = [];

      for (let i = 0; i < selectedIds.length; i++) {
        let onPage = false;

        for (let j = 0; j < pageTrips.length; j++) {
          if (pageTrips[j].id === selectedIds[i]) {
            onPage = true;
          }
        }

        if (!onPage) {
          next.push(selectedIds[i]);
        }
      }

      setSelectedIds(next);
      return;
    }

    const next = [...selectedIds];

    for (let i = 0; i < pageTrips.length; i++) {
      if (!next.includes(pageTrips[i].id)) {
        next.push(pageTrips[i].id);
      }
    }

    setSelectedIds(next);
  }

  async function handleDelete() {
    if (selectedIds.length === 0) {
      return;
    }

    try {
      await deleteTripsRequest(selectedIds);
      setSelectedIds([]);
      await loadTrips();
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  function handleOpenTrip(tripId: string) {
    navigate("/trips/" + tripId);
  }

  let userName = "User";

  if (user && user.name) {
    userName = user.name;
  }

  return (
    <div className="min-h-svh bg-slate-50">
      <AppHeader />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-4 py-6 sm:px-6">
        <WelcomeBanner name={userName} />
        <UploadTripSection />

        {error ? <p className="text-sm text-red-700">{error}</p> : null}

        {isLoading ? (
          <p className="text-sm text-slate-600">Loading trips...</p>
        ) : (
          <TripsTable
            trips={trips}
            selectedIds={selectedIds}
            page={page}
            onToggle={toggle}
            onToggleAll={toggleAll}
            onPageChange={setPage}
            onDelete={handleDelete}
            onOpenTrip={handleOpenTrip}
          />
        )}
      </main>
    </div>
  );
}
