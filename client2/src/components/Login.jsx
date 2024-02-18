import React, { useState } from 'react';
import { NavLink } from "react-router-dom";

const Login = () => {
  const [formdata, setFormdata] = useState({
    emailAddress: "",
    password: ""
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
    console.log(formdata);
  }


  const LoginHandle = async (e) => {
    e.preventDefault();
    console.log("Submitted Form Data:", formdata);

    try {
      const response = await fetch('http://localhost:3001/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(formdata) // Convert formdata to JSON string
      });

      const data = await response.json();
      console.log("Response from server:", data);
      setMessage(data.message);
      
      // Optionally, you can reset the form after successful submission
      // setFormdata({
      //   emailAddress: "",
      //   password: ""
      // });

    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="App">
      <div className="container">
        <div className="login">
          <h2>{message}</h2>
          <input type="email" name="emailAddress" placeholder="email" id="Email" onChange={changeHandle} />
          <input type="password" name="password" placeholder="password" id="password" onChange={changeHandle} />
          <a href="">forgot password</a>
          <NavLink to='/signup' href="/register">Don't have any account? create one.</NavLink>
          <button className="submit" onClick={LoginHandle}>Log in</button>
          <h5>OR</h5>
          <button className="google">continue with Google</button>
        </div>
      </div>
    </div>
  );
}

export default Login
