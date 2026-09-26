import type { Request, Response } from "express";
import { AppError } from "../utils/app.error.js";
import { sendSuccess } from "../utils/response.js";
import { tripService } from "../services/trip.service.js";

export const tripController = {
  async upload(req: Request, res: Response) {
    if (!req.userId) {
      throw new AppError("Unauthorized", 401);
    }

    const result = await tripService.uploadCsv(req.userId, req.file);

    sendSuccess(res, result, 201, "Trip uploaded successfully");
  },

  async list(req: Request, res: Response) {
    if (!req.userId) {
      throw new AppError("Unauthorized", 401);
    }

    const trips = await tripService.listForUser(req.userId);

    sendSuccess(res, trips, 200, "Trips fetched successfully");
  },

  async getById(req: Request, res: Response) {
    if (!req.userId) {
      throw new AppError("Unauthorized", 401);
    }

    const tripId = String(req.params.id || "");

    if (!tripId) {
      throw new AppError("Trip id is required", 400);
    }

    const trip = await tripService.getForUser(tripId, req.userId);

    sendSuccess(res, trip, 200, "Trip fetched successfully");
  },

  async remove(req: Request, res: Response) {
    if (!req.userId) {
      throw new AppError("Unauthorized", 401);
    }

    let ids: string[] = [];

    if (Array.isArray(req.body?.ids)) {
      ids = req.body.ids.map(String);
    }

    const result = await tripService.deleteForUser(ids, req.userId);

    sendSuccess(res, result, 200, "Trips deleted successfully");
  },
};
