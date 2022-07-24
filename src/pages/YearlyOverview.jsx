/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState, forwardRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

import MainContainer from "../components/MainContainer";
import TotalExpense from "../components/TotalExpense";
import LoadingAnimation from "../components/LoadingAnimation";
import MonthlyTotals from "../components/YearlyOverview/MonthlyTotals";

const yearUrl = `${process.env.REACT_APP_API_URL}/api/expenses`;

const YearlyOverview = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
	const [yearlyTotal, setYearlyTotal] = useState(null);
	const [monthlyTotals, setMonthlyTotals] = useState(Array(12).fill(0, 0));
	const [isDataFetching, setIsDataFetching] = useState(true);

	const navigate = useNavigate();

	const fetchData = async () => {
		setIsDataFetching(true);
		const res = await fetch(`${yearUrl}/${selectedYear}`, {
			headers: {
				"Content-Type": "application/json",
				"x-access-token": localStorage.getItem("token"),
			},
			method: "GET",
		});

		const expensesResponse = await res.json();

		if (expensesResponse.status == "OK") {
			setYearlyTotal(expensesResponse.total);
			setMonthlyTotals(expensesResponse.expenses);
			setIsDataFetching(false);
		}
	};

	useEffect(async () => {
		setSelectedYear(selectedDate.getFullYear());
	}, [selectedDate]);

	useEffect(async () => {
		await fetchData();
	}, [selectedYear]);

	const CustomYearInput = forwardRef(function CustomYearInput(
		// eslint-disable-next-line react/prop-types
		{ value, onClick },
		ref
	) {
		return (
			<button css={customYearInputCSS} onClick={onClick} ref={ref}>
				{value}
			</button>
		);
	});

	const navigateToMonthlyOverview = (monthIndex) => {
		navigate(`/monthly?year=${selectedYear}&month=${monthIndex}`);
	};

	return (
		<>
			<MainContainer>
				<h1 css={{ marginTop: "20px" }}>Yearly expenses</h1>
				<DatePicker
					selected={selectedDate}
					onChange={(date) => setSelectedDate(date)}
					showYearPicker
					dateFormat="yyyy"
					popperContainer={"label"}
					customInput={<CustomYearInput />}
				/>
				{isDataFetching ? (
					<LoadingAnimation />
				) : (
					<ExpensesLayout>
						<TotalExpense value={yearlyTotal} />
						<MonthlyTotals
							totalExpenses={monthlyTotals}
							onClick={navigateToMonthlyOverview}
						/>
					</ExpensesLayout>
				)}
			</MainContainer>
		</>
	);
};

const customYearInputCSS = css`
	padding: 5px 15px;
	border-radius: 0.2em;
	font-size: 1.3rem;
	font-weight: 900;
	width: fit-content;
	margin: 10px 0;
	box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
`;

const ExpensesLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-row-gap: 40px;
	grid-column-gap: 40px;
`;

export default YearlyOverview;
