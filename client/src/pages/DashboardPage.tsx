import { useNavigate } from "react-router-dom";
import { BrandLogo } from "../components/BrandLogo";
import { Button } from "../components/ui/Button";
import { useAuth } from "../features/auth/useAuth";

export function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <main className="mx-auto flex min-h-svh w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div className="flex items-center gap-4">
          <BrandLogo className="h-10 w-auto" />
          <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        </div>

        <Button type="button" variant="secondary" onClick={handleLogout}>
          Log out
        </Button>
      </header>

      <section className="space-y-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Welcome, {user?.name}
        </h2>
        <p className="text-sm text-slate-600">
          You are signed in as {user?.email}. Vehicle travel tools will live here
          next.
        </p>
      </section>
    </main>
  );
}
