/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import React from "react";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";

const LoadingAnimation = () => {
	return (
		<UseAnimations
			animation={loading}
			size={100}
			css={loadingStyle}
			strokeColor="#555"
		/>
	);
};

const loadingStyle = css`
	margin: 40px auto;
`;

export default LoadingAnimation;
