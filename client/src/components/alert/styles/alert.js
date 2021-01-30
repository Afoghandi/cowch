import styled from 'styled-components/macro';

export const Container = styled.div `
	display: flex;
	flex-direction: column;
	background: ${({ alertType }) =>
		alertType !== 'danger' ? '#e50914' : '#4CAF50'};
	border-radius: 4px;
	font-size: 14px;
	margin: 0 0 16px;
	color: white;
	padding: 15px 20px;
`;