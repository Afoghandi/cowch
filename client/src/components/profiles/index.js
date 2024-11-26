import React from 'react';
import { Container, Title, List, Item, Picture, Name, DeleteButton } from './styles/profiles';

export default function Profiles({ children, ...restProps }) {
	return <Container {...restProps}> {children} </Container>;
}

Profiles.Title = function ProfilesTitle({ children, ...restProps }) {
	return <Title {...restProps}> {children} </Title>;
};

Profiles.List = function ProfilesList({ children, ...restProps }) {
	return <List {...restProps}> {children} </List>;
};

Profiles.User = function ProfilesUser({ children,onDelete, ...restProps }) {
	return <Item {...restProps}> <DeleteButton onClick={(e)=>

		{
			e.stopPropagation();
			console.log("Delete button clicked for profile ID:");
			onDelete();
		}
	} >X</DeleteButton> {children} </Item>;
};

Profiles.Picture = function ProfilesPicture({ src, ...restProps }) {
	return (
		<Picture
			{...restProps}
			src={src ? ` ${src} ` : '/images/misc/loading.gif'}
		/>
	);
};

Profiles.Name = function ProfilesName({ children, ...restProps }) {
	return <Name {...restProps}> {children} </Name>;
};
