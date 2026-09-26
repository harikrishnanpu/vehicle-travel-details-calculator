import type { WelcomeBannerProps } from "./welcome-banner.types";

export function WelcomeBanner(props: WelcomeBannerProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
      <p className="text-lg font-medium text-slate-900">Welcome, {props.name}</p>
    </section>
  );
}
