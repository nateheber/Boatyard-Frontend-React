import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 20px;
  border: 1px solid #dfdfdf;
  position: relative;
  width: 100%;
  box-sizing: border-box;
`;

const CloseButton = styled.span`
  top: 10px;
  right: 10px;
  position: absolute;
  color: #d3d3d3;
  font-size: 12px;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
`;

export const BannerImagePreview = ({ image, onClick }) => (
  <Wrapper>
    {image && <CloseButton onClick={onClick}>X</CloseButton>}
    <Image src={image} />
  </Wrapper>
);
