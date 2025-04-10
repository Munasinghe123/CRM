import { useSelector } from "react-redux";

function MortgageBroker() {

  const { user } = useSelector((state) => state.user);

  return (
    <div>
      <h1>Mortgage Broker Dashboard</h1>
      <p>Welcome {user.name}! </p>
    </div>
  );
}
export default MortgageBroker;