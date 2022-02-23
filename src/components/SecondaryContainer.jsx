/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const SecondaryContainer = ({ children }) => {
	return <Container>{children}</Container>;
};

SecondaryContainer.propTypes = {
	children: PropTypes.node,
};

const Container = styled.div`
	position: sticky;
	right: 0;
	top: 60px;
	width: 100%;
	padding: 40px 40px 80px 40px;
	margin-bottom: 40px;
	background: linear-gradient(
		to right bottom,
		rgba(255, 255, 255, 0.5) 0%,
		rgba(255, 255, 255, 0.05) 100%
	);
	backdrop-filter: blur(10px);
	border-radius: 20px;
`;

export default SecondaryContainer;
