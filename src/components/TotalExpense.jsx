/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import PropTypes from "prop-types";

const TotalExpense = ({ value, className }) => {
	return (
		<div className={className} css={containerCSS}>
			<p css={titleCSS}>Total</p>
			<p css={valueCSS}>{value.toFixed(2)} kn</p>
		</div>
	);
};

TotalExpense.propTypes = {
	value: PropTypes.number,
	className: PropTypes.string,
};

const containerCSS = css`
	margin: 40px 0;
`;

const titleCSS = css`
	font-weight: 900;
	margin-bottom: 10px;
	font-size: 0.9rem;
`;

const valueCSS = css`
	padding: 10px;
	width: 100%;
	text-align: center;
	border-radius: 0.2em;
	font-size: 1.1rem;
	font-weight: 800;
	border: 3px solid var(--col-accent);
`;

export default TotalExpense;
