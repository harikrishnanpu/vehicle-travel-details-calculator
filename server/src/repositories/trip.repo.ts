import { prisma } from "../db/prisma.js";
import type { CreateGpsPointData, CreateTripData } from "../types/trip.js";

export const tripRepo = {
  async createWithPoints(tripData: CreateTripData, points: CreateGpsPointData[]) {
    const trip = await prisma.trip.create({
      data: tripData,
    });

    const pointsToSave: {
      tripId: string;
      latitude: number;
      longitude: number;
      timestamp: Date;
      ignition: string;
      sequence: number;
    }[] = [];

    for (let i = 0; i < points.length; i++) {
      const point = points[i];

      pointsToSave.push({
        tripId: trip.id,
        latitude: point.latitude,
        longitude: point.longitude,
        timestamp: point.timestamp,
        ignition: point.ignition,
        sequence: point.sequence,
      });
    }

    await prisma.gpsPoint.createMany({
      data: pointsToSave,
    });

    return trip;
  },

  findManyByUserId(userId: string) {
    return prisma.trip.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  },

  findByIdForUser(tripId: string, userId: string) {
    return prisma.trip.findFirst({
      where: {
        id: tripId,
        userId,
      },
      include: {
        points: {
          orderBy: { sequence: "asc" },
        },
      },
    });
  },

  deleteManyForUser(ids: string[], userId: string) {
    return prisma.trip.deleteMany({
      where: {
        userId,
        id: { in: ids },
      },
    });
  },
};
