import { parse } from "csv-parse/sync";
import { AppError } from "./app.error.js";

export function parseGpsCsv(buffer: Buffer) {
  let records: Record<string, string>[] = [];

  try {
    records = parse(buffer, {
      columns: (headers: string[]) => {
        return headers.map((header) => header.trim().toLowerCase());
      },
      skip_empty_lines: true,
      trim: true,
      bom: true,
    });
  } catch {
    throw new AppError("Invalid CSV file", 400);
  }

  if (records.length === 0) {
    throw new AppError("CSV file is empty", 400);
  }

  const firstRow = records[0];

  if (!firstRow.latitude || !firstRow.longitude || !firstRow.timestamp || !firstRow.ignition) {
    throw new AppError("CSV must have latitude, longitude, timestamp, ignition", 400);
  }

  const rows: {
    latitude: number;
    longitude: number;
    timestamp: Date;
    ignition: string;
  }[] = [];
  const errors: string[] = [];

  for (let i = 0; i < records.length; i++) {
    const row = records[i];
    const rowNumber = i + 2;

    const latitude = Number(row.latitude);
    const longitude = Number(row.longitude);
    const timestamp = new Date(String(row.timestamp).replace(" ", "T"));
    const ignition = String(row.ignition).toLowerCase();

    if (!Number.isFinite(latitude) || latitude < -90 || latitude > 90) {
      errors.push("Row " + rowNumber + ": invalid latitude");
      continue;
    }

    if (!Number.isFinite(longitude) || longitude < -180 || longitude > 180) {
      errors.push("Row " + rowNumber + ": invalid longitude");
      continue;
    }

    if (Number.isNaN(timestamp.getTime())) {
      errors.push("Row " + rowNumber + ": invalid timestamp");
      continue;
    }

    if (ignition !== "on" && ignition !== "off") {
      errors.push("Row " + rowNumber + ": ignition must be on or off");
      continue;
    }

    rows.push({
      latitude,
      longitude,
      timestamp,
      ignition,
    });
  }

  return { rows, errors };
}
