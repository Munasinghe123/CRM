import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../Redux/UserSlice";
import './Header.css'; 

function Header() {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/users/logout', {}, { withCredentials: true });
      dispatch(logout());
      console.log("Logged out, navigating to /");
      navigate('/');
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="header-container">
    
      {isAuthenticated ? (
        <button className="header-button" onClick={handleLogout}>Logout</button>
      ) : (
        <Link to='/login' className="header-button-link">
          Login
        </Link>
      )}
    </div>
  );
}

export default Header;