import React, { useState, useContext, createContext } from 'react';
import {
	Container,
	Inner,
	Title,
	Item,
	Header,
	Body,
} from '../accordion/styles/accordion';

const ToggleContext = createContext();

export default function Accordion({ children, ...restProps }) {
	return (
		<Container {...restProps}>
			<Inner>{children} </Inner>
		</Container>
	);
}

Accordion.Title = function AccordionTitle({ children, ...restProps }) {
	return <Title {...restProps}>{children} </Title>;
};

Accordion.Item = function AccordionItem({ children, ...restProps }) {
	const [toggleShow, setToggleShow] = useState(false);
	return (
		<ToggleContext.Provider value={{ toggleShow, setToggleShow }}>
			<Item {...restProps}>{children}</Item>
		</ToggleContext.Provider>
	);
};

Accordion.Header = function AccordionHeader({ children, ...restProps }) {
	const { toggleShow, setToggleShow } = useContext(ToggleContext);

	return (
		<Header
			onClick={() => setToggleShow((toggleShow) => !toggleShow)}
			{...restProps}
		>
			{children}

			{toggleShow ? (
				<img src={`${process.env.PUBLIC_URL}/images/icons/close-slim.png`} alt="close" />

			) : (
			<img src={`${process.env.PUBLIC_URL}/images/icons/add.png`} alt='open' />
			)}
		</Header>
	);
};

Accordion.Body = function AccordionBody({ children, ...restProps }) {
	const { toggleShow } = useContext(ToggleContext);

	return toggleShow ? <Body {...restProps}>{children} </Body> : null;
};
