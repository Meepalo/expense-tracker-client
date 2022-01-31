/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import AddExpenseDialog from "./AddExpenseDialog";

import { PrimaryButton } from "./styled/CustomButtons";

const Appbar = ({ onLogout, onExpenseAdded }) => {
	const [addExpenseDialogVisible, setAddExpenseDialogVisible] = useState(false);

	return (
		<header css={headerStyle}>
			<nav css={navStyle}>
				<PrimaryButton onClick={() => setAddExpenseDialogVisible(true)}>
					Add new expense
				</PrimaryButton>
				<button onClick={() => onLogout()}>Logout</button>
			</nav>
			<AddExpenseDialog
				visible={addExpenseDialogVisible}
				onConfirm={() => {
					setAddExpenseDialogVisible(false);
					onExpenseAdded();
				}}
				onDismiss={() => {
					setAddExpenseDialogVisible(false);
				}}
			/>
		</header>
	);
};

const headerStyle = css`
	position: sticky;
	display: flex;
	justify-content: flex-end;
	margin-bottom: 80px;
	z-index: 5;
`;

const navStyle = css`
	display: flex;
	column-gap: 30px;
	padding: 10px 25px;
	background: linear-gradient(
		to right bottom,
		rgba(255, 255, 255, 0.7) 0%,
		rgba(255, 255, 255, 0.07) 100%
	);
	backdrop-filter: blur(20px);
	border-radius: 0px 0px 10px 10px;
	box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.15);
`;

export default Appbar;
