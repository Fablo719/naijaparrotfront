// import React, { useState, useEffect } from "react";
// import { useNavigate, useSearchParams, Link } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./login.css";

// const ResetPassword = () => {
//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const token = searchParams.get("token");
  
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [validToken, setValidToken] = useState(true);
//   const [resetSuccess, setResetSuccess] = useState(false);

//   useEffect(() => {
//     if (!token) {
//       setValidToken(false);
//       toast.error("Invalid or missing reset token");
//     }
//   }, [token]);

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
    
//     if (!password || !confirmPassword) {
//       toast.error("Please fill in all fields");
//       return;
//     }
    
//     if (password.length < 6) {
//       toast.error("Password must be at least 6 characters");
//       return;
//     }
    
//     if (password !== confirmPassword) {
//       toast.error("Passwords do not match");
//       return;
//     }
    
//     setLoading(true);
    
//     try {
//       const response = await axios.post(
//         "http://localhost:5009/api/v1/users/reset-password",
//         {
//           token,
//           password
//         }
//       );
      
//       if (response.data.success) {
//         setResetSuccess(true);
//         toast.success("Password reset successful! Please login with your new password.");
        
//         setTimeout(() => {
//           navigate("/login");
//         }, 3000);
//       } else {
//         toast.error(response.data.message || "Failed to reset password");
//       }
//     } catch (error) {
//       console.error("Reset password error:", error);
//       if (error.response?.data?.message) {
//         toast.error(error.response.data.message);
//       } else {
//         toast.error("Failed to reset password. Please try again.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!validToken) {
//     return (
//       <div className="auth-wrapper">
//         <ToastContainer position="top-right" autoClose={3000} />
//         <div className="auth-navbar">
//           <div className="brand-left">NaijaParrot 🦜</div>
//           <div className="brand-center">
//             <h2>MyBlog</h2>
//             <p>Share your ideas. Read amazing stories.</p>
//           </div>
//         </div>
//         <div className="auth-content">
//           <div className="auth-card">
//             <div className="card shadow-lg border-0 p-4 rounded-4 text-center">
//               <i className="bi bi-exclamation-triangle fs-1 text-warning mb-3"></i>
//               <h4 className="fw-bold mb-3">Invalid Reset Link</h4>
//               <p className="text-muted mb-4">
//                 This password reset link is invalid or has expired.
//               </p>
//               <Link to="/login" className="btn btn-success">
//                 Back to Login
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="auth-wrapper">
//       <ToastContainer position="top-right" autoClose={3000} />
      
//       <div className="auth-navbar">
//         <div className="brand-left">NaijaParrot 🦜</div>
//         <div className="brand-center">
//           <h2>MyBlog</h2>
//           <p>Share your ideas. Read amazing stories.</p>
//         </div>
//       </div>

//       <div className="auth-content">
//         <div className="auth-card">
//           <div className="card shadow-lg border-0 p-4 rounded-4">
//             {!resetSuccess ? (
//               <>
//                 <h3 className="text-center mb-3 fw-bold text-success">
//                   Create New Password
//                 </h3>
                
//                 <p className="text-center text-muted small mb-4">
//                   Please enter your new password below.
//                 </p>

//                 <form onSubmit={handleResetPassword}>
//                   <div className="form-floating mb-3 position-relative">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       className="form-control"
//                       id="password"
//                       placeholder="New Password"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                     <label htmlFor="password">New Password</label>
//                     <span
//                       className="position-absolute end-0 top-50 translate-middle-y pe-3"
//                       style={{ cursor: "pointer", color: "#198754", fontWeight: 500 }}
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? "Hide" : "Show"}
//                     </span>
//                   </div>

//                   <div className="form-floating mb-4">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       className="form-control"
//                       id="confirmPassword"
//                       placeholder="Confirm Password"
//                       value={confirmPassword}
//                       onChange={(e) => setConfirmPassword(e.target.value)}
//                       required
//                     />
//                     <label htmlFor="confirmPassword">Confirm Password</label>
//                   </div>

//                   <button
//                     type="submit"
//                     className="btn btn-success w-100 btn-lg fw-bold"
//                     disabled={loading}
//                   >
//                     {loading ? (
//                       <>
//                         <span className="spinner-border spinner-border-sm me-2"></span>
//                         Resetting...
//                       </>
//                     ) : (
//                       "Reset Password"
//                     )}
//                   </button>
//                 </form>

//                 <p className="text-center mt-4 mb-0">
//                   <Link to="/login" className="text-success text-decoration-none">
//                     Back to Login
//                   </Link>
//                 </p>
//               </>
//             ) : (
//               <div className="text-center">
//                 <div className="mb-4">
//                   <i className="bi bi-check-circle-fill fs-1 text-success"></i>
//                 </div>
//                 <h4 className="fw-bold mb-3">Password Reset Successful!</h4>
//                 <p className="text-muted mb-4">
//                   Your password has been reset successfully. Please login with your new password.
//                 </p>
//                 <Link to="/login" className="btn btn-success w-100">
//                   Go to Login
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResetPassword;