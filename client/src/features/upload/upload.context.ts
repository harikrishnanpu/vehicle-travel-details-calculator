import { createContext } from "react";
import type { UploadState } from "./upload.types";

export type UploadContextValue = {
  upload: UploadState;
  startUpload: (file: File) => Promise<void>;
  clearUpload: () => void;
};

export const UploadContext = createContext<UploadContextValue | null>(null);

export const initialUploadState: UploadState = {
  status: "idle",
  progress: 0,
  fileName: null,
  message: null,
  result: null,
};
