import React from 'react';
import {Overlay, Spinner}from './styles/loading'

const LoadingSpinner = () => <div className="loading-spinner">Loading...</div>;

export default function Loading({ ...restProps }) {
    return (
      <Overlay {...restProps}>
        <Spinner />
      </Overlay>
    );
  }
