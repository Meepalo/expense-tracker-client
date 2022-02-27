/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import PropTypes from "prop-types";

const ExpenseItem = ({ expense, user, onPreview, onEdit, onDelete }) => {
	return (
		<Container>
			<div
				className="expenseItemColor"
				css={css`
					background: ${expense.user == "Matko"
						? "var(--col-matko-expense)"
						: "var(--col-toni-expense)"};
				`}
			></div>
			<span className="expenseItemDate">
				{new Date(expense.date).toLocaleDateString("hr-HR")}
			</span>
			<span className="expenseItemUser">{expense.user}</span>
			<span
				className="expenseItemAmount"
				css={css`
					width: 100px;
				`}
			>
				{expense.amount} kn
			</span>
			<ExpenseItemControls sameUser={user == expense.user}>
				<button onClick={() => onPreview(expense)}>
					<MdRemoveRedEye size={22} />
				</button>
				<button
					onClick={() => {
						if (user == expense.user) onEdit(expense);
					}}
					css={css`
						background: ${expense.user != user ? "#BCBCBC" : ""} !important;
					`}
				>
					<MdEdit size={22} />
				</button>
				<button
					onClick={() => {
						if (user == expense.user) onDelete(expense._id);
					}}
					css={css`
						background: ${expense.user != user ? "#BCBCBC" : ""} !important;}
					`}
				>
					<MdDelete size={22} />
				</button>
			</ExpenseItemControls>
		</Container>
	);
};

ExpenseItem.propTypes = {
	expense: PropTypes.object,
	user: PropTypes.string,
	onPreview: PropTypes.func,
	onEdit: PropTypes.func,
	onDelete: PropTypes.func,
};

const Container = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 12px 24px;
	background: var(--col-primary);
	border-radius: 8px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

	.expenseItemColor {
		width: 24px;
		height: 24px;
		border-radius: 100px;
	}

	.expenseItemAmount {
		font-weight: 700;
	}

	@media (max-width: 420px) {
		font-size: 0.8rem;
		padding: 12px 8px;
	}
`;

const ExpenseItemControls = styled.div`
	display: flex;
	column-gap: 10px;

	button {
		width: 32px;
		height: 32px;
		border-radius: 100px;
		background: #fff;
		box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
		display: grid;
		place-items: center;
	}
`;

export default ExpenseItem;
