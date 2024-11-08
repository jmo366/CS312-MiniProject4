import React, { useState } from 'react';
import axios from 'axios';

const SignUp = ({ onSignUp }) => {
  const [user_id, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        user_id,
        password,
        name
      });
      if (response.data.success) {
        onSignUp(); 
      }
    } catch (err) {
      return err;
    }
  };
  return (
    <div className="form-container">
      <h2>Sign Up</h2>
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
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
