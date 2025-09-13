import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import Hero from "../assets/Hero.svg";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const HomePage = () => {
  const { colors, theme } = useTheme();

  const titleGradient =
    theme === "dark"
      ? "bg-gradient-to-r from-teal-400 via-slate-300 via-lime-400/90 to-green-400/90"
      : "bg-gradient-to-r from-teal-400 via-lime-500 to-green-600";

  return (
    <div
      className={`w-full min-h-screen flex flex-col justify-between relative overflow-hidden pt-20 ${colors.primary}`}
    >
      <motion.div
        className="absolute -top-40 -left-40 w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] bg-gradient-to-r from-lime-400/30 to-transparent rounded-full blur-3xl"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 180, 270, 360] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -bottom-40 -right-40 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], rotate: [360, 270, 180, 90, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center gap-8 max-w-7xl w-full py-12 lg:py-20 mx-auto">
        <div className="flex-1 text-center lg:text-left lg:ml-12 px-4 sm:px-0">
          <motion.h1
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className={`text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight ${titleGradient} bg-clip-text text-transparent`}
          >
            Xeno FDE Project Store
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className={`mt-4 sm:mt-6 text-base sm:text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed ${colors.text}`}
          >
            <span className="hidden sm:inline">
              Empowering enterprise retailers with seamless{" "}
              <span className="font-semibold text-lime-400">
                Shopify Data Ingestion
              </span>{" "}
              & actionable{" "}
              <span className="font-semibold text-blue-400">
                customer insights
              </span>
              . Your journey into next-gen e-commerce intelligence starts here.
            </span>
            <span className="inline sm:hidden">
              Empowering retailers with{" "}
              <span className="font-semibold text-lime-400">Shopify Data</span>{" "}
              &{" "}
              <span className="font-semibold text-blue-400">
                customer insights
              </span>
              .
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center lg:justify-start"
          >
            <motion.button
              whileHover={{ scale: 1.05, backgroundPosition: "200% center" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-2 sm:py-3 rounded sm:rounded-full font-semibold bg-gradient-to-r from-lime-400 via-teal-400 to-green-400 bg-[length:200%_200%] text-black shadow-md hover:shadow-xl transition-all w-full sm:w-auto"
            >
              <Link to="/register" className="w-full h-full block text-center">
                Get Started
              </Link>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-2 sm:py-3 rounded sm:rounded-full font-semibold border-2 border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-black transition w-full sm:w-auto"
            >
              <Link to="/learnMore" className="w-full h-full block text-center">
                Learn More
              </Link>
            </motion.button>
          </motion.div>
        </div>

        {/* Right Side SVG */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="flex-1 flex justify-center mt-6 lg:mt-0"
        >
          <img
            src={Hero}
            alt="HERO"
            className="w-[220px] sm:w-[220px] md:w-[260px] lg:w-[300px] xl:w-[320px] 2xl:w-[360px] h-auto object-cover"
          />
        </motion.div>
      </div>

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default HomePage;
