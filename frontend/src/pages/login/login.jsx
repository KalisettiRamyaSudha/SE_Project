import React, { useState } from "react";
import axios from "../../axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications
import styles from "./Login.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS

const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post("/login", { ...login });
  
      if (res.data.EnterAllDetails) {
        toast.error( "Please enter all details."); // Show error toast with a specific icon
      } else if (res.data.NotExist) {
        toast.error(<><i className="fas fa-user-times"></i> {res.data.NotExist}</>); // Show error toast with a specific icon
      } else if (res.data.Incorrect) {
        toast.error(<><i className="fas fa-lock"></i> {res.data.Incorrect}</>); // Show error toast with a specific icon
      } else {
        const userId = res.data._id;
        localStorage.setItem("userId", userId);
        toast.success("Login successful!");
        
     // Show success toast with a specific icon
        setTimeout(() => {
          navigate(`/home`);
          window.location.reload()
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again."); // Show error toast with a specific icon
    }
  };
  

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Login</h2>

        <div className={styles.inputContainer1}>
          <i className={`fas fa-envelope ${styles.icon}`}></i>{" "}
          {/* Email Icon */}
          <input
            autoFocus
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={login.email}
            className={styles.input}
          />
          <span className={styles.underline}></span>
        </div>

        <div className={styles.inputContainer2}>
          <i className={`fas fa-lock ${styles.icon}`}></i> {/* Lock Icon */}
          <input autoComplete="off"
            type={showPassword ? "text"  : "password"} // Toggle between text and password types
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={login.password}
            className={styles.input}
          />
          <span className={styles.underline}></span>
          {/* Eye Icon for showing/hiding password */}
          <i
            className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} ${styles.eyeIcon}`}
            onClick={togglePasswordVisibility}
          ></i>
        </div>

        <p className={styles.resetPassword}>
          <Link to="/reset" className={styles.link}>
            Forgot password?
          </Link>
        </p>

        <button type="submit" className={styles.button}>
          Login
        </button>

        <p className={styles.text}>
          Don't have an account?{" "}
          <Link to="/signup" className={styles.link}>
            Sign up
          </Link>
        </p>
      </form>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Login;
