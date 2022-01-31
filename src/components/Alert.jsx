/** @jsxImportSource @emotion/react */
import { jsx, css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";

import { MdCheckCircleOutline } from "react-icons/md";

const Alert = ({ visible, message, onShow, onTimeout }) => {
	const [showing, setShowing] = useState(false);
	const [showTimeout, setShowTimeout] = useState(null);
	const [animatingAppear, setAnimatingAppear] = useState(false);
	const [animatingDisappear, setAnimatingDisappear] = useState(false);

	const duration = 5000;

	useEffect(() => {
		console.log("Alert use effect (VISIBLE) called " + Date.now());
		if (visible) {
			setShowing(true);
			clearTimeout(showTimeout);
			let timeout = setTimeout(() => {
				onTimeout();
				setAnimatingDisappear(true);
			}, duration);
			setShowTimeout(timeout);
			onShow();
		}
	}, [visible]);

	useEffect(() => {
		if (showing) {
			setAnimatingAppear(true);
		}
	}, [showing]);

	return (
		showing && (
			<Container
				css={css`
					animation-name: ${animatingDisappear
						? disappearAnimation
						: appearAnimation};
				`}
				onAnimationEnd={() => {
					if (animatingAppear) {
						setAnimatingAppear(false);
					}
					if (animatingDisappear) {
						setShowing(false);
						setAnimatingDisappear(false);
					}
				}}
			>
				<MdCheckCircleOutline size={28} />
				<p>{message}</p>
			</Container>
		)
	);
};

const appearAnimation = keyframes`
	from {
		opacity: 0;
    bottom: 0;
	}
	to {
		opacity: 1;
    bottom: 32px;
	}
`;

const disappearAnimation = keyframes`
  from {
		opacity: 1;
    bottom: 32px;
  }
  to {
		opacity: 0;
    bottom: 0;
	}
`;

const Container = styled.div`
	position: fixed;
	left: 10px;
	right: 10px;
	padding: 12px 16px;
	bottom: 32px;
	display: flex;
	align-items: center;
	flex-wrap: nowrap;
	column-gap: 16px;

	background-color: var(--col-accent-dark);
	font-size: 1rem;
	box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
	border-radius: 0.4em;
	opacity: 0;

	animation-duration: 0.2s;
	animation-fill-mode: forwards;

	* {
		min-width: 28px;
		text-align: center;
		color: white;
	}
`;

export default Alert;
