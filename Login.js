// import React, { useState } from 'react';
// import { loginUser } from '../api';
// import { useHistory } from 'react-router-dom';

// const Login = ({ setToken }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const history = useHistory();

//   const handle
// }
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';  // Import useHistory for navigation
import { loginUser } from '../api';  // Import the login function from the API helper

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();  // useHistory hook for navigation after login

  const handleLogin = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior

    try {
      // Call the login API
      const { data } = await loginUser({ email, password });

      // If login is successful, set the token and redirect to protected route
      setToken(data.token);
      history.push('/protected');  // Navigate to the protected page
    } catch (error) {
      // If an error occurs (invalid credentials or other issues), set the error message
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div>
        <p>Don't have an account? <a href="/register">Register here</a></p>
      </div>
    </div>
  );
};

export default Login;

