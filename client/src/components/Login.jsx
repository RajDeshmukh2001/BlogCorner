import React, { useContext, useState } from 'react';
import LoginImg from '../images/login.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/Context';
import axios from 'axios';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';

const Login = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState('password');
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });

  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(inputs);
      const res = await axios.post('/auth/login', inputs);
      if (res) {
        alert('Login Successful');
        navigate('/');
      }
      else {
        alert('Login Failed');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePassword = () => {
    show === 'password' ? setShow('text') : setShow('password');
  }

  return (
    <>
      <div className="auth">
        <div className="login">
          <div className="close-btn">
            <Link to='/'>
              <i className="fa fa-times"></i>
            </Link>
          </div>

          <div className="form-content">
            <div className="l-left">
              <h1>Login</h1>
              <form method='POST'>
                <input type="text" name='username' placeholder='Username' onChange={handleChange} required />
                <div className='password'>
                  <input type={show} name='password' placeholder='Password' onChange={handleChange} required className='inputPassword' />

                  {
                    show === 'password' ? 
                    <AiOutlineEyeInvisible className='eye blind' onClick={handlePassword} /> :
                    <AiOutlineEye className='eye' onClick={handlePassword}  /> 
                  }
                  
                </div>
                <button onClick={handleSubmit}>Login</button>
                <span>Not a member? <Link to="/register" className='r-btn'>Register</Link></span>
              </form>
            </div>
            <div className="l-right">
              <img src={LoginImg} alt="LoginImage" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;