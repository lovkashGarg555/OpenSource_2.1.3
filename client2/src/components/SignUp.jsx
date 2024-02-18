import React, { useState } from 'react';
import { NavLink } from "react-router-dom";
const Login = () => {
  const [formdata, setFormdata] = useState({
    firstName: "",
    emailAddress: "",
    password: "",
    accountNumber: "",
    address: ""
    });
const [message,setMessage]=useState("Welcome");
  // Function to handle changes in input fields
  const changeHandle = (e) => {
    const { name, value } = e.target;
    // Update the formdata state with the new value
    setFormdata({
      ...formdata,
      [name]: value
    });
  }

  const SignUpHandle = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/signup', { // Assuming it's a login request
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdata) // Convert formdata to JSON string
      });
      
      const data = await response.json();
      console.log("Response from server:", data);
      setMessage(data.message);
      
      // Optionally, you can handle success response here (e.g., redirect user)

      // Reset form after submission
      setFormdata({
        firstName: "",
        emailAddress: "",
        password: "",
        accountNumber: "",
        address: ""
      });
    } catch (error) {
      console.error("Error:", error);
      // Optionally, you can show an error message to the user
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="login">
          <h2>{message}</h2>
          <input type="text" name="firstName" placeholder="username" id="uName" value={formdata.firstName} onChange={changeHandle} />
          <input type="email" name="emailAddress" placeholder="email" id="Email" value={formdata.emailAddress} onChange={changeHandle} />
          <input type="password" name="password" placeholder="password" id="password" value={formdata.password} onChange={changeHandle} />
          <input type="number" name="accountNumber" placeholder="accountNumber" id="accountNumber" value={formdata.accountNumber} onChange={changeHandle} />
          <input type="text" name="address" placeholder="address" id="address" value={formdata.address} onChange={changeHandle} />
          <a href="">forgot password</a>
          <NavLink to="/login">Already have account?</NavLink>
          <button className="submit" onClick={SignUpHandle}>Log in</button>
          <h5>OR</h5>
          <button className="google">continue with Google</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
