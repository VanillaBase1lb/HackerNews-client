import { useContext } from "react";
import {
    useLocation,
    Navigate,
  } from "react-router-dom";
import { UserContext } from "../context/userContext";


function RequireAuth({ children }) {
    const userDetails = useContext(UserContext)
    let location = useLocation();
  
    if (!userDetails) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    return children;
  }


export default RequireAuth