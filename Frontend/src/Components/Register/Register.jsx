import { useState } from "react";
import axios from "axios";
import './Register.css';

function Register(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const[message, setMessage] = useState('');
    const[error,setError] = useState('');

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/users/register', {
                name,
                email,
                password,
                role
            },{withCredentials:true});
            console.log(res.data.message);
            setMessage(res.data.message);

            setName('');
            setEmail('');
            setPassword('');
            setRole('');
            setError('');
        } catch (err) {
            console.error(err.response?.data?.message || 'Something went wrong');
            setError(err.response?.data?.message || 'Something went wrong');
        }
    }

    return (
        <div className="register-container">
          {message && <p>{message}</p>}
          {error && <p>{error}</p>}
      
          <h1>Register Users</h1>
          <form onSubmit={registerUser} className="register-form">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select role</option>
              <option value="financial_planner">Financial Planner</option>
              <option value="mortgage_broker">Mortgage Broker</option>
            </select>
            <button type="submit">Register</button>
          </form>
        </div>
      );
}

export default Register;