import { Route, Routes } from 'react-router';
import RootLayout from './layouts/RootLayout';
import CarsPage from './pages/CarsPage';
import CarDetailsPage from './pages/CarDetailsPage';
import CreateCarPage from './pages/CreateCarPage';
import EditCarPage from './pages/EditCarPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ConfirmEmailPage from './pages/ConfirmEmailPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProtectedRoute from './components/ProtectedRoute';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route
          index
          element={<HomePage />}
        />
        <Route
          path="login"
          element={<LoginPage />}
        />
        <Route
          path="forgot-password"
          element={<ForgotPasswordPage />}
        />
        <Route
          path="about"
          element={<AboutPage />}
        />
        <Route
          path="register"
          element={<RegisterPage />}
        />
        <Route
          path="confirm-email"
          element={<ConfirmEmailPage />}
        />
        <Route
          path="reset-password"
          element={<ResetPasswordPage />}
        />
        <Route element={<ProtectedRoute />}>
          <Route path="cars">
            <Route
              index
              element={<CarsPage />}
            />
            <Route
              path="new"
              element={<CreateCarPage />}
            />
            <Route
              path=":id"
              element={<CarDetailsPage />}
            />
            <Route
              path=":id/edit"
              element={<EditCarPage />}
            />
          </Route>
        </Route>
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  );
}
