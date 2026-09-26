import { tripRepo } from "../repositories/trip.repo.js";
import type { CreateGpsPointData } from "../types/trip.js";
import { AppError } from "../utils/app.error.js";
import { parseGpsCsv } from "../utils/csv.js";
import { toTripPoints, toTripSummary } from "../utils/trip.js";
import { calculateTrip } from "../utils/trip-calc.js";

export const tripService = { 
  async uploadCsv(userId: string, file?: Express.Multer.File) {
    if (!file) {
      throw new AppError("CSV file is required", 400);
    }

    if (!file.originalname.toLowerCase().endsWith(".csv")) {
      throw new AppError("Only CSV files are allowed", 400);
    }

    const parsed = parseGpsCsv(file.buffer);

    if (parsed.rows.length < 2) {
      throw new AppError(parsed.errors[0] || "CSV needs at least 2 valid GPS points", 400);
    }

    const result = calculateTrip(parsed.rows);
    const name = file.originalname.replace(".csv", "").replace(".CSV", "");

    const points: CreateGpsPointData[] = [];

    for (let i = 0; i < parsed.rows.length; i++) {
      const row = parsed.rows[i];

      points.push({
        latitude: row.latitude,
        longitude: row.longitude,
        timestamp: row.timestamp,
        ignition: row.ignition,
        sequence: i,
      });
    }

    const trip = await tripRepo.createWithPoints(
      {
        name,
        userId,
        totalDistanceM: result.metrics.totalDistanceM,
        totalDurationSec: result.metrics.totalDurationSec,
        idleDurationSec: result.metrics.idleDurationSec,
        stoppageDurationSec: result.metrics.stoppageDurationSec,
        overspeedDurationSec: result.metrics.overspeedDurationSec,
        overspeedDistanceM: result.metrics.overspeedDistanceM,
        pointCount: parsed.rows.length,
      },
      points,
    );

    return {
      trip: toTripSummary(trip),
      skipped: parsed.errors.length,
      errors: parsed.errors.slice(0, 20),
    };
  },

  async listForUser(userId: string) {
    const trips = await tripRepo.findManyByUserId(userId);
    const summaries = [];

    for (let i = 0; i < trips.length; i++) {
      summaries.push(toTripSummary(trips[i]));
    }

    return summaries;
  },

  async getForUser(tripId: string, userId: string) {
    const trip = await tripRepo.findByIdForUser(tripId, userId);

    if (!trip) {
      throw new AppError("Trip not found", 404);
    }

    const points = toTripPoints(trip.points);
    const rows = [];

    for (let i = 0; i < points.length; i++) {
      const point = points[i];

      rows.push({
        latitude: point.latitude,
        longitude: point.longitude,
        timestamp: new Date(point.timestamp),
        ignition: point.ignition,
      });
    }

    const analysis = calculateTrip(rows);

    return {
      ...toTripSummary(trip),
      points,
      markers: analysis.markers,
      pathSegments: analysis.pathSegments,
      tableRows: analysis.tableRows,
    };
  },

  async deleteForUser(ids: string[], userId: string) {
    if (ids.length === 0) {
      throw new AppError("Select at least one trip to delete", 400);
    }

    const result = await tripRepo.deleteManyForUser(ids, userId);

    return { deleted: result.count };
  },
};
