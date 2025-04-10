
import { Link, useNavigate } from "react-router-dom";

function LandingPage() {
  return (
    <div className="landing-page">
      <h1>Welcome to the Landing Page</h1>
      <p>This is the landing page of our application.</p>
      <Link to='/login'><button>Login</button></Link>
    </div>
  );
}

export default LandingPage;