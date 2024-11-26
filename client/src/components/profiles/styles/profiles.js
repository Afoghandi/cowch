import styled from 'styled-components/macro';

export const Container = styled.div `
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: auto;
	max-width: 80%;
`;

export const Title = styled.h1 `
	width: 100%;
	color: #fff;
	font-size: 48px;
	text-align: center;
	font-weight: 500;
`;

export const List = styled.ul `
	padding: 0;
	margin: 0;
	display: flex;
	flex-direction: row;
`;

export const Name = styled.p `
	color: #808080;
	text-overflow: ellipsis;
	font-size: 16px;
	&:hover {
		font-weight: bold;
		color: #e5e5e5;
	}
`;


export const Picture = styled.img `
	width: 100%;
	max-width: 150px;
	height: auto;
	border: 3px solid black;
	cursor: pointer;
	  z-index: 1;
	 position: relative; 
`;

export const Item = styled.li `
	max-height: 200px;
	max-width: 200px;
	list-style-type: none;
	text-align: center;
	margin-right: 30px;
	position: relative; 
	&:hover > ${Picture} {
		border: 3px solid white;
	}
	&:hover ${Name} {
		font-weight: bold;
		color: white;
	}
	&:last-of-type {
		margin-right: 0;
	}
`;

export const DeleteButton = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    z-index: 2;

    &:hover {
        background-color: darkred;
    }
`;
