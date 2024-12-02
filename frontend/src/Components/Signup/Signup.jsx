import React, { useState } from "react";
import axios from "../../axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import styles from "./Signup.module.css";
import "@fortawesome/fontawesome-free/css/all.min.css"; 

const Signup = () => {
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/signup", { ...signup });

      if (res.data.EnterAllDetails) {
        toast.error(res.data.EnterAllDetails); 
      } else if (res.data.AlreadyExist) {
        toast.error(res.data.AlreadyExist); 
      } else {
        const userId = res.data._id;
        toast.success("Signup successful!"); 
        localStorage.setItem("userId", userId);

        setTimeout(() => {
          navigate(`/home`);
          window.location.reload()
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while signing up. Please try again."); 
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h2>Signup</h2>

        <div className={styles.inputContainer}>        
          <i className={`fas fa-user ${styles.icon}`}></i> 
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
          <i className={`fas fa-envelope ${styles.icon}`}></i> 
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
            type={showPassword ? "text" : "password"} 
            placeholder="Enter Your Password"
            name="password"
            onChange={handleChange}
            value={signup.password}
            className={styles.input}
          />

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
