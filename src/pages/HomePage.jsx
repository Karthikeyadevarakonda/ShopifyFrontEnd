import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";
import Hero from "../assets/Hero.svg";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { colors, theme } = useTheme();

  const titleGradient =
    theme === "dark"
      ? "bg-gradient-to-r from-teal-400 via-slate-300 via-lime-400/90 to-green-400/90"
      : "bg-gradient-to-r from-teal-400  via-lime-500 to-green-600";

  return (
    <div
      className={`w-full min-h-screen flex flex-col justify-between relative overflow-hidden pt-20 ${colors.primary}`}
    >
      {/* 🌈 Animated Gradient Background Blobs */}
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

      {/* ⚡ Main Content */}
      <div className="relative z-10 flex flex-col-reverse lg:flex-row items-center gap-8 max-w-7xl w-full py-12 lg:py-20 mx-auto">
        {/* Left Content */}
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
              className="px-6 sm:px-8 py-2 sm:py-3 rounded sm:rounded-full font-semibold bg-gradient-to-r from-lime-400 via-green-400 to-lime-500 bg-[length:200%_200%] text-black shadow-md hover:shadow-xl transition-all w-full sm:w-auto"
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
            className="
    w-[220px]        
    sm:w-[220px]   
    md:w-[260px]   
    lg:w-[300px]     
    xl:w-[320px]    
    2xl:w-[360px]  
    h-auto           
    object-cover
  "
          />
        </motion.div>
      </div>

      {/* Footer Section */}
      <motion.footer
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className={`w-full bg-gray-900 dark:bg-gray-800 ${colors.primary} text-white py-10 px-6 sm:px-12 mt-auto`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          {/* Logo / Brand */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-green-400">
              Xeno FDE Store
            </h2>
            <p className={`mt-2 text-sm opacity-80 text-white"}`}>
              Empowering retailers with Shopify Data & actionable customer
              insights.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 flex flex-col sm:flex-row justify-between mt-6 md:mt-0">
            <div className="mb-4 sm:mb-0">
              <h3 className="font-semibold mb-2">Company</h3>
              <ul className="space-y-1 text-sm opacity-80">
                <li>
                  <a href="#" className="hover:text-lime-400 transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-lime-400 transition">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-lime-400 transition">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Support</h3>
              <ul className="space-y-1 text-sm opacity-80">
                <li>
                  <a href="#" className="hover:text-lime-400 transition">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-lime-400 transition">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-lime-400 transition">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media / Newsletter */}
          <div className="flex-1 flex flex-col items-start md:items-end mt-6 md:mt-0">
            <h3 className="font-semibold mb-2">Follow Us</h3>
            <div className="flex gap-3 mb-4">
              <a href="#" className="hover:text-lime-400 transition">
                Twitter
              </a>
              <a href="#" className="hover:text-lime-400 transition">
                LinkedIn
              </a>
              <a href="#" className="hover:text-lime-400 transition">
                Instagram
              </a>
            </div>
            <p className="text-sm opacity-80">Subscribe for updates:</p>
            <form className="mt-2 flex w-full max-w-xs sm:max-w-sm">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 rounded-l-md border border-gray-600 focus:outline-none w-full"
              />
              <button className="px-4 py-2 rounded-r-md bg-lime-400 text-black font-semibold hover:bg-lime-500 transition">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm opacity-70">
          <p className={`${"text-white"}`}>
            &copy; {new Date().getFullYear()} Xeno FDE Store. Built with ❤️ for
            the{" "}
            <span className="font-semibold text-lime-400">
              Xeno FDE Internship 2025
            </span>
            .
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default HomePage;
