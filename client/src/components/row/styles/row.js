import styled from 'styled-components/macro';

export const Container = styled.div `
	margin-left: 20px;
	color: #fff;
`;

export const RowPosters = styled.div `
	display: flex;
	overflow-y: hidden;
	overflow-x: scroll;
	padding: 20px;
	-webkit-scrollbar {
		display: none;
	}
`;

export const Image = styled.img `
	width: 100%;
	max-height: ${(props) => (props.isLargeCard ? '400px' : '350px')};
	cursor: pointer;

	margin-right: 10px;
	transition: transform 450ms;
	&:hover {
		transform: scale(1.08);
	}
`;