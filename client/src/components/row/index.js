import React from 'react';
import { Container, RowPosters, Image } from './styles/row';

export default function Row({ children, ...restProps }) {
	return <Container {...restProps}>{children} </Container>;
}

Row.RowPosters = function PostersGroup({ children, ...restProps }) {
	return <RowPosters {...restProps}>{children} </RowPosters>;
};

Row.Image = function RowImage({ ...restProps }) {
	return <Image {...restProps} />;
};
