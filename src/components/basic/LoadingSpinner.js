import React from 'react';
import styled from 'styled-components';
import { ClipLoader } from 'react-spinners';

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;
const SpinnerOverlay = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default class LoadingSpinner extends React.Component {
  render() {
    const { backgroundColor, opacity, color, size, loading } = this.props;
    return (
      <SpinnerWrapper>
        <SpinnerOverlay 
          style={{
            backgroundColor: backgroundColor || '#000',
            opacity: typeof(opacity) === 'undefined' ? 0.2 : opacity,
          }}
        />
        <ClipLoader
          sizeUnit={"px"}
          size={size || 50}
          color={color || '#094359'}
          loading={loading}
        />
      </SpinnerWrapper>
    );
  }
}
