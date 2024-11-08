import React, { useState } from 'react';
import axios from 'axios';

const SignIn = ({ onSignIn }) => {
  const [user_id, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signin', { user_id, password });
      if (response.data.success) {
        onSignIn(); 
      }
    } catch (err) {
      return 1;
    }
  };

  return (
    <div className="form-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <label>
          User ID:
          <input
            type="text"
            value={user_id}
            onChange={(event) => setUserId(event.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};
export default SignIn;
