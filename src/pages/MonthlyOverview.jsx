/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import MainContainer from "../components/MainContainer";

import TotalExpense from "../components/TotalExpense";
import ExpenseItem from "../components/MonthlyOverview/ExpenseItem";
import SecondaryContainerDesktop from "../components/SecondaryContainerDesktop";
import ExpenseForm from "../components/ExpenseForm";

import PropTypes from "prop-types";

import DebtBreakdown from "../components/MonthlyOverview/DebtBreakdown";
import MonthlyOverviewHeader from "../components/MonthlyOverview/MonthlyOverviewHeader";

const baseUrl = `${process.env.REACT_APP_API_URL}/api/expenses`;

const MonhtlyOverview = ({ user, onExpenseDeleted }) => {
	const [monthlyTotal, setMonthlyTotal] = useState(0);
	const [expenses, setExpenses] = useState([]);

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

		const res = await fetch(`${baseUrl}/${newYear}/${newMonth}`, {
			headers: {
				"x-access-token": localStorage.getItem("token"),
			},
		});

		const expensesResult = await res.json();

		if (expensesResult.status == "OK") {
			setMonthlyTotal(expensesResult.total);
			setExpenses(expensesResult.expenses);
		}
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
			onExpenseDeleted();
		}
	};

	const listedExpenses = expenses.map((expense) => (
		<ExpenseItem
			key={expense._id}
			expense={expense}
			user={user}
			onPreview={showPreviewDialog}
			onEdit={showEditDialog}
			onDelete={deleteExpense}
		/>
	));

	return (
		<>
			<MainContainer>
				<MonthlyOverviewHeader />

				<TotalExpense value={monthlyTotal} />

				<DebtBreakdown expenses={expenses} />

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
					<SecondaryContainerDesktop>
						<h2>Edit</h2>
						<ExpenseForm
							onDismiss={() => closeDialogs()}
							onSubmit={handleEditDialogSubmit}
							id={chosenExpenseId}
							date={chosenExpenseDate}
							amount={chosenExpenseAmount}
							description={chosenExpenseDescription}
						/>
					</SecondaryContainerDesktop>
				)}

				{/* Preview dialog */}
				{previewDialogVisible && (
					<SecondaryContainerDesktop>
						<h2>Preview</h2>
					</SecondaryContainerDesktop>
				)}
			</Aside>
		</>
	);
};

MonhtlyOverview.propTypes = {
	user: PropTypes.string,
	onExpenseDeleted: PropTypes.func,
};

const ExpensesContainer = styled.main`
	display: flex;
	flex-direction: column;
	row-gap: 10px;
	margin-top: 60px;
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
