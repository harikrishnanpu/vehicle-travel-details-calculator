import type { ChangeEvent } from "react";

export type InputProps = {
  label: string;
  name: string;
  type: string;
  value: string;
  autoComplete?: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
