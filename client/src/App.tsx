import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./features/auth/AuthProvider";
import { GuestRoute } from "./features/auth/GuestRoute";
import { ProtectedRoute } from "./features/auth/ProtectedRoute";
import { UploadProvider } from "./features/upload/UploadProvider";
import { UploadProgressBanner } from "./features/upload/UploadProgressBanner";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { TripDetailPage } from "./pages/TripDetailPage";

export default function App() {
  return (
    <AuthProvider>
      <UploadProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Route>

            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/trips/:tripId" element={<TripDetailPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>

          <UploadProgressBanner />
        </BrowserRouter>
      </UploadProvider>
    </AuthProvider>
  );
}
