import { useState, type ReactNode } from "react";
import { getErrorMessage } from "../../lib/api";
import { uploadTripCsvRequest } from "../trips/trip.api";
import { initialUploadState, UploadContext } from "./upload.context";

type UploadProviderProps = {
  children: ReactNode;
};

export function UploadProvider(props: UploadProviderProps) {
  const [upload, setUpload] = useState(initialUploadState);

  async function startUpload(file: File) {
    if (upload.status === "uploading" || upload.status === "processing") {
      return;
    }

    setUpload({
      status: "uploading",
      progress: 0,
      fileName: file.name,
      message: "Uploading  CSV...",
      result: null,
    });

    try {
      const result = await uploadTripCsvRequest(file, function (percent) {
        let status = "uploading";
        let message = "Uploading CSV...";

        if (percent >= 90) {
          status = "processing";
          message = "Validating GPS data and calculating trip...";
        }

        setUpload({
          status,
          progress: percent,
          fileName: file.name,
          message,
          result: null,
        });
      });

      setUpload({
        status: "success",
        progress: 100,
        fileName: file.name,
        message: "Trip saved: " + result.trip.name,
        result: result,
      });
    } catch (error) {
      setUpload({
        status: "error",
        progress: 0,
        fileName: file.name,
        message: getErrorMessage(error),
        result: null,
      });
    }
  }

  function clearUpload() {
    setUpload(initialUploadState);
  }

  return (
    <UploadContext.Provider value={{ upload, startUpload, clearUpload }}>
      {props.children}
    </UploadContext.Provider>
  );
}
