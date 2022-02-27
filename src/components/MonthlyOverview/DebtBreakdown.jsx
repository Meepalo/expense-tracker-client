/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const DebtBreakdown = ({ expenses }) => {
	const [matkoExpenseTotal, setMatkoExpenseTotal] = useState(0);
	const [toniExpenseTotal, setToniExpenseTotal] = useState(0);

	useEffect(() => {
		let matkoTotal = expenses
			.filter((expense) => expense.user == "Matko")
			.reduce((acc, expense) => acc + expense.amount, 0);

		let toniTotal = expenses
			.filter((expense) => expense.user == "Toni")
			.reduce((acc, expense) => acc + expense.amount, 0);

		setMatkoExpenseTotal(matkoTotal);
		setToniExpenseTotal(toniTotal);
	}, [expenses]);

	const printDebt = () => {
		let payedLess = matkoExpenseTotal < toniExpenseTotal ? "Matko" : "Toni";
		let payedMore = payedLess == "Matko" ? "Toni" : "Matko";
		let difference = Math.abs(matkoExpenseTotal - toniExpenseTotal) / 2;

		return `${payedLess} owes ${payedMore} ${difference} kn`;
	};

	return (
		<>
			<UserTotal>
				<span className="user">Matko:</span>
				{matkoExpenseTotal} kn
			</UserTotal>

			<UserTotal>
				<span>Toni:</span>
				{toniExpenseTotal} kn
			</UserTotal>

			<ExpenseDifference>{printDebt()}</ExpenseDifference>
		</>
	);
};

DebtBreakdown.propTypes = {
	expenses: PropTypes.arrayOf(PropTypes.object),
};

const UserTotal = styled.p`
	margin: 10px 0;

	span {
		margin-right: 16px;
	}

	&:not(.user) {
		font-weight: bold;
	}
`;

const ExpenseDifference = styled.p`
	margin: 10px 0;
`;

export default DebtBreakdown;
