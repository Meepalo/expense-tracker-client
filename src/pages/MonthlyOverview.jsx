/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import MainContainer from "../components/MainContainer";
import { StyledLink } from "../components/styled/CustomButtons";

import { IoIosArrowRoundBack } from "react-icons/io";
import { MdRemoveRedEye, MdEdit, MdDelete } from "react-icons/md";
import TotalExpense from "../components/TotalExpense";
import SecondaryContainer from "../components/SecondaryContainer";
import ExpenseForm from "../components/ExpenseForm";

const monthNames = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

const baseUrl = `${process.env.REACT_APP_API_URL}/api/expenses`;

const MonhtlyOverview = ({ user }) => {
	const [month, setMonth] = useState(null);
	const [year, setYear] = useState(null);

	const [monthlyTotal, setMonthlyTotal] = useState(0);
	const [expenses, setExpenses] = useState([]);
	const [matkoExpenseTotal, setMatkoExpenseTotal] = useState(0);
	const [toniExpenseTotal, setToniExpenseTotal] = useState(0);

	const [editDialogVisible, setEditDialogVisible] = useState(false);
	const [previewDialogVisible, setPreviewDialogVisible] = useState(false);

	// Edit and preview dialog expense fields
	const [chosenExpenseId, setChosenExpenseId] = useState(null);
	const [chosenExpenseDate, setChosenExpenseDate] = useState(null);
	const [chosenExpenseAmount, setChosenExpenseAmount] = useState(null);
	const [chosenExpenseDescription, setChosenExpenseDescription] =
		useState(null);

	const params = useSearchParams()[0];
	const location = useLocation();

	useEffect(async () => {
		fetchExpenses();
	}, [location]);

	const fetchExpenses = async () => {
		const newYear = params.get("year");
		const newMonth = params.get("month");

		if (newYear == null || newMonth == null) return;

		setYear(newYear);
		setMonth(newMonth);

		const res = await fetch(`${baseUrl}/${newYear}/${newMonth}`, {
			headers: {
				"x-access-token": localStorage.getItem("token"),
			},
		});

		const expensesResult = await res.json();

		if (expensesResult.status == "OK") {
			setMonthlyTotal(expensesResult.total);
			setExpenses(expensesResult.expenses);

			console.log(expensesResult.expenses);
		} else {
			console.log(expensesResult);
		}
	};

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

	const getPreviousMonth = () => {
		const pMonth = parseInt(month) - 1;
		if (pMonth < 0) return 11;
		return pMonth;
	};

	const getNextMonth = () => {
		const nMonth = parseInt(month) + 1;
		if (nMonth > 11) return 0;
		return nMonth;
	};

	const showEditDialog = (expense) => {
		setChosenExpenseId(expense._id);
		setChosenExpenseDate(expense.date);
		setChosenExpenseAmount(expense.amount);
		setChosenExpenseDescription(expense.description);

		setPreviewDialogVisible(false);
		setEditDialogVisible(true);
	};

	const showPreviewDialog = (expense) => {
		setChosenExpenseDate(expense.date);
		setChosenExpenseAmount(expense.amount);
		setChosenExpenseDescription(expense.description);

		setEditDialogVisible(false);
		setPreviewDialogVisible(true);
	};

	const closeDialogs = () => {
		setEditDialogVisible(false);
		setPreviewDialogVisible(false);
	};

	const handleEditDialogSubmit = async (id, date, amount, description) => {
		const res = await fetch(baseUrl, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
			body: JSON.stringify({
				expense: {
					_id: id,
					date,
					amount,
					description,
				},
			}),
		});

		const updateResult = await res.json();

		if (updateResult.status == "OK") {
			fetchExpenses();
		}
	};

	const deleteExpense = async (id) => {
		const res = await fetch(`${baseUrl}/${id}`, {
			method: "DELETE",
			headers: {
				"x-access-token": localStorage.getItem("token"),
			},
		});

		const deleteResponse = await res.json();

		if (deleteResponse.status == "OK") {
			fetchExpenses();
		}
	};

	const listedExpenses = expenses.map((expense) => (
		<ExpenseItem key={expense._id}>
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
				<button onClick={() => showPreviewDialog(expense)}>
					<MdRemoveRedEye size={22} />
				</button>
				<button
					onClick={() => {
						if (user == expense.user) showEditDialog(expense);
					}}
					css={css`
						background: ${expense.user != user ? "#BCBCBC" : ""} !important;
					`}
				>
					<MdEdit size={22} />
				</button>
				<button
					onClick={() => {
						if (user == expense.user) deleteExpense(expense._id);
					}}
					css={css`
						background: ${expense.user != user ? "#BCBCBC" : ""} !important;}
					`}
				>
					<MdDelete size={22} />
				</button>
			</ExpenseItemControls>
		</ExpenseItem>
	));

	const printDebt = () => {
		let payedLess = matkoExpenseTotal < toniExpenseTotal ? "Matko" : "Toni";
		let payedMore = payedLess == "Matko" ? "Toni" : "Matko";
		let difference = Math.abs(matkoExpenseTotal - toniExpenseTotal);

		return `${payedLess} owes ${payedMore} ${difference} kn`;
	};

	return (
		<>
			<MainContainer>
				<ContainerHeader>
					<StyledLink to="/">
						<IoIosArrowRoundBack size={32} />
						<span>Back to yearly expenses</span>
					</StyledLink>
					<div className="monthNavigation">
						<StyledLink
							to={`/monthly?year=${year}&month=${getPreviousMonth()}`}
						>
							<IoIosArrowRoundBack size={32} />
							<span>{monthNames[getPreviousMonth()]}</span>
						</StyledLink>
						<StyledLink to={`/monthly?year=${year}&month=${getNextMonth()}`}>
							<span>{monthNames[getNextMonth()]}</span>
							<IoIosArrowRoundBack
								size={32}
								css={css`
									transform: rotate(180deg);
								`}
							/>
						</StyledLink>
					</div>
				</ContainerHeader>
				<h1>
					{monthNames[month]} {year} expenses
				</h1>
				<TotalExpense value={monthlyTotal} />

				<UserTotal>
					<span className="user">Matko:</span>
					{matkoExpenseTotal} kn
				</UserTotal>

				<UserTotal>
					<span>Toni:</span>
					{toniExpenseTotal} kn
				</UserTotal>

				<ExpenseDifference>{printDebt()}</ExpenseDifference>

				<ExpensesContainer>
					{listedExpenses.length > 0 ? (
						listedExpenses
					) : (
						<p>No expenses recorded</p>
					)}
				</ExpensesContainer>
			</MainContainer>

			<Aside>
				{/* Edit dialog */}
				{editDialogVisible && (
					<SecondaryContainer>
						<h2>Edit</h2>
						<ExpenseForm
							onDismiss={() => closeDialogs()}
							onSubmit={handleEditDialogSubmit}
							id={chosenExpenseId}
							date={chosenExpenseDate}
							amount={chosenExpenseAmount}
							description={chosenExpenseDescription}
						/>
					</SecondaryContainer>
				)}

				{/* Preview dialog */}
				{previewDialogVisible && (
					<SecondaryContainer>
						<h2>Preview</h2>
					</SecondaryContainer>
				)}
			</Aside>
		</>
	);
};

const ContainerHeader = styled.header`
	display: flex;
	justify-content: space-between;
	margin-bottom: 40px;

	${StyledLink} {
		font-size: 0.85rem;
		display: flex;
		align-items: center;
		font-weight: 900;
	}

	.monthNavigation {
		display: flex;
		column-gap: 30px;
	}
`;

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

const ExpensesContainer = styled.main`
	display: flex;
	flex-direction: column;
	row-gap: 10px;
	margin-top: 60px;
`;

const ExpenseItem = styled.div`
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

const Aside = styled.div`
	position: absolute;
	right: 0;
	top: 40px;
	width: 45%;
	height: 100%;

	@media (max-width: 1240px) {
		position: relative;
		width: 80%;
		margin: 0 auto;
	}
`;

export default MonhtlyOverview;
