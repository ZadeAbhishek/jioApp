import React, { useState } from 'react';
import "../css/login.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const loginUrl = 'http://localhost:8080/login';

function Login() {
  const navigate = useNavigate(); // Access the navigate function from React Router
  const [email, setEmail] = useState(''); // State for storing email input value
  const [password, setPassword] = useState(''); // State for storing password input value

  // Update email state on email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Update password state on password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Function to handle API response after login attempt
  const handleResponse = (response) => {
    const result = response.data;
    if (typeof(result) === "object") {
      // If response is an object, assume successful login
      localStorage.setItem("isLoggedIn", "True");
      localStorage.setItem("email", `${email}`);
      localStorage.setItem("name", `${result.name}`);
      navigate("/personalblog"); // Redirect to personal blog page
    } else {
      // If not an object, display the error message
      alert(result.data);
    }
  }

  // Function to handle the login attempt
  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    axios.post(loginUrl, { email: email, password: password })
      .then((response) => {
        handleResponse(response); // Handle the API response
      })
      .catch((error) => {
        alert(error); // Display an alert if an error occurs
      });
  };

  // Function to navigate to the registration page
  const handleRegister = () => {
    navigate("/registeruser"); // Redirect to the user registration page
  };

  return (
    <div className="container">
      <form>
        {/* Input field for email */}
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        {/* Input field for password */}
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        {/* Button to trigger login */}
        <button type="button" onClick={handleLogin} className="login">Login</button>
        {/* Button to navigate to the registration page */}
        <button type="button" onClick={handleRegister} className="register">Register</button>
      </form>
    </div>
  );
}

export default Login;
