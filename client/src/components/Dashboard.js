import NewProduct from "./NewProduct";
import loginContext from "../contexts/loginContext";
import { useContext } from "react";
import "../styles/Dashboard.css";
import { Link } from "react-router-dom";
import AddAdmin from "./AddAdmin";
const Dashboard = () => {
  const { loggedUser } = useContext(loginContext);

  return (
    <>
      {loggedUser.isadmin ? (
        <div className="dashboard">
          <NewProduct />
          <AddAdmin />
        </div>
      ) : (
        <Link to="/sign-in" className="dashboard_signin_btn">
          <button>Please sign in first</button>
        </Link>
      )}
    </>
  );
};
export default Dashboard;
