import React, { useEffect, useState } from 'react'

const Profile = () => {

const [firstName,setFirstname]=useState("");
const [emailAddress,setEmailAddress]=useState("");
const [accountNumber,setAccountNumber]=useState("");

async function fetchData(){
const response=await fetch('http://localhost:3001/auth/userinformation',{
      credentials:'include',
});


const userData=await response.json();

const {firstName,emailAddress,accountNumber}=userData;
setFirstname(firstName);
setEmailAddress(emailAddress);
setAccountNumber(accountNumber);
localStorage.setItem('username',firstName);
localStorage.setItem('emailAddress',emailAddress);


console.log("user data",userData);

      }
useEffect(()=>{
      console.log("useeffect called");
      fetchData();
},[]);
  return (
    <div className='profile'>
<div className='profiledata'>
      <h3>Personal information</h3>
      <span>Name : {firstName}</span><br></br>
      <span>Email : {emailAddress}</span><br></br>
      <span>Account Number : {accountNumber}</span><br></br>
</div>
<div className='biddinghistory'>
      <h3>Bidding History</h3>
</div>
    </div>
  )
}

export default Profile
