/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { StyledLink } from "../styled/CustomButtons";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSearchParams, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { monthNames, getPreviousMonth, getNextMonth } from "../../utils/Utils";

const MonthlyOverviewHeader = () => {
	const [month, setMonth] = useState(null);
	const [year, setYear] = useState(null);

	const params = useSearchParams()[0];
	const location = useLocation();

	useEffect(() => {
		const newYear = params.get("year");
		const newMonth = params.get("month");
		setYear(newYear);
		setMonth(newMonth);
	}, [location]);

	const getPreviousMonthUrl = () => {
		let pMonth = parseInt(month) - 1;
		let pYear = parseInt(year);
		if (pMonth < 0) {
			pMonth = 11;
			pYear -= 1;
		}
		return `year=${pYear}&month=${pMonth}`;
	};

	const getNextMonthUrl = () => {
		let nMonth = parseInt(month) + 1;
		let nYear = parseInt(year);
		if (nMonth > 11) {
			nMonth = 0;
			nYear += 1;
		}
		return `year=${nYear}&month=${nMonth}`;
	};

	return (
		<>
			<HeaderNavigation>
				<StyledLink to="/">
					<IoIosArrowRoundBack size={32} />
					<span>Back to yearly expenses</span>
				</StyledLink>
				<div className="monthNavigation">
					<StyledLink to={`/monthly?${getPreviousMonthUrl()}`}>
						<IoIosArrowRoundBack size={32} />
						<span>{monthNames[getPreviousMonth(month)]}</span>
					</StyledLink>
					<StyledLink to={`/monthly?${getNextMonthUrl()}`}>
						<span>{monthNames[getNextMonth(month)]}</span>
						<IoIosArrowRoundBack
							size={32}
							css={css`
								transform: rotate(180deg);
							`}
						/>
					</StyledLink>
				</div>
			</HeaderNavigation>
			<h1>
				{monthNames[month]} {year} expenses
			</h1>
		</>
	);
};

MonthlyOverviewHeader.propTypes = {
	month: PropTypes.string,
};

const HeaderNavigation = styled.header`
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

	@media (max-width: 420px) {
		display: grid;
		grid-row-gap: 20px;
		grid-template-columns: 1fr;

		.monthNavigation {
			justify-content: space-between;
		}
	}
`;

export default MonthlyOverviewHeader;
