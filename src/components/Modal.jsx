/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { GrFormClose } from "react-icons/gr";
import { SecondaryButton, SubmitButton } from "./styled/CustomButtons";

import PropTypes from "prop-types";

Modal.propTypes = {
	children: PropTypes.element,
	title: PropTypes.string,
	visible: PropTypes.bool,
	onDismiss: PropTypes.func,
};

const Modal = ({ children, title, visible, onDismiss }) => {
	const [animatingAppear, setAnimatingAppear] = useState(false);

	useEffect(() => {
		if (visible) setAnimatingAppear(true);
	}, [visible]);

	return (
		<Overlay
			css={css`
				animation-name: ${animatingAppear ? appearAnimation : ""};
			`}
		>
			<Container>
				<CloseButton onClick={() => onDismiss()} />

				<h1>{title}</h1>

				<ModalContent>{children}</ModalContent>

				<ModalActions>
					<SecondaryButton onClick={() => onDismiss()}>Cancel</SecondaryButton>
					<SubmitButton value="Add expense" />
				</ModalActions>
			</Container>
		</Overlay>
	);
};

const Overlay = styled.div`
	position: fixed;
	display: grid;
	place-items: center;
	background: rgba(0, 0, 0, 0.4);
	backdrop-filter: blur(20px);
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	z-index: var(--popup-z-index);
	animation-duration: 0.3s;
	animation-timing-function: ease;
`;

const Container = styled.div`
	position: absolute;
	padding: 40px;
	border-radius: 30px;
	background: var(--col-primary);

	@media (max-width: 420px) {
		border-radius: 15px;
	}
`;

const ModalContent = styled.div`
	margin: 40px 0px 0 0;
	padding-right: 260px;
`;

const ModalActions = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	column-gap: 20px;
	margin-top: 60px;
`;

const CloseButton = styled(GrFormClose)`
	position: absolute;
	right: 20px;
	top: 20px;
	width: 24px;
	height: 24px;
	cursor: pointer;
`;

const appearAnimation = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

export default Modal;
