import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  const footerBg = theme === "dark" ? "bg-gray-800" : "bg-gray-900";
  const footerText = "text-white";

  return (
    <>
      <motion.footer
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
        className={`w-full ${footerBg} ${footerText} py-10 px-6 sm:px-12 mt-auto`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
          {/* Logo / Brand */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-green-400">
              Xeno FDE Store
            </h2>
            <p className="mt-2 text-sm opacity-80">
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
          <p>
            &copy; {new Date().getFullYear()} Xeno FDE Store. Built with ❤️ for{" "}
            <span className="font-semibold text-lime-400">
              Xeno FDE Internship 2025
            </span>
            .
          </p>
        </div>
      </motion.footer>
    </>
  );
};

export default Footer;
