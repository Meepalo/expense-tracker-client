/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import styled from "@emotion/styled";

const TotalExpense = ({ value, className }) => {
	return (
		<div className={className} css={containerCSS}>
			<p css={titleCSS}>Total</p>
			<p css={valueCSS}>{value} kn</p>
		</div>
	);
};

const containerCSS = css`
	margin: 40px 0;
`;

const titleCSS = css`
	transform: translateX(10px);
	font-weight: 900;
	margin-bottom: 10px;
`;

const valueCSS = css`
	padding: 10px;
	width: 100%;
	text-align: center;
	background: var(--col-primary);
	border-radius: 100px;
	font-size: 1.4rem;
	font-weight: 800;
	box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.1);
`;

export default TotalExpense;
