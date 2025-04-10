import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

//token checker
import AuthChecker from './Auth/AuthChecker';

//open pages
import Login from './Components/Login';
import LandingPage from './Components/LandingPage';
import Header from './Components/Header';
import ForgotPassword from './Components/ForgotPassword'

//Admin only pages
import AdminDashboard from './Components/AdminDashBoard';

//financial planer pages
import FinancialPlaner from './Components/FinancialPlaner';

//mortgageBroker pages
import MortgageBroker from './Components/MortgageBroker';


const App = () => {
  const { isAuthenticated, role } = useSelector((state) => state.user);

  return (
    <>
    
    <AuthChecker/>
    <Header/>
    <Routes>

      {/* Public Routes */}
      {<Route path="/" element={<LandingPage />} />}
      {!isAuthenticated && <Route path="/login" element={<Login/>} />}
      {!isAuthenticated && <Route path="/forgotPassword" element={<ForgotPassword/>} />}

      {/* Admin Routes */}
      {isAuthenticated && role === 'admin' && (
        <Route path="/admin" element={<AdminDashboard />} />
      )}

      {/* Financial Planner Routes */}
      {isAuthenticated && role ==='financial_planner' && (
        <Route path='/financialPlanner' element={<FinancialPlaner/>}/>
      )}

      {/* Mortgage Broker Routes */}
      {isAuthenticated && role === 'mortgage_broker' && (
        <Route path='/mortgageBroker' element={<MortgageBroker/>}/>
      )}


    </Routes>
    </>
   
  );
};
export default App;