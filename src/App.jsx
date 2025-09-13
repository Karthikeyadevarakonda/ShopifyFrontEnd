import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LearnMorePage from "./pages/LearnMorePage";
import MainLayout from "./pages/Layout.jsx/MainLayout";
import ProtectedRoute from "./security/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

function AppContent() {
  const location = useLocation();
  const tenantData = JSON.parse(localStorage.getItem("tenantData"));
  const showNavbar = location.pathname === "/";

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/learnMore" element={<LearnMorePage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Redirect logged-in users from login/register */}
        <Route
          path="/login"
          element={tenantData ? <RedirectByRole /> : <Login />}
        />
        <Route
          path="/register"
          element={tenantData ? <RedirectByRole /> : <Register />}
        />

        {/* Protected routes */}
        <Route
          path="/mainLayout/*"
          element={
            <ProtectedRoute allowedRoles={["isTenant", "isAdmin"]}>
              <MainLayout />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

// Redirect logged-in user based on role
const RedirectByRole = () => {
  const tenantData = JSON.parse(localStorage.getItem("tenantData"));
  if (!tenantData) return <Navigate to="/login" replace />;

  if (tenantData.role === "isTenant")
    return <Navigate to="/mainLayout" replace />;
  if (tenantData.role === "isAdmin")
    return <Navigate to="/mainLayout/tenants" replace />;

  return <Navigate to="/" replace />;
};

export default App;
