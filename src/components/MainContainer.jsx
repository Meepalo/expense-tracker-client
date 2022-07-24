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
	padding: 20px 20px 80px;
	margin-bottom: 40px;
	background: #fff;
	border-radius: 0.5em;
	box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.15);
`;

export default MainContainer;
