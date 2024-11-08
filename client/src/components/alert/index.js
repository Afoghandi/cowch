import React from 'react';

import { Container, CloseButton } from './styles/alert';

export default function Alert({ children, onClose, ...restprops }) {
	return <Container {...restprops}>{children} 
	<CloseButton onClick={onClose} aria-label="Close alert">x</CloseButton>
	</Container>;
}
