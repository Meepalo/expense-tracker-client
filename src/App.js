import {
	BrowserRouter as Router,
	Outlet,
	Routes,
	Route,
	Navigate,
	useNavigate,
	useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import jwt from "jsonwebtoken";

import Appbar from "./components/Appbar";
import { PageWrapper } from "./components/styled/PageWrapper";
import MonhtlyOverview from "./pages/MonthlyOverview";
import YearlyOverview from "./pages/YearlyOverview";
import Login from "./pages/Login";
import { ContentWrapper } from "./components/styled/ContentWrapper";

const loginUrl = `${process.env.REACT_APP_API_URL}/api/login`;

function App() {
	const [userLoggedIn, setUserLoggedIn] = useState(null);
	const [userEmail, setUserEmail] = useState(null);

	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const token = localStorage.getItem("token");
		console.log(token);
		if (token != null) {
			setUserLoggedIn(true);
			setUserEmail(jwt.decode(token).email);
		} else {
			logoutUser();
		}
	}, [navigate]);

	const loginUser = async (email, password) => {
		const res = await fetch(loginUrl, {
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
			method: "POST",
		});

		const loginResponse = await res.json();

		if (loginResponse.status == "OK") {
			localStorage.setItem("token", loginResponse.user);
			setUserLoggedIn(true);
			navigate("/");
		}
	};

	const logoutUser = () => {
		localStorage.removeItem("token");
		setUserLoggedIn(false);
		setUserEmail(null);
	};

	return userLoggedIn == null ? null : (
		<PageWrapper>
			<Appbar onLogout={logoutUser} />
			<ScrollToTop />
			<ContentWrapper>
				<Routes>
					<Route
						exact
						path="/"
						element={<ProtectedRoute userLoggedIn={userLoggedIn} />}
					>
						<Route
							path="/monthly"
							element={<MonhtlyOverview user={userEmail} />}
						/>
						<Route path="/" element={<YearlyOverview />} />
					</Route>
					<Route
						exact
						path="/"
						element={<NotLoggedInRoute userLoggedIn={userLoggedIn} />}
					>
						<Route path="/login" element={<Login onLogin={loginUser} />} />
					</Route>
				</Routes>
			</ContentWrapper>
		</PageWrapper>
	);
}

const ProtectedRoute = ({ userLoggedIn }) => {
	return userLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

const NotLoggedInRoute = ({ userLoggedIn }) => {
	return userLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

const ScrollToTop = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
};

export default App;
