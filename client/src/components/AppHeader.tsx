import { useNavigate } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";
import { BrandLogo } from "./BrandLogo";
import { Button } from "./ui/Button";

export function AppHeader() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <BrandLogo className="h-8 w-auto" />

        <Button type="button" variant="secondary" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </header>
  );
}
