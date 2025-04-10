import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { logout } from "../Redux/UserSlice";



function Header(){
    const {isAuthenticated} = useSelector((state) => state.user);
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
    }
    return(
        <>
            {isAuthenticated ?
            (<button onClick={handleLogout}>Logout</button>):
            (<Link to='/login'><button>Login</button></Link>) }    
        </>
    )

}

export default Header;