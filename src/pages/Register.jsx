import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useTheme } from "../contexts/ThemeContext";

const Register = () => {
  const { isDarkMode, colors } = useTheme();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    tenantId: "",
    shopifyBaseUrl: "",
    accessToken: "",
    shopName: "",
  });
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      email: formData.email,
      password: formData.password,
      tenant: {
        tenantId: formData.tenantId,
        shopifyBaseUrl: formData.shopifyBaseUrl,
        accessToken: formData.accessToken,
        shopName: formData.shopName,
      },
    };

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/register/tenant",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      setLoading(false);

      if (response.ok) {
        toast.success("Registration successful! Enter OTP to continue.");
        setShowOtpInput(true);
      } else {
        const data = await response.json();
        toast.error(`Registration failed: ${data.message || "Unknown error"}`);
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Something went wrong during registration.");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/verify-otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email, otp }),
        }
      );

      setLoading(false);

      if (response.ok) {
        toast.success("OTP verified! Registration complete.");
        navigate("/login");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      toast.error("Something went wrong while verifying OTP.");
    }
  };

  return (
    <section
      className={`min-h-screen flex items-start sm:items-center justify-center px-3 sm:px-6 lg:px-8 pt-20 sm:pt-16 transition-colors duration-500 ${colors.primary}`}
    >
      <Toaster position="top-right" />
      <div className="w-full max-w-lg">
        <div
          className={`rounded-xl p-8 border transition-colors duration-500 ${
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
            Create Tenant Account
          </h2>

          {!showOtpInput ? (
            <form
              className="grid grid-cols-1 gap-3"
              onSubmit={handleRegister}
            >
              {[
                { name: "email", placeholder: "Email", type: "email" },
                { name: "password", placeholder: "Password", type: "password" },
                { name: "tenantId", placeholder: "Tenant ID", type: "text" },
                {
                  name: "shopifyBaseUrl",
                  placeholder: "Shopify Base URL",
                  type: "text",
                },
                {
                  name: "accessToken",
                  placeholder: "Access Token",
                  type: "text",
                },
                { name: "shopName", placeholder: "Shop Name", type: "text" },
              ].map((field) => (
                <input
                  key={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 sm:py-3 rounded-md border focus:ring-2 focus:ring-lime-400 outline-none transition-colors duration-300 text-sm sm:text-base ${
                    isDarkMode
                      ? colors.input + " border-gray-600 placeholder-gray-400"
                      : "bg-white border-gray-300 text-black placeholder-gray-500"
                  }`}
                  required
                />
              ))}

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 sm:py-3 rounded-md font-semibold shadow-md transition-colors duration-300 flex justify-center items-center gap-2 text-sm sm:text-base ${
                  isDarkMode
                    ? colors.button
                    : "bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-black"
                }`}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </form>
          ) : (
            <form className="flex flex-col gap-3" onSubmit={handleOtpSubmit}>
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
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 sm:py-3 rounded-md font-semibold shadow-md transition-colors duration-300 flex justify-center items-center gap-2 text-sm sm:text-base ${
                  isDarkMode
                    ? colors.button
                    : "bg-gradient-to-r from-lime-400 via-lime-500 to-lime-600 text-black"
                }`}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Register;
