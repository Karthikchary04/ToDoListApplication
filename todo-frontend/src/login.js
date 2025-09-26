
import React, { useState } from 'react';
import TodoPage from './todopage';
import RegisterUser from './registerUser';

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const redirectToRegisterUserPage = () => {
    setShowRegister(true);
  }

  const verifyLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const user = { username, password };
    fetch('http://localhost:8080/user/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error while logging in');
      }
      return response.json();
    })
    .then(data => {
      // Expecting data.token from backend
      if (data.token) {
        localStorage.setItem('jwtToken', data.token);
        setIsLoggedIn(true);
      } else {
        throw new Error('No token received');
      }
    })
    .catch(err => {
      console.error(err.message);
      alert('Error while logging in');
    });
  }

  if (isLoggedIn) {
    return <TodoPage />;
  }
  if (showRegister) {
    return <RegisterUser onRegister={() => setShowRegister(false)} />;
  }
  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login Page</h2>
        <form id="loginForm" className="login-form" onSubmit={verifyLogin}>
          <input
            type="text"
            placeholder="Username"
            name="username"
            required
            className="form-input"
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            required
            className="form-input"
          />
          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>
        <button className="btn btn-secondary btn-register" onClick={redirectToRegisterUserPage}> Register </button>
      </div>
    </div>
  );
}
export default Login;