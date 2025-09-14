import React from "react";
import { useTheme } from "../contexts/ThemeContext";

/**
 * Reusable shimmer component with gradient animation.
 * `isDarkMode` controls background colors.
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
 * Main DashboardShimmer component
 */
const DashboardShimmer = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`p-4 space-y-6 min-h-screen transition-colors ${
        isDarkMode ? "bg-gray-800" : "bg-gray-100"
      }`}
    >
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array(4)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className={`p-4 rounded-lg flex flex-col gap-2 transition-colors ${
                isDarkMode ? "bg-gray-700" : "bg-white"
              }`}
            >
              <ShimmerGradient
                className="h-4 w-1/3 mb-2"
                isDarkMode={isDarkMode}
              />
              <ShimmerGradient
                className="h-6 w-1/2 mb-1"
                isDarkMode={isDarkMode}
              />
              <ShimmerGradient className="h-3 w-1/4" isDarkMode={isDarkMode} />
            </div>
          ))}
      </div>

      {/* Charts (line chart & bar chart lookalike) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue Trend Line Chart */}
        <div
          className={`p-4 rounded-lg flex flex-col gap-2 transition-colors ${
            isDarkMode ? "bg-gray-700" : "bg-white"
          }`}
        >
          <ShimmerGradient className="h-6 w-1/3 mb-3" isDarkMode={isDarkMode} />
          <div className="flex flex-col justify-end h-40 w-full space-y-1">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <ShimmerGradient
                  key={i}
                  className={`h-[${
                    Math.floor(Math.random() * 40) + 10
                  }px] w-full rounded`}
                  isDarkMode={isDarkMode}
                />
              ))}
          </div>
        </div>

        {/* Orders by Day Bar Chart */}
        <div
          className={`p-4 rounded-lg flex flex-col gap-2 transition-colors ${
            isDarkMode ? "bg-gray-700" : "bg-white"
          }`}
        >
          <ShimmerGradient className="h-6 w-1/3 mb-3" isDarkMode={isDarkMode} />
          <div className="flex justify-between items-end h-40 w-full space-x-1">
            {Array(7)
              .fill(0)
              .map((_, i) => (
                <ShimmerGradient
                  key={i}
                  className={`w-1/8 rounded`}
                  isDarkMode={isDarkMode}
                  style={{ height: `${Math.floor(Math.random() * 80) + 20}px` }}
                />
              ))}
          </div>
        </div>
      </div>

      {/* Top Customers & Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top Customers */}
        <div
          className={`p-4 rounded-lg flex flex-col gap-3 transition-colors ${
            isDarkMode ? "bg-gray-700" : "bg-white"
          }`}
        >
          <ShimmerGradient className="h-6 w-1/3 mb-2" isDarkMode={isDarkMode} />
          <div className="space-y-2">
            {Array(3)
              .fill(0)
              .map((_, j) => (
                <div key={j} className="flex justify-between items-center">
                  <ShimmerGradient
                    className="h-4 w-1/2"
                    isDarkMode={isDarkMode}
                  />
                  <ShimmerGradient
                    className="h-4 w-1/4"
                    isDarkMode={isDarkMode}
                  />
                </div>
              ))}
          </div>
        </div>

        {/* Top Products */}
        <div
          className={`p-4 rounded-lg flex flex-col gap-3 transition-colors ${
            isDarkMode ? "bg-gray-700" : "bg-white"
          }`}
        >
          <ShimmerGradient className="h-6 w-1/3 mb-2" isDarkMode={isDarkMode} />
          <div className="space-y-2">
            {Array(3)
              .fill(0)
              .map((_, j) => (
                <div key={j} className="flex justify-between items-center">
                  <ShimmerGradient
                    className="h-10 w-10 rounded-full"
                    isDarkMode={isDarkMode}
                  />
                  <div className="flex-1 ml-2 space-y-1">
                    <ShimmerGradient
                      className="h-4 w-3/4"
                      isDarkMode={isDarkMode}
                    />
                    <ShimmerGradient
                      className="h-3 w-1/2"
                      isDarkMode={isDarkMode}
                    />
                  </div>
                  <div className="ml-2 space-y-1">
                    <ShimmerGradient
                      className="h-4 w-8"
                      isDarkMode={isDarkMode}
                    />
                    <ShimmerGradient
                      className="h-3 w-6"
                      isDarkMode={isDarkMode}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardShimmer;
