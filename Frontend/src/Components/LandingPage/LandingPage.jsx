import { Link } from "react-router-dom";
import "./LandingPage.css"; 

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Welcome to the CRM System</h1>
        <p>Manage your clients and tickets efficiently with our secure and user-friendly CRM.</p>
      </div>
    </div>
  );
}

export default LandingPage;
