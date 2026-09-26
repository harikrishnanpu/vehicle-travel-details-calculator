import { useUpload } from "./useUpload";

export function UploadProgressBanner() {
  const { upload, clearUpload } = useUpload();

  if (upload.status === "idle") {
    return null;
  }

  const isBusy = upload.status === "uploading" || upload.status === "processing";

  let boxClass = "border-slate-200 bg-white text-slate-800";

  if (upload.status === "error") {
    boxClass = "border-red-200 bg-red-50 text-red-800";
  }

  if (upload.status === "success") {
    boxClass = "border-teal-200 bg-teal-50 text-teal-900";
  }

  let skippedText = null;

  if (upload.result && upload.result.skipped > 0) {
    skippedText = (
      <p className="text-xs opacity-70">Skipped {upload.result.skipped} invalid rows</p>
    );
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <div className={"pointer-events-auto w-full max-w-md space-y-3 rounded-xl border p-4 shadow-lg " + boxClass}>
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-sm font-medium">{upload.fileName || "CSV upload"}</p>
            <p className="text-sm opacity-80">{upload.message}</p>
          </div>

          {!isBusy ? (
            <button
              type="button"
              className="text-sm underline opacity-70 hover:opacity-100"
              onClick={clearUpload}
            >
              Dismiss
            </button>
          ) : null}
        </div>

        {isBusy || upload.status === "success" ? (
          <div className="h-2 overflow-hidden rounded-full bg-black/10">
            <div
              className="h-full rounded-full bg-teal-700"
              style={{ width: upload.progress + "%" }}
            />
          </div>
        ) : null}

        {skippedText}
      </div>
    </div>
  );
}
