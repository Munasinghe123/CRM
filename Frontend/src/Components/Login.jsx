import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess } from '../Redux/UserSlice';

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
    <>
      <h1>Login</h1>
      <form onSubmit={submitForm}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={name}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default Login;
