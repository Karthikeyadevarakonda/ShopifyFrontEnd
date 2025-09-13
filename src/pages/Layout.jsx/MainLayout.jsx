import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { Users, UserCheck, LogOut } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import Dashboard from "./Dashboard";
import Tenants from "./Tenants";
import ProtectedRoute from "../../security/ProtectedRoute";
import toast, { Toaster } from "react-hot-toast";
import ThemeToggle from "../../contexts/ThemeToggle";

const MainLayout = () => {
  const { isDarkMode, colors } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const tenantData = JSON.parse(localStorage.getItem("tenantData"));
    if (!tenantData) {
      toast.error("Please login.");
      navigate("/login", { replace: true });
    } else {
      setRole(tenantData.role);
      // Redirect default page based on role
      if (
        tenantData.role === "isAdmin" &&
        location.pathname === "/mainLayout"
      ) {
        navigate("/mainLayout/tenants", { replace: true });
      }
    }
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully!");
    navigate("/login", { replace: true });
  };

  const menuItems = [];
  if (role === "isTenant")
    menuItems.push({
      path: "/mainLayout",
      label: "Dashboard",
      icon: <UserCheck size={18} />,
    });
  if (role === "isAdmin")
    menuItems.push({
      path: "/mainLayout/tenants",
      label: "Tenants",
      icon: <Users size={18} />,
    });

  const panelName =
    role === "isTenant" ? "UserPanel" : role === "isAdmin" ? "AdminPanel" : "";
  const panelIconColor = isDarkMode ? "white" : "black";
  const panelIcon =
    role === "isTenant" ? (
      <UserCheck size={20} color={panelIconColor} />
    ) : role === "isAdmin" ? (
      <Users size={20} color={panelIconColor} />
    ) : null;

  return (
    <div
      className={`min-h-screen flex flex-col lg:flex-row ${colors.primary} transition-colors`}
    >
      <Toaster position="top-right" />

      {/* Sidebar */}
      <aside
        className={`w-full lg:w-64 lg:fixed lg:h-full flex flex-col justify-between shadow-md transition-colors duration-500 ${
          isDarkMode ? colors.card + " border-r border-gray-700" : "bg-white"
        }`}
      >
        {/* Theme Toggle + Panel Name */}
        <div
          className={`px-3 sm:px-4 py-3 flex items-center justify-between border-b ${
            isDarkMode ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <div className="flex items-center gap-1 sm:gap-2">
            {panelIcon}
            <h2
              className={`text-base sm:text-lg font-bold ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              {panelName}
            </h2>
          </div>
          <ThemeToggle />
        </div>

        {/* Desktop Menu Links */}
        <nav className="hidden lg:flex flex-1 flex-col px-3 sm:px-4 py-4 sm:py-6 relative">
          {menuItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-lg font-medium transition-colors duration-500 ease-in-out text-sm sm:text-base
                  ${
                    isActive
                      ? "bg-lime-400 text-black dark:bg-lime-500 dark:text-white"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                  }`}
              >
                {item.icon} {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Menu Links */}
        <div className="lg:hidden flex-1 px-3 py-4">
          {menuItems.map((item, idx) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link
                key={idx}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-1 rounded transition relative
                  ${
                    isActive
                      ? `${
                          isDarkMode
                            ? "text-lime-300 font-semibold before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-lime-400"
                            : "text-blue-500 font-semibold before:absolute before:left-0 before:top-0 before:bottom-0 before:w-1 before:bg-blue-500"
                        }`
                      : `${
                          isDarkMode
                            ? "text-gray-300 hover:text-teal-300"
                            : "text-gray-600 hover:text-blue-400"
                        }`
                  }`}
              >
                {item.icon} {item.label}
              </Link>
            );
          })}
        </div>

        {/* Logout */}
        <div
          className={`p-3 sm:p-4 border-t ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-red-500 hover:text-red-600 transition"
          >
            <LogOut size={14} className="sm:w-4 sm:h-4" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-3 sm:p-6">
        <Routes>
          {role === "isTenant" && (
            <Route
              index
              element={
                <ProtectedRoute allowedRoles={["isTenant"]}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          )}

          {role === "isAdmin" && (
            <Route
              path="tenants"
              element={
                <ProtectedRoute allowedRoles={["isAdmin"]}>
                  <Tenants />
                </ProtectedRoute>
              }
            />
          )}

          <Route
            path="*"
            element={
              <ProtectedRoute allowedRoles={["isTenant", "isAdmin"]}>
                {role === "isTenant" ? <Dashboard /> : <Tenants />}
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default MainLayout;
