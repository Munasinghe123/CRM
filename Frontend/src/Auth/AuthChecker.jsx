
import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../Redux/UserSlice";

const AuthChecker = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/current", {
          withCredentials: true,
        });
        const { user, role } = res.data;

        console.log("Auth check successful:", user, role);

        dispatch(loginSuccess({ user, role }));
      } catch (err) {
        console.log("Auth check failed:", err.response?.data?.message || err.message);
      }
    };

    checkAuth();
  }, [dispatch]);

  return null; 
};

export default AuthChecker;
