/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import { monthNames } from "../../utils/Utils";

const MonthlyTotals = ({ totalExpenses, onClick }) => {
	const totals = totalExpenses.map((monthlyExpense, index) => (
		<div key={index}>
			<p
				css={css`
					font-size: 0.9rem;
				`}
			>
				{monthNames[index]}
			</p>
			<MonthlyExpense onClick={() => onClick(index)}>
				{monthlyExpense.total} kn
			</MonthlyExpense>
		</div>
	));

	return totals;
};

const MonthlyExpense = styled.div`
	padding: 10px;
	width: 100%;
	text-align: center;
	background: var(--col-primary);
	border-radius: 100px;
	font-size: 1.1rem;
	font-weight: 800;
	box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
	user-select: none;
	cursor: pointer;
`;

export default MonthlyTotals;
