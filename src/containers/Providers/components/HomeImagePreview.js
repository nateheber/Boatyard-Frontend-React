import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 20px 30px;
  box-sizing: border-box;
  border: 1px solid #dfdfdf;
  position: relative;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
`;

const TextWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 50%;
  display: flex;
  color: #fefefe;
  padding: 0 56px;
  font-size: 3.2em;
  position: absolute;
  line-height: 180px;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.4);
`;

export const HomeImagePreview = ({ title, image }) => (
  <Wrapper>
    <Image src={image} />
    <TextWrapper>{title}</TextWrapper>
  </Wrapper>
);
