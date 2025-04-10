import { useSelector } from "react-redux";

function FinancialPlaner() {

  const { user } = useSelector((state) => state.user);

  return (
    <div>
      <h1>Financial Planer Dashboard</h1>
      <p>Welcome {user.name}</p>
    </div>
  );
}

export default FinancialPlaner;