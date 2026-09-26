import { api } from "../../lib/api";
import type { TripDetail, TripSummary, TripUploadResult } from "./trip.types";

export async function listTripsRequest() {
  const response = await api.get("/trips");
  const body = response.data as { data: TripSummary[] };
  return body.data;
}

export async function getTripRequest(tripId: string) {
  const response = await api.get("/trips/" + tripId);
  const body = response.data as { data: TripDetail };
  return body.data;
}

export async function deleteTripsRequest(ids: string[]) {
  const response = await api.delete("/trips", {
    data: { ids },
  });
  const body = response.data as { data: { deleted: number } };
  return body.data;
}

export async function uploadTripCsvRequest(
  file: File,
  onProgress: (percent: number) => void,
) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/trips/upload", formData, {
    onUploadProgress: function (event) {
      if (!event.total) {
        return;
      }

      const percent = Math.round((event.loaded / event.total) * 90);
      onProgress(percent);
    },
  });

  const body = response.data as { data: TripUploadResult };
  return body.data;
}
