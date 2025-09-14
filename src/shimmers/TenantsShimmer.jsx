import React from "react";
import { useTheme } from "../contexts/ThemeContext";

/**
 * Reusable shimmer component with gradient animation.
 */
const ShimmerGradient = ({ className, isDarkMode }) => {
  const baseBg = isDarkMode ? "bg-gray-700" : "bg-gray-300";
  const gradient = isDarkMode
    ? "bg-gradient-to-r from-transparent via-white/20 to-transparent"
    : "bg-gradient-to-r from-transparent via-white/30 to-transparent";

  return (
    <div className={`relative overflow-hidden rounded ${className} ${baseBg}`}>
      <div
        className={`absolute top-0 left-[-150%] h-full w-full ${gradient} animate-shimmer`}
      ></div>
    </div>
  );
};

/**
 * Tenants shimmer loader
 */
const TenantsShimmer = () => {
  const { isDarkMode } = useTheme();

  return (
    <section
      className={`min-h-screen px-2 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-10 transition-colors ${
        isDarkMode ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      <h1
        className={`text-xl sm:text-2xl font-bold mb-6 sm:mb-8 ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        Stores
      </h1>

      {/* Tenant Cards Shimmer */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col justify-between transition-colors duration-500 ${
                isDarkMode ? "bg-gray-700" : "bg-white"
              }`}
            >
              {/* Header */}
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <ShimmerGradient
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg"
                  isDarkMode={isDarkMode}
                />
                <ShimmerGradient
                  className="h-5 w-2/3 rounded"
                  isDarkMode={isDarkMode}
                />
              </div>

              {/* Info lines */}
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <ShimmerGradient
                  className="h-4 w-1/2 rounded"
                  isDarkMode={isDarkMode}
                />
                <ShimmerGradient
                  className="h-4 w-1/3 rounded"
                  isDarkMode={isDarkMode}
                />
                <ShimmerGradient
                  className="h-4 w-2/3 rounded"
                  isDarkMode={isDarkMode}
                />
              </div>

              {/* Button */}
              <div className="mt-4 sm:mt-6">
                <ShimmerGradient
                  className="h-8 w-full rounded-md"
                  isDarkMode={isDarkMode}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default TenantsShimmer;
