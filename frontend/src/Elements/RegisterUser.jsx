import React, {useState} from 'react'
import "../css/settings.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const registerUserUrl = 'http://localhost:8080/registeruserinfo';

function RegisterUser() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handleNameChange = (e) => {
      setName(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  

    const handleResponse = (response)=>{
        if(response.data === "User Registered"){
            alert(response.data);
            navigate("/")
        }
        else alert(response.data);
    }
    
    const registerUpdate = () => {
      // Perform update logic here using the 'email', 'name', and 'password' states
      console.log('Register Email:', email);
      console.log('Register Name:', name);
      console.log('Register Password:', password);
      axios.post(registerUserUrl,{email:email,password:password,name:name}).then((response)=>{handleResponse(response)}).catch((error)=>{alert(error)})
  
      // Add logic to update user settings
    };
    return (
      <div>
        <form>
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange}/>
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
          <button type="button" onClick={registerUpdate}>Register</button>
        </form>
      </div>
    );
}

export default RegisterUser