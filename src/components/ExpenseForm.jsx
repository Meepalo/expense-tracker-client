/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { SecondaryButton, SubmitButton } from "./styled/CustomButtons";
import FormGroup from "./styled/FormGroup";

import PropTypes from "prop-types";

const ExpenseForm = ({
	onSubmit,
	onDismiss,
	id = null,
	date = Date.now(),
	amount = 10,
	description = "",
}) => {
	const [expenseId, setExpenseId] = useState(null);
	const [expenseDate, setExpenseDate] = useState(date);
	const [expenseAmount, setExpenseAmount] = useState(amount);
	const [expenseDescription, setExpenseDescription] = useState(description);

	useEffect(() => {
		setExpenseId(id);
		setExpenseDate(date);
		setExpenseAmount(amount);
		setExpenseDescription(description);
	}, [id, date, amount, description]);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit(expenseId, expenseDate, expenseAmount, expenseDescription);
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
			<FormActions>
				<SecondaryButton onClick={() => onDismiss()}>Cancel</SecondaryButton>
				<SubmitButton value="Add expense" />
			</FormActions>
		</form>
	);
};

ExpenseForm.propTypes = {
	onSubmit: PropTypes.func,
	onDismiss: PropTypes.func,
	id: PropTypes.string,
	date: PropTypes.instanceOf(Date),
	amount: PropTypes.number,
	description: PropTypes.string,
};

const FormActions = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	column-gap: 20px;
	margin-top: 60px;
`;

export default ExpenseForm;
