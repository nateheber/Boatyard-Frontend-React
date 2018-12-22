import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-flexbox-grid';

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

const Item = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 140px;
  margin: 10px;
  cursor: pointer;
  object-fit: center;
  background-image: url(${props => props.bgImage});
  background-repeat: none;
  background-position: center center;
  background-resize: cover;
`;

export const ImageSelector = ({ images, onSelect }) => (
  <Wrapper>
    <Row style={{ width: '100%' }}>
      <React.Fragment>
        {images.map((image, idx) => (
          <Col xs={6} key={`img_${idx}`}>
            <Item bgImage={image} onClick={() => onSelect(image)} />
          </Col>
        ))}
      </React.Fragment>
    </Row>
  </Wrapper>
);
