import multer from "multer";
import { AppError } from "../utils/app.error.js";

export const uploadCsv = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
  fileFilter(_req, file, callback) {
    if (!file.originalname.toLowerCase().endsWith(".csv")) {
      callback(new AppError("Only CSV files are allowed", 400));
      return;
    }

    callback(null, true);
  },
}).single("file");
