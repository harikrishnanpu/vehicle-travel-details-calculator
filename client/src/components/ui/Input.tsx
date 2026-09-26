import type { InputProps } from "./input.types";

export function Input(props: InputProps) {
  return (
    <div className="space-y-1.5 text-left">
      <label htmlFor={props.name} className="block text-sm font-medium text-slate-700">
        {props.label}
      </label>

      <input
        id={props.name}
        name={props.name}
        type={props.type}
        value={props.value}
        required={props.required}
        autoComplete={props.autoComplete}
        minLength={props.minLength}
        onChange={props.onChange}
        className="w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-teal-600"
      />

      {props.error ? <p className="text-sm text-red-700">{props.error}</p> : null}
    </div>
  );
}
