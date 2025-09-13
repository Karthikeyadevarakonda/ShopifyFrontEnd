import { motion } from "framer-motion";
import {
  UserGroupIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  ArrowPathIcon,
  ShieldCheckIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/24/outline";
import { useTheme } from "../contexts/ThemeContext";

const Features = () => {
  const { isDarkMode, colors } = useTheme();

  const features = [
    {
      title: "Multi-Tenant Support",
      subtitle: "Manage multiple Shopify stores securely",
      icon: UserGroupIcon,
    },
    {
      title: "Real-Time Dashboard",
      subtitle: "Track orders, revenue & customers live",
      icon: ChartBarIcon,
    },
    {
      title: "Customer Insights",
      subtitle: "Identify top customers & trends",
      icon: Cog6ToothIcon,
    },
    {
      title: "Automated Data Sync",
      subtitle: "Keep Shopify data up-to-date automatically",
      icon: ArrowPathIcon,
    },
    {
      title: "Secure Authentication",
      subtitle: "Email-based login ensures tenant data privacy",
      icon: ShieldCheckIcon,
    },
    {
      title: "Insights Visualization",
      subtitle: "Charts & graphs to see trends at a glance",
      icon: PresentationChartLineIcon,
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 },
    },
    hover: { scale: 1.05, rotate: 2 },
  };

  const iconVariants = {
    hover: { scale: 1.3, rotate: 15 },
  };

  return (
    <div
      className={`min-h-screen pt-10 pb-16 px-6 sm:px-10 lg:px-20 ${
        isDarkMode
          ? "bg-black" + " " + colors.text
          : colors.primary + " " + colors.text
      }`}
    >
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent drop-shadow-lg
             bg-gradient-to-r from-[#B0DB43] via-[#4ade80] to-[#16a34a]
             bg-[length:200%_200%] animate-gradient-slide mb-8 sm:mb-12 md:mb-16 px-2"
      >
        Smart Features, Smarter Store
      </motion.h1>

      {/* Feature Cards */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-2 sm:px-0"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            className={`relative rounded-xl sm:rounded-2xl p-4 sm:p-6 flex flex-col items-center text-center backdrop-blur-sm border ${
              isDarkMode ? "border-slate-700" : "border-slate-200"
            } shadow-lg hover:shadow-2xl cursor-pointer`}
            variants={cardVariants}
            whileHover="hover"
          >
            {/* Icon */}
            <motion.div
              className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center rounded-full mb-3 sm:mb-4 bg-white/10 text-xl sm:text-2xl"
              variants={iconVariants}
              whileHover="hover"
              transition={{ type: "spring", stiffness: 300 }}
            >
              <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#B0DB43]" />
            </motion.div>

            {/* Title & Subtitle */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">
              {feature.title}
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              {feature.subtitle}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Features;
