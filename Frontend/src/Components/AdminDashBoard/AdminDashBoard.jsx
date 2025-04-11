import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './AdminDashBoard.css';

function AdminDashboard() {
  
  const { user,isAuthenticated, role } = useSelector((state) => state.user);

  console.log('User state:', user);

  return (
    <div className="admin-dashboard-container">
      <div className="dashboard-content">
        <h1>Admin Dashboard</h1>
        <p>Welcome, {user.name}!</p>
        {isAuthenticated && role === 'admin' && (
          <Link to='/register' className="dashboard-link">Register Users</Link>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
