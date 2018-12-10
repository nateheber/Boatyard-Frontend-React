import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid #dfdfdf;
  width: 100%;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  max-height: 749px;
  padding: 20px;
  box-sizing: border-box;
`;

const Item = styled.img`
  box-sizing: border-box;
  width: 50%;
  height: 140px;
  margin: 10px;
  cursor: pointer;
  object-fit: center;
`;

export const ImageSelector = ({ images, onSelect }) => (
  <Wrapper>
    <React.Fragment>
      {images.map((image, idx) => (
        <Item src={image} onClick={() => onSelect(image)} key={`img_${idx}`} />
      ))}
    </React.Fragment>
  </Wrapper>
);
