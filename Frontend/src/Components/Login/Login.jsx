import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate,Link } from "react-router-dom";
import { loginSuccess } from '../../Redux/UserSlice';
import './Login.css';

function Login() {
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        { name, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, 
        }
      );

      const { user, role } = response.data;

      console.log("Login successful:", user, role);

      dispatch(loginSuccess({ user, role }));


      if (role === "admin") {
        navigate("/admin");
      } else if (role === "financial_planner") {
        navigate("/financialPlanner");
      } 
      else if(role === "mortgage_broker"){
        navigate('/mortgageBroker');
      }
      else {
        navigate("/unauthorized");
      }
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={submitForm} className="login-form">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={name}
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Link to='/forgotPassword' className="forgot-link">Forgot password?</Link>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
