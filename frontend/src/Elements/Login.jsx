import React, { useState } from 'react';
import "../css/login.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const loginUrl = 'http://localhost:8080/login';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleResponse = (response)=>{
    const result = response.data;
    if(typeof(result) == "object"){
      localStorage.setItem("isloggedIn","True");
      localStorage.setItem("email",`${email}`);
      localStorage.setItem("name",`${result.name}`)
      navigate("/personalblog");
    }
    else alert(result.data);
  }

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    axios.post(loginUrl,{email:email,password:password}).then((response)=>{handleResponse(response)}).catch((error)=>{alert(error)});
  };

  const handleRegister = () => {
     navigate("/registeruser");  
    };

  return (
    <div className="container">
      <form>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmailChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <button type="button" onClick={handleLogin} className="login">Login</button>
<button type="button" onClick={handleRegister} className="register">Register</button>

      </form>
    </div>
  );
}

export default Login;
