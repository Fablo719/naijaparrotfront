import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        setLoading(true);

        const res = await axios.post(
          "https://naijaparrot.vercel.app/api/v1/users/login",
          {
            email: values.email.trim().toLowerCase(),
            password: values.password,
          }
        );

        if (res.data.success && res.data.token) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", JSON.stringify(res.data.user));

          toast.success("Login successful 🦜");

          setTimeout(() => {
            navigate("/home");
          }, 1500);
        } else {
          toast.error(res.data.message || "Login failed");
        }
      } catch (err) {
        toast.error(err.response?.data?.message || "Login failed");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="auth-wrapper">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Navbar */}
      <div className="auth-navbar">
        <div className="brand-left">
          <span className="brand-icon">🦜</span>
          <span className="brand-name">NaijaParrot</span>
        </div>
        <div className="brand-right">
          <Link to="/register" className="nav-link">
            Sign up
          </Link>
        </div>
      </div>

      {/* Login Card */}
      <div className="auth-content">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome back</h1>
            <p>Sign in to your account</p>
          </div>

          <form onSubmit={formik.handleSubmit} className="auth-form">
            <input
              type="email"
              placeholder="Email"
              className="auth-input"
              {...formik.getFieldProps("email")}
            />

            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="auth-input"
                {...formik.getFieldProps("password")}
              />
              <button
                type="button"
                className="toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            <button type="submit" className="submit-btn">
              {loading ? "Logging in..." : "Sign in"}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/register">Create one</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;