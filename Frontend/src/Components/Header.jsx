import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/UserSlice";

function Header(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
          await axios.post('http://localhost:5000/api/users/logout', {}, { withCredentials: true });
          dispatch(logout());
          console.log("Logged out, navigating to /");
          navigate('/',{ replace: true });
        } catch (err) {
          console.error("Logout failed:", err);
        }
    }
    return(
        <>
            <button onClick={handleLogout}>Logout</button>
        </>
    )

}

export default Header;