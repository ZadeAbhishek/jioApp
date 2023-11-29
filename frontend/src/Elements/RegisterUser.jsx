import React, { useState } from 'react';
import "../css/settings.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// URL for registering user information
const registerUserUrl = 'http://localhost:8080/registeruserinfo';

function RegisterUser() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
  
    // Function to handle changes in the email input field
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    // Function to handle changes in the name input field
    const handleNameChange = (e) => {
      setName(e.target.value);
    };
  
    // Function to handle changes in the password input field
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    // Function to handle the response after registering a user
    const handleResponse = (response) => {
        if(response.data === "User Registered"){
            alert(response.data); // Alert if user registration is successful
            navigate("/"); // Redirect to the home page after successful registration
        } else {
            alert(response.data); // Alert if there's an issue with user registration
        }
    }
    
    // Function to register/update user information
    const registerUpdate = () => {
      console.log('Register Email:', email);
      console.log('Register Name:', name);
      console.log('Register Password:', password);

      // Sending a POST request to register user information
      axios.post(registerUserUrl, { email: email, password: password, name: name })
        .then((response) => {
          handleResponse(response); // Handle the response from the server
        })
        .catch((error) => {
          alert(error); // Alert if there's an error during registration
        });
  
      // Add logic to update user settings if needed
    };
  
    return (
      <div>
        <form>
          {/* Input field for email */}
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange}/>
          </label>
          <br />
          {/* Input field for name */}
          <label>
            Name:
            <input type="text" value={name} onChange={handleNameChange} />
          </label>
          <br />
          {/* Input field for password */}
          <label>
            Password:
            <input type="text" value={password} onChange={handlePasswordChange} />
          </label>
          <br />
          {/* Button to trigger user registration/update */}
          <button type="button" onClick={registerUpdate}>Register</button>
        </form>
      </div>
    );
}

export default RegisterUser;
