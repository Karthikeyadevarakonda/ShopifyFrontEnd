import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "../contexts/ThemeToggle";
import { useTheme } from "../contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiHome,
  FiLogIn,
  FiUserPlus,
  FiBarChart2,
  FiLogOut,
  FiX,
} from "react-icons/fi";
import Logo from "../assets/Logo.svg";

const Navbar = () => {
  const { colors } = useTheme();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeLinkPos, setActiveLinkPos] = useState({ top: 0, height: 0 });
  const linkRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const tenantData = localStorage.getItem("tenantData");
    setIsAuthenticated(!!tenantData);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Update active link position for sliding underline
    const activeIndex = mobileLinks.findIndex((item) =>
      item.path === "/logout" ? false : location.pathname === item.path
    );
    if (activeIndex !== -1 && linkRefs.current[activeIndex]) {
      const rect = linkRefs.current[activeIndex].getBoundingClientRect();
      const parentRect =
        linkRefs.current[activeIndex].parentElement.getBoundingClientRect();
      setActiveLinkPos({
        top: rect.top - parentRect.top,
        height: rect.height,
      });
    }
  }, [location.pathname, menuOpen]);

  const linkColor = scrolled
    ? "text-white/80 hover:text-lime-400"
    : colors.textSecondary;
  const logoColor = scrolled ? "text-white" : colors.text;
  const shadowClass = scrolled ? "shadow-xl" : "shadow-md";
  const hamburgerColor = "bg-lime-400";
  const navbarBg = scrolled
    ? "bg-gradient-to-r from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-md"
    : colors.primary;

  // Mobile links configuration
  const mobileLinks = [
    { path: "/", label: "Home", icon: <FiHome size={18} /> },
    !isAuthenticated && {
      path: "/login",
      label: "Login",
      icon: <FiLogIn size={18} />,
    },
    !isAuthenticated && {
      path: "/register",
      label: "Register",
      icon: <FiUserPlus size={18} />,
    },
    isAuthenticated && {
      path: "/mainLayout",
      label: "Dashboard",
      icon: <FiBarChart2 size={18} />,
    },
    isAuthenticated && {
      path: "/logout",
      label: "Logout",
      icon: <FiLogOut size={18} />,
    },
  ].filter(Boolean);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 transition-all duration-500 z-50 ${navbarBg} ${shadowClass}`}
      >
        <Link
          to="/"
          className={`flex items-center gap-1 sm:gap-2 text-lg sm:text-2xl font-bold transition-colors duration-300 ${logoColor}`}
        >
          <img
            src={Logo}
            alt="Shopify Logo"
            className="h-7 w-7 sm:h-9 sm:w-9 md:h-11 md:w-11"
          />
          <span className="text-sm sm:text-base md:text-lg font-semibold">
            Shopify
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-4 xl:gap-6">
          <Link
            to="/"
            className={`flex items-center gap-1 hover:underline ${linkColor}`}
          >
            <FiHome size={18} /> Home
          </Link>
          {!isAuthenticated && (
            <>
              <Link
                to="/login"
                className={`flex items-center gap-1 hover:underline ${linkColor}`}
              >
                <FiLogIn size={18} /> Login
              </Link>
              <Link
                to="/register"
                className={`flex items-center gap-1 hover:underline ${linkColor}`}
              >
                <FiUserPlus size={18} /> Register
              </Link>
            </>
          )}
          {isAuthenticated && (
            <Link
              to="/mainLayout"
              className={`flex items-center gap-1 hover:underline ${linkColor}`}
            >
              <FiBarChart2 size={18} /> Dashboard
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <ThemeToggle />

          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-7 h-7 sm:w-8 sm:h-8 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span
              className={`h-0.5 w-5 sm:w-6 transition-all duration-300 ${hamburgerColor} ${
                menuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 sm:w-6 my-1 transition-all duration-300 ${hamburgerColor} ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 sm:w-6 transition-all duration-300 ${hamburgerColor} ${
                menuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4 }}
              className={`fixed top-0 right-0 h-full w-64 sm:w-72 shadow-2xl flex flex-col ${colors.primary} ${colors.text} z-50`}
            >
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/20">
                <span className="text-lg sm:text-xl font-bold">Menu</span>
                <button onClick={() => setMenuOpen(false)}>
                  <FiX size={20} className="sm:w-6 sm:h-6" />
                </button>
              </div>

              <div className="relative flex flex-col gap-4 sm:gap-6 p-4 sm:p-6 text-base sm:text-lg">
                {/* Sliding indicator */}
                <motion.div
                  layout
                  initial={false}
                  animate={{
                    top: activeLinkPos.top,
                    height: activeLinkPos.height,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute left-0 w-1 bg-lime-600 rounded"
                />

                {mobileLinks.map((item, idx) => {
                  const isActive =
                    item.path === "/logout"
                      ? false
                      : location.pathname === item.path;

                  const baseClasses = `flex items-center gap-3 sm:gap-4 p-2 rounded transition-colors duration-200 relative z-10`;
                  const activeClasses = isActive
                    ? "text-black dark:text-white font-semibold"
                    : "hover:text-lime-400";

                  if (item.path === "/logout") {
                    return (
                      <button
                        key={item.label}
                        onClick={() => {
                          localStorage.clear();
                          setMenuOpen(false);
                          window.location.href = "/login";
                        }}
                        className={`${baseClasses} text-red-500 hover:text-red-600`}
                      >
                        {item.icon} {item.label}
                      </button>
                    );
                  }

                  return (
                    <Link
                      key={item.label}
                      to={item.path}
                      ref={(el) => (linkRefs.current[idx] = el)}
                      onClick={() => setMenuOpen(false)}
                      className={`${baseClasses} ${activeClasses}`}
                    >
                      {item.icon} {item.label}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-auto border-t border-white/20 p-4 sm:p-6">
                <ThemeToggle />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
