/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled/macro";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";

const primaryButtonStyle = css`
	background: var(--col-accent);
	font-weight: 800;
	color: #fff;
	padding: 0.5em 1.5em;
	border-radius: 5px;
	cursor: pointer;
`;

export const PrimaryButton = styled.button`
	${primaryButtonStyle}
`;

export const SecondaryButton = styled(PrimaryButton)`
	background: var(--col-primary);
	color: var(--col-text);
`;

export const SubmitButton = ({ value }) => {
	return <input type="submit" value={value} css={primaryButtonStyle} />;
};

export const StyledLink = styled(Link)`
	text-decoration: none;
	font-weight: 900;
	display: flex;
	align-items: center;
`;
