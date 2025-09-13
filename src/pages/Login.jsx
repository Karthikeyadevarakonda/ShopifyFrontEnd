import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useTheme } from "../contexts/ThemeContext";

const Login = () => {
  const { isDarkMode, colors } = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setLoading(false);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("tenantData", JSON.stringify(data));

        toast.success("Login successful!", {
          duration: 2000,
        });

        setTimeout(() => {
          navigate("/mainLayout");
        }, 2000);
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.message || "Login failed. Check your credentials."
        );
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Something went wrong during login.");
    }
  };

  return (
    <section
      className={`min-h-screen flex items-start sm:items-center justify-center px-3 sm:px-6 lg:px-8 pt-20 sm:pt-10 transition-colors duration-500 ${colors.primary}`}
    >
      <Toaster position="top-right" />
      <div className="relative w-full max-w-sm">
        <div
          className={`sm:rounded-3xl sm:border p-4 sm:p-8 transition-colors duration-500 ${
            isDarkMode
              ? "bg-transparent sm:" + colors.card + " border-slate-700"
              : "bg-transparent sm:bg-white shadow-none sm:shadow-2xl sm:border-gray-200"
          }`}
        >
          <h2
            className={`text-xl sm:text-2xl font-bold mb-4 text-center ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Login
          </h2>
          <p
            className={`text-center mb-6 transition-colors duration-500 text-sm sm:text-base ${
              isDarkMode ? colors.textMuted : "text-gray-500"
            }`}
          >
            Enter your credentials to continue
          </p>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            {[
              { name: "email", placeholder: "Email", type: "email" },
              { name: "password", placeholder: "Password", type: "password" },
            ].map((field) => (
              <input
                key={field.name}
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md border focus:ring-2 focus:ring-lime-400 outline-none transition-colors duration-300 text-sm sm:text-base ${
                  isDarkMode
                    ? colors.input + " border-gray-600 placeholder-gray-400"
                    : "bg-transparent sm:bg-white border-gray-300 text-black placeholder-gray-500"
                }`}
                required
              />
            ))}

            <div
              className={`flex justify-end mb-4 items-center gap-1 text-xs sm:text-sm transition-colors duration-300 ${
                isDarkMode
                  ? "text-lime-300 hover:text-lime-400"
                  : "text-lime-500 hover:text-lime-600"
              }`}
            >
              <Link to="/forgot-password" className="flex items-center gap-1">
                <span>Forgot password?</span>
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 sm:py-3 rounded-md font-semibold shadow-md transition-colors duration-300 flex justify-center items-center gap-2 text-sm sm:text-base ${
                isDarkMode
                  ? colors.button
                  : "bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-black"
              }`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p
            className={`mt-6 text-center text-xs sm:text-sm transition-colors duration-300 ${
              isDarkMode ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Don’t have an account?{" "}
            <Link
              to="/register"
              className={`font-semibold underline transition-colors duration-300 ${
                isDarkMode ? "hover:text-lime-400" : "hover:text-lime-600"
              }`}
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
