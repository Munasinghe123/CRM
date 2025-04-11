import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './MortgageBroker.css';

function MortgageBroker() {

  const { user,isAuthenticated,role } = useSelector((state) => state.user);

  return (
    <div className="mortgage-broker-dashboard-container">
      <div className="dashboard-content">
        <h1>Mortgage Broker Dashboard</h1>
        <p>Welcome, {user.name}!</p>
        {isAuthenticated && (role === 'mortgage_broker') && (
          <>
            <Link to='/createTicket' className="header-link">Create Ticket</Link>
            <Link to='/viewTickets' className="header-link">View Tickets</Link>
          </>
        )}
      </div>
    </div>
  );
}
export default MortgageBroker;