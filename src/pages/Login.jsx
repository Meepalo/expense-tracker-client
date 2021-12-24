/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainContainer from "../components/MainContainer";
import { SubmitButton } from "../components/styled/CustomButtons";
import FormGroup from "../components/styled/FormGroup";

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

export default Login;
