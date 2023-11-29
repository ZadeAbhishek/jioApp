import React, { useState } from 'react';
import "../css/settings.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// URLs for user information and updating user info
const loginUrl = 'http://localhost:8080/userinfo';
const updateUserUrl = 'http://localhost:8080/updateuserinfo';

function Settings() {
  // Check if the user is logged in based on localStorage
  const isloggedIn = localStorage.getItem("isloggedIn") !== "False";
  const navigate = useNavigate();

  // State variables to manage email, name, and password
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // Fetch user information when the component mounts
  React.useEffect(() => {
    axios.post(loginUrl, { email: localStorage.getItem("email") })
      .then((response) => {
        handleUser(response); // Handle the received user data
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  // Function to handle user data received from the server
  const handleUser = (response) => {
    const data = response.data;
    setEmail(localStorage.getItem("email"));
    setName(data.name);
    setPassword(data.password);
  }

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

  // Function to update user information
  const handleUpdate = () => {
    console.log('Updated Email:', email);
    console.log('Updated Name:', name);
    console.log('Updated Password:', password);

    // Sending a POST request to update user information
    axios.post(updateUserUrl, { email: email, password: password, name: name })
      .then((response) => {
        alert(response.data); // Alert the user about the update response
      })
      .catch((error) => {
        alert(error); // Alert if there's an error during the update
      });
  };

  // Function to sign out the user
  const handleSignOut = () => {
    localStorage.clear(); // Clearing localStorage
    localStorage.setItem("isloggedIn", "False"); // Setting logged-in status to 'False'
    navigate("/"); // Redirecting to the home page after sign out
  }

  // Render the settings form if the user is logged in, otherwise redirect to the home page
  if (isloggedIn) {
    return (
      <div>
        <form>
          {/* Input field for email (disabled as it's not editable) */}
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} disabled />
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
          {/* Button to trigger the update of user information */}
          <button type="button" onClick={handleUpdate}>Update</button>
          {/* Button to sign out */}
          <button className='sign-Out' type="button" onClick={handleSignOut}>Sign Out</button>
        </form>
      </div>
    );
  } else {
    navigate("/"); // Redirect to the home page if the user is not logged in
  }
}

export default Settings;
