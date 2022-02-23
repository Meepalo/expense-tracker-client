/** @jsxImportSource @emotion/react */
import { useState } from "react";
import MainContainer from "../components/MainContainer";
import { SubmitButton } from "../components/styled/CustomButtons";
import FormGroup from "../components/styled/FormGroup";

import PropTypes from "prop-types";

const Login = ({ onLogin }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<MainContainer>
			<h1>Login</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					onLogin(email, password);
				}}
			>
				<FormGroup>
					<label htmlFor="email">Email</label>
					<input
						type="text"
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</FormGroup>
				<FormGroup>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</FormGroup>
				<SubmitButton value="Login" />
			</form>
		</MainContainer>
	);
};

Login.propTypes = {
	onLogin: PropTypes.func,
};

export default Login;
