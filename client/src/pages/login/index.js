import React, { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './style.css'

import axiosInstance from "../../service/request"

export default memo(function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate()
  async function login_user() {
    if (username !== 0) {
      if (password !== 0) {
        try {
          const response = await axiosInstance.post('/login', {
            'email': username,
            'password': password
          });
          localStorage.setItem('user', JSON.stringify(response.data.user));
          // alert(response.data.message)
          var redirect = "/home"
          navigate(redirect, { replace: true })
        } catch (error) {
          alert("Email or password error！")
          console.log(error);
        }
      }
    }
  }

  const [register_name, setregister_name] = useState('');
  const [register_email, setregister_email] = useState('');
  const [register_password, setregister_password] = useState('');

  async function register_user() {

    if (register_name !== 0) {
      if (register_email !== 0) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regex.test(register_email)) {
          if (register_password !== 0) {
            console.log(register_name);
            console.log(register_email);
            console.log(register_password);
            try {
              const response = await axiosInstance.post('/clients', {
                'name': register_name,
                'password': register_password,
                'email': register_email
              });
              if (response.statusText === "OK") {
                alert("Register successfully! Please login!");
                // setIsHovered(false)
              } else {
                alert("Register failed!")
              }
            } catch (error) {
                alert("Email already belongs to an existing user")
            }
          } else {
            alert("Password cannot be empty!")
          }
        } else {
          alert("Please correct your email format!")
        }
      } else {
        alert("email cannot be empty!")
      }
    } else {
      alert("Account name cannot be empty!")
    }
  }

  const [isHovered, setIsHovered] = useState(false);
  const display = isHovered ? 'right-panel-active' : '';
  const container = 'container';

  function Switch_right() {
    setIsHovered(true)
  }

  function Switch_left() {
    setIsHovered(false)
  }

  return (
    <div className="login">
      <div className="title">
        <h1>Welcome to Vanguard ETF Digital Assistant</h1>
      </div>
      <div className={`${container} ${display}`}>
        <div className="form-container sign-up-container">
          <form action="###">
            <h1>Registration</h1>
            <input type="text" placeholder="name" onChange={(e) => setregister_name(e.target.value)} />
            <input type="email" placeholder="email" onChange={(e) => setregister_email(e.target.value)} />
            <input type="password" placeholder="password" onChange={(e) => setregister_password(e.target.value)} />
            <button type="button" onClick={register_user}>register</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="###">
            <h1>Login</h1>
            <input type="text" placeholder="email" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} />
            <button type="button" onClick={login_user}>Login</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Existing account?</h1>
              <p>Please use your account to log in</p>
              <button className="ghost" type="button" onClick={Switch_left}>Login</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>No account?</h1>
              <p>Register and join us now</p>
              <button className="ghost" type="button" onClick={Switch_right}>register</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})
