export type UploadState = {
  status: string;
  progress: number;
  fileName: string | null;
  message: string | null;
  result: {
    trip: {
      name: string;
    };
    skipped: number;
  } | null;
};
