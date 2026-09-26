import { useContext } from "react";
import { UploadContext } from "./upload.context";

export function useUpload() {
  const context = useContext(UploadContext);

  if (!context) {
    throw new Error("useUpload must be used within UploadProvider");
  }

  return context;
}
