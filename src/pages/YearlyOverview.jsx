/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";
import { useState, forwardRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";

import MainContainer from "../components/MainContainer";
import TotalExpense from "../components/TotalExpense";
import LoadingAnimation from "../components/LoadingAnimation";

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

const yearUrl = `${process.env.REACT_APP_API_URL}/api/expenses`;

const YearlyOverview = () => {
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
	const [yearlyTotal, setYearlyTotal] = useState(null);
	const [monhtlyTotals, setMonthlyTotals] = useState(
		monthNames.map((name) => 0)
	);
	const [isDataFetching, setIsDataFetching] = useState(true);

	const navigate = useNavigate();

	async function fetchData() {
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
			console.log(expensesResponse);
			console.log("fetched");
			setYearlyTotal(expensesResponse.total);
			setMonthlyTotals(expensesResponse.expenses);
			setIsDataFetching(false);
		} else {
			console.log(expensesResponse);
		}
	}

	useEffect(async () => {
		console.log("Fetching from: " + yearUrl);
		await fetchData();
	}, []);

	useEffect(async () => {
		setSelectedYear(selectedDate.getFullYear());
	}, [selectedDate]);

	useEffect(async () => {
		await fetchData();
	}, [selectedYear]);

	const CustomYearInput = forwardRef(({ value, onClick }, ref) => (
		<button css={customYearInputCSS} onClick={onClick} ref={ref}>
			{value}
		</button>
	));

	const monhtlyOverviews = monhtlyTotals.map((monthlyExpense, index) => (
		<div key={index}>
			<p
				css={css`
					font-size: 0.9rem;
				`}
			>
				{monthNames[index]}
			</p>
			<MonthlyExpense
				onClick={() => navigate(`/monthly?year=${selectedYear}&month=${index}`)}
			>
				{monthlyExpense.total} kn
			</MonthlyExpense>
		</div>
	));

	return (
		<>
			<MainContainer>
				<h1>Yearly expenses</h1>
				<DatePicker
					selected={selectedDate}
					onChange={(date) => setSelectedDate(date)}
					showYearPicker
					dateFormat="yyyy"
					customInput={<CustomYearInput />}
				/>
				{isDataFetching ? (
					<LoadingAnimation />
				) : (
					<ExpensesLayout>
						<TotalExpense
							css={css`
								grid-column: 1 / span 2;
							`}
							value={yearlyTotal}
						/>
						{monhtlyOverviews}
					</ExpensesLayout>
				)}
			</MainContainer>
		</>
	);
};

const customYearInputCSS = css`
	padding: 5px 15px;
	border-radius: 100px;
	font-size: 1.4rem;
	font-weight: 900;
	width: fit-content;
	background: var(--col-primary);
	margin: 10px 0;
	box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
`;

const ExpensesLayout = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-row-gap: 40px;
	grid-column-gap: 40px;
`;

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

export default YearlyOverview;

function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}
