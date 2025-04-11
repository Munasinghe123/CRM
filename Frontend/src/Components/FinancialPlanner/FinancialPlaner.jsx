import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './FinancialPlanner.css';

function FinancialPlaner() {

  const { user,isAuthenticated,role } = useSelector((state) => state.user);

  return (
    <div className="financial-planner-dashboard-container">
      <div className="dashboard-content">
        <h1>Financial Planner Dashboard</h1>
        <p>Welcome, {user.name}</p>
        {isAuthenticated && (role === 'financial_planner' ) && (
          <>
            <Link to='/createTicket' className="header-link">Create Ticket</Link>
            <Link to='/viewTickets' className="header-link">View Tickets</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default FinancialPlaner;