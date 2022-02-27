import { Outlet, Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export const ProtectedRoute = ({ userLoggedIn }) => {
	return userLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

ProtectedRoute.propTypes = {
	userLoggedIn: PropTypes.bool,
};

export const NotLoggedInRoute = ({ userLoggedIn }) => {
	return userLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

NotLoggedInRoute.propTypes = {
	userLoggedIn: PropTypes.bool,
};
