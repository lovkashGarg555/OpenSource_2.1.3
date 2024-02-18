import React,{useContext,useEffect,useState} from 'react'
import {AppContext} from '../context/AppContextProvider'
import { useNavigate,NavLink } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import toast from 'react-hot-toast';

const Myaccount = () =>  {
      const [formData, setFormData] = useState({
            id:'',
            firstName: '',
            lastName: '',
            emailAddress: '',
            country: 'India',
            streetAddress: '',
            pincode: '',
      });
      const [buttonstate,setButtonState]=useState("Edit")
      const [formmessage,setFormmessage]=useState("Account")
const {fetchData,loggedinstatus,setUsername,setLoginstatus} = useContext(AppContext);
const navigate=useNavigate();
async function fetchInformationAboutUSer(){
      const response=await fetch('http://localhost:3001/auth/userinformation',{
            credentials:'include'
      });
      console.log(response)
      const data=await response.json();
      console.log("my data ",data.message);
      if(data.message==="false") navigate('/login');
      setFormData(prevFormData => ({
            ...prevFormData,
            id:data.id,            
            firstName: data.firstName,
            lastName: data.lastName,
            emailAddress: data.emailAddress,
            termconditions: data.termconditions,
            country: data.country,
            streetAddress: data.streetAddress,
            pincode: data.pincode
          }));

}
async function Handler(e){
      e.preventDefault();
      if(buttonstate==="Edit"){
            setButtonState("Save");
            setFormmessage("Edit Your Account");
            return ;}

      const response=await fetch('http://localhost:3001/myaccount',{
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          setUsername(formData.firstName);
      const data=await response.json();
      console.log(data);


}

function changeHandler(e) {
      e.preventDefault();
      if (buttonstate === "Edit") {
            return;
          }
      const { name, value, type, checked } = e.target;
      
      setFormData((prev) => {
        if (type === 'checkbox') return { ...prev, [name]: checked };
        return { ...prev, [name]: value };
      });
}






useEffect(()=>{
      fetchInformationAboutUSer();

},[]);


 function submitHandke(){
      console.log("submit function called");
}
async function logoutHandler(e){
      e.preventDefault();

      const response=await fetch('http://localhost:3001/logout',{
            headers: {
            'Content-Type': 'application/json',
            },
            credentials:'include'
            });

            setUsername('');
            setLoginstatus(false);
            navigate('/');
            toast('you are Log Out')
      }
      

return (
      <div className='BuyItem'>
            <form  onSubmit={submitHandke}>
        <div className='message'>{formmessage} </div>
        <fieldset className='startingdata'>
          <label htmlFor='firstName'>First Name: </label>
          <br />
          <input
            name='firstName'
            type='text'
            value={formData.firstName}
            onChange={changeHandler}
          />
          <br />
          <label htmlFor='lastName'>Last Name</label>
          <br />
          <input
            name='lastName'
            type='text'
            value={formData.lastName}
            onChange={changeHandler}
          />
          <br />
          <label htmlFor='emailAddress'>Email Address</label>
          <br />
          <input
            name='emailAddress'
            type='text'
            value={formData.emailAddress}
            onChange={changeHandler}
          />
          <br />
          <label htmlFor='streetAddress'>Street Address</label>
          <br />
          <input
            name='streetAddress'
            type='text'
            value={formData.streetAddress}
            onChange={changeHandler}
          />
          <br />
          <label htmlFor='pincode'>Pincode</label>
          <br />
          <input
            name='pincode'
            type='text'
            value={formData.pincode}
            onChange={changeHandler}
          />
          <br />
        </fieldset>

        <select
          className='option'
          name='country'
          value={formData.country}
          onChange={changeHandler}
      >
      <option value='India'>India</option>
      <option value='Pakistan'>Pakistan</option>
      <option value='Israle'>Israle</option>
      </select>




      <div className='submitbtndiv'>
      <button className='registerbtn' onClick={Handler}>
            {buttonstate}
      </button>
      </div >
      <div className='logoutbtndiv'><button className='logoutbtn' onClick={logoutHandler}>
            LogOut
      </button></div>
      </form>

      </div>
)
}


export default Myaccount
