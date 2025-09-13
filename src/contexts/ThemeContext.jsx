import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true; // default dark
  });

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    const overlay = document.createElement("div");
    overlay.className =
      "fixed inset-0 bg-gradient-to-br from-black/40 to-white/40 z-[9999] pointer-events-none opacity-0 transition-opacity duration-500";
    document.body.appendChild(overlay);

    requestAnimationFrame(() => {
      overlay.classList.add("opacity-100");
      setTimeout(() => {
        overlay.classList.remove("opacity-100");
        setTimeout(() => overlay.remove(), 500);
      }, 300);
    });

    setIsDarkMode(!isDarkMode);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: isDarkMode
      ? {
          // 🌑 Dark Mode
          primary: "bg-[#0B0500]",
          secondary: "bg-slate-900",
          accent: "bg-[#B0DB43]",
          text: "text-white",
          textSecondary: "text-slate-300",
          textMuted: "text-slate-400",
          border: "border-slate-700",
          hover: "hover:bg-slate-800",
          card: "bg-slate-800",
          input: "bg-slate-900 text-white",
          button: "bg-[#B0DB43] text-black hover:bg-lime-400",
          buttonSecondary: "bg-slate-700 text-white hover:bg-slate-600",

          table: "bg-slate-800",
          tableHeader: "bg-slate-700 text-slate-200",
          tableRow: "hover:bg-slate-700",
        }
      : {
          // ☀️ Light Mode
          primary: "bg-white",
          secondary: "bg-slate-50",
          accent: "bg-blue-600",
          text: "text-slate-900",
          textSecondary: "text-slate-700",
          textMuted: "text-slate-500",
          border: "border-slate-200",
          hover: "hover:bg-slate-100",
          card: "bg-white",
          input: "bg-white text-slate-900",
          button: "bg-blue-600 text-white hover:bg-blue-700",
          buttonSecondary: "bg-slate-200 text-slate-900 hover:bg-slate-300",

          table: "bg-white",
          tableHeader: "bg-blue-100 text-slate-800",
          tableRow: "hover:bg-slate-100",
        },
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
