import { useSelector } from 'react-redux';

function AdminDashboard() {
  
  const { user } = useSelector((state) => state.user);

  console.log('User state:', user);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {user ? (
        <p>Welcome, {user.name}!</p>  
      ) : (
        <p>Welcome to the admin dashboard!</p> 
      )}
    </div>
  );
}

export default AdminDashboard;
