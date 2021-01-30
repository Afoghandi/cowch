import React from 'react';

import { Container } from './styles/alert';

export default function Alert({ children, ...restprops }) {
	return <Container {...restprops}>{children} </Container>;
}
