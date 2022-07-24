/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { GrFormClose } from "react-icons/gr";

import { SecondaryButton, SubmitButton } from "./styled/CustomButtons";
import FormGroup from "./styled/FormGroup";

import PropTypes from "prop-types";

const url = `${process.env.REACT_APP_API_URL}/api/expenses`;

const AddExpenseDialog = ({ visible, onConfirm, onDismiss }) => {
	const [expenseDate, setExpenseDate] = useState(Date.now());
	const [expenseAmount, setExpenseAmount] = useState(0);
	const [expenseDescription, setExpenseDescription] = useState("");

	const [animatingAppear, setAnimatingAppear] = useState(false);
	//const [animatingDisappear, setAnimatingDisappear] = useState(false);

	useEffect(() => {
		if (visible) setAnimatingAppear(true);
		//else setAnimatingDisappear(true);
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

		onConfirm();
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
				<h2>Add new expense</h2>
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
							<SubmitButton value="Add expense" />
							<SecondaryButton onClick={() => onDismiss()}>
								Cancel
							</SecondaryButton>
						</DialogActions>
					</form>
				</div>
			</Dialog>
		</Overlay>
	);
};

AddExpenseDialog.propTypes = {
	visible: PropTypes.bool,
	onConfirm: PropTypes.func,
	onDismiss: PropTypes.func,
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
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: var(--popup-z-index);
	animation-duration: 0.3s;
	animation-timing-function: ease;
`;

const Dialog = styled.div`
	width: 90%;
	position: absolute;
	padding: 40px 20px 20px;
	border-radius: 0.5em;
	background: #fff;

	.dialog-content {
		margin: 40px 0px 0 0;
	}

	@media (max-width: 420px) {
		.form-main {
			padding-right: 0px;

			input {
				width: 100%;
			}
		}
	}
`;

const DialogActions = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	row-gap: 10px;
	margin-top: 60px;

	button {
		width: 100%;
	}
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
