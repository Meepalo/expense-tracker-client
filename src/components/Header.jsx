/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState } from "react";

import { PrimaryButton } from "./styled/CustomButtons";

import PropTypes from "prop-types";

import backgroundImage from "../images/app-background.jpg";

const Header = ({ onAddExpenseClicked, onLogout }) => {
	return (
		<header
			css={[
				headerStyle,
				{
					backgroundImage: "url(" + backgroundImage + ")",
				},
			]}
		>
			<nav css={navStyle}>
				<PrimaryButton onClick={onAddExpenseClicked}>
					Add new expense
				</PrimaryButton>
				<button onClick={() => onLogout()}>Logout</button>
			</nav>
		</header>
	);
};

Header.propTypes = {
	onLogout: PropTypes.func,
	onAddExpenseClicked: PropTypes.func,
};

const headerStyle = css`
	position: sticky;
	height: 200px;
	background-size: cover;
	background-attachment: fixed;

	::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 50%;
		background: linear-gradient(
			180deg,
			rgba(0, 0, 0, 0.6) 0%,
			rgba(0, 0, 0, 0) 100%
		);
		z-index: -1;
	}
`;

const navStyle = css`
	width: 100%;
	max-width: 1024px;
	margin: 0 auto;
	display: flex;
	justify-content: flex-end;
	column-gap: 30px;
	padding: 10px 0;
	z-index: 5;

	* {
		color: #fff;
	}
`;

export default Header;
