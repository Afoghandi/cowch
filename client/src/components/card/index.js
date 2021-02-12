import React, { createContext, useState, useContext } from 'react';
import {
	Container,
	Group,
	Title,
	SubTitle,
	Text,
	FeatureText,
	Feature,
	FeatureClose,
	FeatureTitle,
	Meta,
	Entities,
	Item,
	Image,
	Content,
} from './styles/card';

export const FeatureContext = createContext();

export default function Card({ children, ...restProps }) {
	const [showFeature, setShowFeature] = useState(false);
	const [itemFeature, setItemFeature] = useState({});

	return (
		<FeatureContext.Provider
			value={{ showFeature, setShowFeature, itemFeature, setItemFeature }}
		>
			{' '}
			<Container {...restProps}> {children} </Container>{' '}
		</FeatureContext.Provider>
	);
}

Card.Group = function CardGroup({ children, ...restProps }) {
	return <Group {...restProps}>{children} </Group>;
};

Card.Title = function CardTitle({ children, ...restProps }) {
	return <Title {...restProps}>{children} </Title>;
};

Card.SubTitle = function CardSubTitle({ children, ...restProps }) {
	return <SubTitle {...restProps}>{children} </SubTitle>;
};
Card.Text = function CardText({ children, ...restProps }) {
	return <Text {...restProps}>{children} </Text>;
};
Card.Entities = function CardEntities({ children, ...restProps }) {
	return <Entities {...restProps}>{children} </Entities>;
};

Card.Meta = function CardMeta({ children, ...restProps }) {
	return <Meta {...restProps}> {children} </Meta>;
};

Card.Feature = function CardFeature({ children, category, ...restProps }) {
	const { showFeature, itemFeature, setShowFeature } = useContext(
		FeatureContext
	);
	return showFeature ? (
		<Feature {...restProps}>
			<Content>
				<FeatureTitle>{children} </FeatureTitle>
				<FeatureText>{children} </FeatureText>
				<FeatureClose onClick={() => setShowFeature(false)}>
					{' '}
					<img src='/images/icons/close.png' alt='Close' />{' '}
				</FeatureClose>
				<Group margin='30px 0' flexDirection='row' alignItems='center'>
					<FeatureText fontWeight='bold'>{children} </FeatureText>
				</Group>
				{children}
			</Content>
		</Feature>
	) : null;
};

Card.Item = function CardItem({ item, children, ...restProps }) {
	const { setShowFeature, setItemFeature } = useContext(FeatureContext);
	return (
		<Item
			{...restProps}
			onClick={() => {
				setItemFeature(item);
				setShowFeature(true);
			}}
		>
			{children}{' '}
		</Item>
	);
};

Card.Image = function CardImage({ ...restProps }) {
	return <Image {...restProps} />;
};
