import React, { useState } from 'react';
import Signup from '../images/signup1.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

const Register = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState('password');
  const [cpass, setCpass] = useState('password');
  const [inputs, setInputs] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
    cpassword: '',
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputs({ ...inputs, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`/auth/register`, inputs);
      if (res) {
        alert('Registration Successful');
        navigate('/login');
      }
      else {
        alert('Registration Failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePassword = () => {
    show === 'password' ? setShow('text') : setShow('password');
  }

  const handleCPassword = () => {
    cpass === 'password' ? setCpass('text') : setCpass('password');
  }

  return (
    <>
      <div className="auth">
        <div className="login register">
          <div className="close-btn"><Link to='/'><i className="fa fa-times" id="cross"></i></Link></div>
          <div className="form-content">
            <div className="l-left">
              <h1>Register</h1>
              <form>
                <input type="text" placeholder='Full Name' name='fullname' onChange={handleChange} required />
                <input type="text" placeholder='Username' name='username' onChange={handleChange} required />
                <input type="email" placeholder='Email' name='email' onChange={handleChange} required />
                <div className='password'>
                  <input type={show} name='password' placeholder='Password' onChange={handleChange} required className='inputPassword' />

                  {
                    show === 'password' ? 
                    <AiOutlineEyeInvisible className='eye blind' onClick={handlePassword} /> :
                    <AiOutlineEye className='eye' onClick={handlePassword}  /> 
                  }
                  
                </div>
                <input type='password' placeholder='Confirm Password' name='cpassword' onChange={handleChange} required />
                <button onClick={handleSubmit}>Sign Up</button>
                <span>Already a member? <Link to="/login" className='r-btn'>Login</Link></span>
              </form>
            </div>
            <div className="l-right">
              <img src={Signup} alt="SignupImage" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register