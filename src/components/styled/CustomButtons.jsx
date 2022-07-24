/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled/macro";
import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const primaryButtonStyle = css`
	background: var(--col-accent-dark);
	font-weight: 800;
	color: #fff;
	padding: 1em 1.5em;
	border-radius: 0.2em;
	cursor: pointer;
	text-transform: uppercase;
`;

export const PrimaryButton = styled.button`
	${primaryButtonStyle}
`;

export const SecondaryButton = styled(PrimaryButton)`
	background: transparent;
	color: var(--col-text);
	font-weight: 700;
`;

export const SubmitButton = ({ value }) => {
	return <input type="submit" value={value} css={primaryButtonStyle} />;
};

SubmitButton.propTypes = {
	value: PropTypes.string,
};

export const StyledLink = styled(Link)`
	text-decoration: none;
	font-weight: 900;
	display: flex;
	align-items: center;
`;
