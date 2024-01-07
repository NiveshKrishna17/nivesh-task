import { useState } from "react";
import { Navigate } from "react-router-dom";
import { getSession } from "./config/session";

const PrivateRoute = ({ Component }) => {
  const [isAuthenticated] = useState(getSession("isAuthenticated"));

  return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};
export default PrivateRoute;
