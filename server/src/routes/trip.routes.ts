import { Router } from "express";
import { tripController } from "../controllers/trip.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { uploadCsv } from "../middleware/upload.middleware.js";

export const tripRoutes = Router();

tripRoutes.use(authMiddleware);
tripRoutes.get("/", tripController.list);
tripRoutes.post("/upload", uploadCsv, tripController.upload);
tripRoutes.delete("/", tripController.remove);
tripRoutes.get("/:id", tripController.getById);
