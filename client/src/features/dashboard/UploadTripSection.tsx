import { useRef, type ChangeEvent } from "react";
import { Button } from "../../components/ui/Button";
import { useUpload } from "../upload/useUpload";

export function UploadTripSection() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { upload, startUpload } = useUpload();

  const isBusy = upload.status === "uploading" || upload.status === "processing";

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];
    event.target.value = "";
    await startUpload(file);
  }

  function handleClick() {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }

  return (
    <section className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={handleChange}
      />

      <Button
        type="button"
        className="bg-slate-900 hover:bg-slate-800 cursor-pointer"
        disabled={isBusy}
        onClick={handleClick}
      >
        {isBusy ? "Uploading..." : "Upload Trip"}
      </Button>

    </section>
  );
}
