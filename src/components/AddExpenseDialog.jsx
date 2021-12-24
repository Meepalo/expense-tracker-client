/** @jsxImportSource @emotion/react */
import { jsx, css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { GrFormClose } from "react-icons/gr";

import { SecondaryButton, SubmitButton } from "./styled/CustomButtons";
import FormGroup from "./styled/FormGroup";

const url = `${process.env.REACT_APP_API_URL}/api/expenses`;

const AddExpenseDialog = ({ visible, onDismiss }) => {
	const [expenseDate, setExpenseDate] = useState(Date.now());
	const [expenseAmount, setExpenseAmount] = useState(0);
	const [expenseDescription, setExpenseDescription] = useState("");

	const [animatingAppear, setAnimatingAppear] = useState(false);
	const [animatingDisappear, setAnimatingDisappear] = useState(false);

	useEffect(() => {
		if (visible) setAnimatingAppear(true);
		else setAnimatingDisappear(true);
	}, [visible]);

	const addExpense = async () => {
		if (expenseAmount <= 0) return;

		const res = await fetch(url, {
			method: "POST",
			headers: {
				"x-access-token": localStorage.getItem("token"),
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				expense: {
					date: expenseDate,
					amount: expenseAmount,
					description: expenseDescription,
				},
			}),
		});

		const result = await res.json();

		if (result.status == "error") {
			console.log("Error: " + result.error);
		}

		onDismiss();
	};

	if (!visible) return null;

	return (
		<Overlay
			css={css`
				animation-name: ${animatingAppear ? appearAnimation : ""};
			`}
		>
			<Dialog>
				<CloseButton onClick={() => onDismiss()} />
				<h1>Add new expense</h1>
				<div className="dialog-content">
					<form
						onSubmit={(e) => {
							e.preventDefault();
							addExpense();
						}}
					>
						<div className="form-main">
							<FormGroup>
								<label htmlFor="expenseDate">Date</label>
								<input
									type="date"
									name="expenseDate"
									value={expenseDate}
									placeholder={"Today"}
									onChange={(e) => setExpenseDate(e.target.value)}
								/>
							</FormGroup>
							<FormGroup>
								<label htmlFor="expenseAmount">Amount</label>
								<input
									type="number"
									name="expenseAmount"
									min={0}
									value={expenseAmount}
									onChange={(e) => {
										if (e.target.value >= 0) setExpenseAmount(e.target.value);
										else setExpenseAmount(0);
									}}
								/>
							</FormGroup>
							<FormGroup>
								<label htmlFor="expenseDescription">Description</label>
								<textarea
									name="expenseDescription"
									rows="3"
									value={expenseDescription}
									onChange={(e) => {
										setExpenseDescription(e.target.value);
									}}
								></textarea>
							</FormGroup>
						</div>
						<DialogActions>
							<SecondaryButton onClick={() => onDismiss()}>
								Cancel
							</SecondaryButton>
							<SubmitButton value="Add expense" />
						</DialogActions>
					</form>
				</div>
			</Dialog>
		</Overlay>
	);
};

const appearAnimation = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const Overlay = styled.div`
	position: fixed;
	display: grid;
	place-items: center;
	background: rgba(0, 0, 0, 0.4);
	backdrop-filter: blur(20px);
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	z-index: var(--popup-z-index);
	animation-duration: 0.3s;
	animation-timing-function: ease;
`;

const Dialog = styled.div`
	position: absolute;
	padding: 40px;
	border-radius: 30px;
	background: var(--col-primary);

	.dialog-content {
		margin: 40px 0px 0 0;
	}

	.form-main {
		padding-right: 260px;
	}
`;

const DialogActions = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	column-gap: 20px;
	margin-top: 60px;
`;

const CloseButton = styled(GrFormClose)`
	position: absolute;
	right: 20px;
	top: 20px;
	width: 24px;
	height: 24px;
	cursor: pointer;
`;

export default AddExpenseDialog;
