import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useTheme } from "../contexts/ThemeContext";

const ForgotPassword = () => {
  const { isDarkMode, colors } = useTheme();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1 = request OTP, 2 = reset password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1 → send OTP
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `https://sbackend-3.onrender.com/api/auth/forgot-password?email=${email}`,
        { method: "POST" }
      );

      setLoading(false);
      if (response.ok) {
        toast.success("OTP sent to your email.");
        setStep(2);
      } else {
        toast.error("Failed to send OTP. Check email.");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Something went wrong while sending OTP.");
    }
  };

  // Step 2 → reset password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "https://sbackend-3.onrender.com/api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp, newPassword }),
        }
      );

      setLoading(false);
      if (response.ok) {
        toast.success("Password reset successful! Please login.");
        navigate("/login", { replace: true });
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to reset password.");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Something went wrong while resetting password.");
    }
  };

  return (
    <section
      className={`min-h-screen flex items-start sm:items-center justify-center px-3 sm:px-6 lg:px-8 pt-20 sm:pt-16 transition-colors duration-500 ${colors.primary}`}
    >
      <Toaster position="top-right" />
      <div className="w-full max-w-md">
        <div
          className={`rounded-xl p-6 sm:p-8 border transition-colors duration-500 ${
            isDarkMode
              ? "bg-transparent " + colors.card + " border-slate-700"
              : "bg-white shadow-md border-gray-200"
          }`}
        >
          <h2
            className={`text-xl sm:text-2xl font-bold mb-5 text-center ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Forgot Password
          </h2>

          {step === 1 ? (
            <form className="flex flex-col gap-3" onSubmit={handleRequestOtp}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-3 py-2 sm:py-3 rounded-md border focus:ring-2 focus:ring-lime-400 outline-none transition-colors duration-300 text-sm sm:text-base ${
                  isDarkMode
                    ? colors.input + " border-gray-600 placeholder-gray-400"
                    : "bg-white border-gray-300 text-black placeholder-gray-500"
                }`}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 sm:py-3 rounded-md font-semibold shadow-md transition-colors duration-300 text-sm sm:text-base ${
                  isDarkMode
                    ? colors.button
                    : "bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-black"
                }`}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <form
              className="flex flex-col gap-3"
              onSubmit={handleResetPassword}
            >
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className={`w-full px-3 py-2 sm:py-3 rounded-md border focus:ring-2 focus:ring-lime-400 outline-none transition-colors duration-300 text-sm sm:text-base ${
                  isDarkMode
                    ? colors.input + " border-gray-600 placeholder-gray-400"
                    : "bg-white border-gray-300 text-black placeholder-gray-500"
                }`}
                required
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`w-full px-3 py-2 sm:py-3 rounded-md border focus:ring-2 focus:ring-lime-400 outline-none transition-colors duration-300 text-sm sm:text-base ${
                  isDarkMode
                    ? colors.input + " border-gray-600 placeholder-gray-400"
                    : "bg-white border-gray-300 text-black placeholder-gray-500"
                }`}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 sm:py-3 rounded-md font-semibold shadow-md transition-colors duration-300 text-sm sm:text-base ${
                  isDarkMode
                    ? colors.button
                    : "bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-black"
                }`}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
