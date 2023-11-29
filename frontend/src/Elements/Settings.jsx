import React, { useState } from 'react';
import "../css/settings.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const loginUrl = 'http://localhost:8080/userinfo';
const updateUserUrl = 'http://localhost:8080/updateuserinfo';


function Settings() {
  const islogedIn = localStorage.getItem("isloggedIn") !== "False";
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  React.useEffect(()=>{
    axios.post(loginUrl,{email:localStorage.getItem("email")}).then((response)=>{handleUser(response)}).catch((error)=>{alert(error)});
  },[])

  const handleUser = (response)=>{
    const data = response.data;
    setEmail(localStorage.getItem("email"));
    setName(data.name);
    setPassword(data.password);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUpdate = () => {
    // Perform update logic here using the 'email', 'name', and 'password' states
    console.log('Updated Email:', email);
    console.log('Updated Name:', name);
    console.log('Updated Password:', password);
    axios.post(updateUserUrl,{email:email, password:password , name:name}).then((response)=>{alert(response.data)}).catch((error)=>{alert(error)})

    // Add logic to update user settings
  };

  const handleSingOut = () =>{
    localStorage.clear();
    navigate("/")
  }
  if(islogedIn) return (
    <div>
      <form>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange}  disabled/>
        </label>
        <br />
        <label>
          Name:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="text" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <button type="button" onClick={handleUpdate}>Update</button>
        <button className='sign-Out' type="button" onClick={handleSingOut}>Sign Out</button>
      </form>
    </div>
  );
  else navigate("/")
}

export default Settings;
