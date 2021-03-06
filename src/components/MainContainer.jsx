/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const MainContainer = ({ children }) => {
	return <Main>{children}</Main>;
};

MainContainer.propTypes = {
	children: PropTypes.node,
};

const Main = styled.main`
	width: 50%;
	padding: 40px 40px 80px 40px;
	margin-bottom: 40px;
	background: linear-gradient(
		to right bottom,
		rgba(255, 255, 255, 0.7) 0%,
		rgba(255, 255, 255, 0.07) 100%
	);
	backdrop-filter: blur(20px);
	border-radius: 20px;

	:before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		border-radius: 20px;
		padding: 2px;
		background: linear-gradient(
			to right bottom,
			rgba(255, 255, 255, 0.4) 0%,
			rgba(255, 255, 255, 0) 100%
		);
		-webkit-mask: linear-gradient(#fff 0 0) content-box,
			linear-gradient(#fff 0 0);
		-webkit-mask-composite: destination-out;
		mask-composite: exclude;
		z-index: -1;
	}

	@media (max-width: 1240px) {
		width: 80%;
		margin: 0 auto;
	}

	@media (max-width: 780px) {
		width: 100%;
	}

	@media (max-width: 420px) {
		border-radius: 15px;
		padding: 40px 8px 80px 8px;
	}
`;

export default MainContainer;
