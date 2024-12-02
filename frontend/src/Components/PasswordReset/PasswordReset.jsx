import React, { useState } from "react";
import axios from "../../axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./PasswordReset.module.css"; // Reuse styles from Login.module.css
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const PasswordReset = () => {
  const [login, setLogin] = useState({ email: "", otp: "", newPassword: "" });
  const [isOTPSent, setIsOTPSent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isOTPSent) {
      try {
        const res = await axios.post("/send-otp", { email: login.email });

        if (res.data.emailRequire) {
          toast.error("Please enter your email address."); // Show toast notification
        } else if (res.data.userNotExist) {
          toast.error("No account found with this email address."); // Show toast notification
        } else if (res.data.msg === "OTP sent successfully") {
          toast.success("OTP has been sent to your email. Please check your inbox."); // Show success toast
          setIsOTPSent(true);
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred. Please try again."); // Show toast notification
      }
    } else {
      try {
        const res = await axios.post("/update-password", {
          email: login.email,
          otp: login.otp,
          newPassword: login.newPassword,
        });

        if (res.data.otpNotValid) {
          toast.error("Invalid OTP. Please try again."); // Show toast notification
        } else if (res.data.allFieldsRequired) {
          toast.error("Please fill all the fields."); // Show toast notification
        } else if (res.data.otpExpired) {
          toast.error("OTP has expired. Please request a new one."); // Show toast notification
        } else if (res.data.updatedPassword) {
          toast.success("Password updated successfully! You can now log in."); // Show success toast
          navigate("/");
        }
      } catch (error) {
        console.log(error);
        toast.error("An error occurred while updating the password."); // Show toast notification
      }
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Password Reset</h2>

        <div className={styles.inputContainer1}>
          <i className={`fas fa-envelope ${styles.icon}`}></i>
          <input
            autoFocus
            autoComplete="off"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={login.email}
            className={styles.input}
          />
          <span className={styles.underline}></span>
        </div>

        {isOTPSent && (
          <>
            <div className={styles.inputContainer2}>
              <i className={`fas fa-lock ${styles.icon}`}></i>
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                onChange={handleChange}
                value={login.otp}
                className={styles.input}
              />
              <span className={styles.underline}></span>
            </div>

            <div className={styles.inputContainer2}>
              <i className={`fas fa-lock ${styles.icon}`}></i>
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                placeholder="New Password"
                onChange={handleChange}
                value={login.newPassword}
                className={styles.input}
              />
              <span className={styles.underline}></span>

              <i
                className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} ${styles.eyeIcon}`}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
          </>
        )}

        <button type="submit" className={styles.button}>
          {isOTPSent ? "Reset Password" : "Send OTP"}
        </button>

        <p className={styles.text}>
          Remember your password?{" "}
          <Link to="/" className={styles.link}>Login</Link>
        </p>
      </form>
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick draggable pauseOnHover />

    </div>
  );
};

export default PasswordReset;
