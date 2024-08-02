import React, { memo, useState, useEffect } from 'react'

import './style.css'
import axiosInstance from "../../service/request"

export default memo(function Title() {

  const [token, setToken] = useState('')
  useEffect(() => {
    const savedToken = localStorage.getItem('user');

    if (savedToken) {
      setToken(JSON.parse(savedToken).name);
    }
  }, []);

  function quit() {
    axiosInstance.post('/logout').then((result) => {
      localStorage.removeItem('user');
      setToken('');
      window.location.reload()
    }).catch((err) => {
      alert("403")
      localStorage.removeItem('user');
      window.location.reload()
    });
  }

  return (
    <div>
      <div className="title">
        <ul>
          <li>
            <h1>
              Welcome&nbsp;&nbsp;<span>{token}</span>
            </h1>
          </li>
          <li>
            <button onClick={quit}>Log Out</button>
          </li>
        </ul>
      </div>
    </div>
  )
})
