import React, { useContext, useState } from 'react';
import LoginImg from '../images/login.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/Context';

const Login = () => {
  const navigate = useNavigate();
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

  return (
    <>
      <div className="auth">
        <div className="login">
          <Link to='/'><i className="fa fa-times"></i></Link>
          <div className="l-left">
            <h1>Login</h1>
            <form method='POST'>
              <input type="text" name='username' placeholder='Username' onChange={handleChange} required />
              <input type="password" name='password' placeholder='Password' onChange={handleChange} required />
              <button onClick={handleSubmit}>Login</button>
              <span>Not a member? <Link to="/register" className='r-btn'>Register Here</Link></span>
            </form>
          </div>
          <div className="l-right">
            <img src={LoginImg} alt="LoginImage" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;