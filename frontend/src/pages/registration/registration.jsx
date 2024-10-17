import React, { useState } from "react";
import axios from "../../axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications
import styles from "./Signup.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Import Font Awesome CSS

const Signup = () => {
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/signup", { ...signup });

      if (res.data.EnterAllDetails) {
        toast.error(res.data.EnterAllDetails); // Show error toast
      } else if (res.data.AlreadyExist) {
        toast.error(res.data.AlreadyExist); // Show error toast
      } else {
        const userId = res.data._id;
        toast.success("Signup successful!"); 
        localStorage.setItem("userId", userId);// Show success toast

        // Delay navigation by 2 seconds
        setTimeout(() => {
          navigate(`/home`);
          window.location.reload()
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while signing up. Please try again."); // Show error toast
    }
  };

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2>Signup</h2>

        <div className={styles.inputContainer}>        
          <i className={`fas fa-user ${styles.icon}`}></i> {/* Name Icon */}
          <input 
            autoFocus
            placeholder="Enter Your Name"
            type="text"
            name="name"
            onChange={handleChange}
            value={signup.name}
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <i className={`fas fa-envelope ${styles.icon}`}></i> {/* Email Icon */}
          <input
            placeholder="Enter Your Email"
            type="email"
            name="email"
            onChange={handleChange}
            value={signup.email}
            className={styles.input}
          />
        </div>

        <div className={styles.inputContainer}>
          <i className={`fas fa-lock ${styles.icon}`}></i>
          <input autoComplete="off"
            type={showPassword ? "text" : "password"} // Toggle between text and password types
            placeholder="Enter Your Password"
            name="password"
            onChange={handleChange}
            value={signup.password}
            className={styles.input}
          />
          {/* Eye Icon for showing/hiding password */}
          <i
            className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"} ${styles.eyeIcon}`}
            onClick={togglePasswordVisibility}
          ></i>
        </div>

        <button type="submit" className={styles.button}>
          Submit
        </button>
        <p className={styles.text}>
          Already have an account?{" "}
          <Link to="/" className={styles.link}>
            Login
          </Link>
        </p>
      </form>

      {/* Toast Container for notifications */}
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick draggable pauseOnHover />
    </div>
  );
};

export default Signup;
