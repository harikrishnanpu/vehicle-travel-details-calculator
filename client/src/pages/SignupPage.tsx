import { BrandLogo } from "../components/BrandLogo";
import { SignupForm } from "../features/auth/components/SignupForm";

export function SignupPage() {
  return (
    <main className="flex min-h-svh items-center justify-center px-4 py-10">
      <section className="w-full max-w-md space-y-8 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <header className="space-y-3 text-center">
          <BrandLogo className="mx-auto h-12 w-auto" />
          <h1 className="text-2xl font-semibold text-slate-900">
            Create your account
          </h1>
          <p className="text-sm text-slate-600">
            Sign up to start tracking vehicle travel details.
          </p>
        </header>

        <SignupForm />
      </section>
    </main>
  );
}
