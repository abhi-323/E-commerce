import { Route, redirect } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  return <Route {...rest}>{children}</Route>;
};

export default PrivateRoute;
