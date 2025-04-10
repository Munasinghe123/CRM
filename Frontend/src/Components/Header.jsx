import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { logout } from "../Redux/UserSlice";



function Header(){
    const {isAuthenticated,role} = useSelector((state) => state.user);
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
            {isAuthenticated && role === 'admin' && (
                <Link to='/register'>Register users</Link>
            )}

            {isAuthenticated && (role === 'financial_planner' || role === 'mortgage_broker') && (
              <>
                <Link to='/createTicket'>Create Ticket</Link>
                <Link to='/viewTickets'>View Tickets</Link>
              </>
            )}

            {isAuthenticated ?
            (<>
              <button onClick={handleLogout}>Logout</button>
            </>
            ):
            (
              <>
                <Link to='/login'><button>Login</button></Link>
              </>
            )}  
        </>
    )

}

export default Header;