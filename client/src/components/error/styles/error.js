import styled from 'styled-components/macro';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f8d7da;
  color: #721c24;
  padding: 20px;
`;

export const Message = styled.p`
  font-size: 1.2em;
  margin-bottom: 20px;
`;

export const RetryButton = styled.button`
  background-color: #f5c6cb;
  color: #721c24;
  border: none;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #f1b0b7;
  }
`;