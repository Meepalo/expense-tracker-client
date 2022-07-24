import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { css } from "@emotion/react";
import jwt from "jsonwebtoken";

import { ProtectedRoute, NotLoggedInRoute } from "./components/routes/Routes";
import Header from "./components/Header";
import { PageWrapper } from "./components/styled/PageWrapper";
import MonhtlyOverview from "./pages/MonthlyOverview";
import YearlyOverview from "./pages/YearlyOverview";
import Login from "./pages/Login";
import { ContentWrapper } from "./components/styled/ContentWrapper";
import Alert from "./components/Alert";
import { login, logout } from "./repo/loginRepository";
import AddExpenseDialog from "./components/AddExpenseDialog";

function App() {
	const [userLoggedIn, setUserLoggedIn] = useState(null);
	const [userEmail, setUserEmail] = useState(null);

	const [addExpenseDialogVisible, setAddExpenseDialogVisible] = useState(false);

	const [alertVisible, setAlertVisible] = useState(false);
	const [alertMessage, setAlertMessage] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token != null) {
			try {
				setUserLoggedIn(true);
				setUserEmail(jwt.decode(token).email);
			} catch {
				logoutUser();
			}
		} else {
			logoutUser();
		}
	}, [navigate]);

	const loginUser = async (email, password) => {
		const isLoginSuccessful = login(email, password);

		if (isLoginSuccessful) {
			setUserLoggedIn(true);
			navigate("/");
		}
	};

	const logoutUser = () => {
		logout();
		setUserLoggedIn(false);
		setUserEmail(null);
	};

	const showAlert = (message) => {
		setAlertMessage(message);
		setAlertVisible(true);
	};

	return userLoggedIn == null ? null : (
		<>
			<Header
				onLogout={logoutUser}
				onAddExpenseClicked={() => setAddExpenseDialogVisible(true)}
			/>
			<AddExpenseDialog
				css={css`
					z-index: 100;
				`}
				visible={addExpenseDialogVisible}
				onConfirm={() => {
					setAddExpenseDialogVisible(false);
					showAlert("Expense added successfully");
				}}
				onDismiss={() => {
					setAddExpenseDialogVisible(false);
				}}
			/>
			<PageWrapper>
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
								element={
									<MonhtlyOverview
										user={userEmail}
										onExpenseDeleted={() =>
											showAlert("Expense deleted successfully")
										}
									/>
								}
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
				<Alert
					visible={alertVisible}
					message={alertMessage}
					onShow={() => setAlertVisible(false)}
					onTimeout={() => setAlertVisible(false)}
				/>
			</PageWrapper>
		</>
	);
}

const ScrollToTop = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return null;
};

export default App;
