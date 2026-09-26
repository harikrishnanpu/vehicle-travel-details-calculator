import type { ButtonProps } from "./button.types";

export function Button(props: ButtonProps) {
  const variant = props.variant || "primary";
  const className = props.className || "";

  let styles =
    "inline-flex items-center justify-center rounded-md px-4 py-2.5 text-sm font-medium disabled:opacity-60";

  if (variant === "primary") {
    styles = styles + " bg-teal-700 text-white hover:bg-teal-600";
  } else {
    styles = styles + " border border-slate-300 bg-white text-slate-800 hover:bg-slate-50";
  }

  return (
    <button
      type={props.type || "button"}
      className={styles + " " + className}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
