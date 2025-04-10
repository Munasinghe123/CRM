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
import Register from './Components/Register';

//financial planer pages
import FinancialPlaner from './Components/FinancialPlaner';

//mortgageBroker pages
import MortgageBroker from './Components/MortgageBroker';

//financial planer and mortgage broker pages
import CreateTicket from './Components/CreateTicket';
import ViewTickets from './Components/ViewTickets';
import ViewTicketDetails from './Components/ViewTicketDetails';

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
        <>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/register" element={<Register />} />
        </>
      )}

      {/* Financial Planner Routes */}
      {isAuthenticated && role ==='financial_planner' && (
        <Route path='/financialPlanner' element={<FinancialPlaner/>}/>
      )}

      {/* Mortgage Broker Routes */}
      {isAuthenticated && role === 'mortgage_broker' && (
        <Route path='/mortgageBroker' element={<MortgageBroker/>}/>
      )}

      {/*financial planner and mortage broker*/}
      {isAuthenticated && ( role ==='financial_planner'|| role ==='mortgage_broker')&& (
        <>
          <Route path="/createTicket" element={<CreateTicket />} />
          <Route path="/viewTickets" element={<ViewTickets />} />
          <Route path="/viewTicketDetails/:id" element={<ViewTicketDetails />} />
        </> 
      )}

    </Routes>
    </>
   
  );
};
export default App;