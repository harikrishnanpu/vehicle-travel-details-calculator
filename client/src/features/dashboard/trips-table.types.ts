import type { TripSummary } from "../trips/trip.types";

export type TripsTableProps = {
  trips: TripSummary[];
  selectedIds: string[];
  page: number;
  onToggle: (tripId: string) => void;
  onToggleAll: (checked: boolean) => void;
  onPageChange: (page: number) => void;
  onDelete: () => void;
  onOpenTrip: (tripId: string) => void;
};
