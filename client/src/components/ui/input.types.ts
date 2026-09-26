import type { ChangeEvent } from "react";

export type InputProps = {
  label: string;
  name: string;
  type: string;
  value: string;
  required?: boolean;
  autoComplete?: string;
  minLength?: number;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};
