import React from 'react';
import {Container, Message, RetryButton}from './styles/error'

export default function Error({ message = 'Something went wrong.', onRetry, ...restProps }) {
    return (
      <Container {...restProps}>
        <Message>{message}</Message>
        <RetryButton onClick={onRetry}>Retry</RetryButton>
      </Container>
    );
  }