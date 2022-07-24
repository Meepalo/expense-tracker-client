/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { monthNames } from "../../utils/Utils";

const MonthlyTotals = ({ totalExpenses, onClick }) => {
	const totals = totalExpenses.map((monthlyExpense, index) => (
		<div key={index}>
			<p css={titleCSS}>{monthNames[index]}</p>
			<MonthlyExpense onClick={() => onClick(index)}>
				<span>{monthlyExpense.total.toFixed(2)} kn</span>

				<svg viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M22.7071 8.70711C23.0976 8.31658 23.0976 7.68342 22.7071 7.29289L16.3431 0.928932C15.9526 0.538408 15.3195 0.538408 14.9289 0.928932C14.5384 1.31946 14.5384 1.95262 14.9289 2.34315L20.5858 8L14.9289 13.6569C14.5384 14.0474 14.5384 14.6805 14.9289 15.0711C15.3195 15.4616 15.9526 15.4616 16.3431 15.0711L22.7071 8.70711ZM0 9H22V7H0V9Z"
						fill="#0E1631"
					/>
				</svg>
			</MonthlyExpense>
		</div>
	));

	return totals;
};

const titleCSS = css`
	font-weight: 900;
	margin-bottom: 10px;
	font-size: 0.9rem;
`;

const MonthlyExpense = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 16px;
	text-align: center;
	border-radius: 0.2em;
	font-size: 1rem;
	font-weight: bold;
	box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.15);
	user-select: none;
	cursor: pointer;

	svg {
		height: 1rem;
	}
`;

export default MonthlyTotals;
