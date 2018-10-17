import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: space-between;
  background-color: #fafafa;
  padding: 15px;
  width: 100%;
  min-height: 65px;
  color: #004258;
  text-transform: uppercase;
  position: relative;
`;

const Title = styled.h5`
  text-transform: uppercase !important;
  font-size: 15px !important;
  margin: 0 !important;
  font-weight: bold;
  display: inline-block;
  font-family: 'Montserrat', sans-serif !important;
  color: #004258;
`;

const Amount = styled.h4`
  text-transform: uppercase !important;
  font-size: 22px !important;
  margin: 0 !important;
  font-weight: bold;
  display: inline-block;
  font-family: 'Montserrat', sans-serif !important;
  color: #004258;
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.span`
  background-color: ${props => props.color};
  display: flex;
  width: 45px;
  height: 45px;
  min-width: 45px;
  align-items: center;
  justify-content: center;
  border-radius: 50% !important;
  margin-left: auto;
`;

const Image = styled.img`
  width: 20px;
`;

export const SubSectionFrame = ({ type, amount, title, icon, iconBg }) => (
  <Wrapper>
    {type === 'revenue' ? (
      <TitleSection>
        <Amount>${amount.toFixed(2)}</Amount>
        <Title>{title}</Title>
      </TitleSection>
    ) : (
      <Title>{title}</Title>
    )}
    <ImageWrapper color={iconBg}>
      <Image src={icon} alt="icon_indicator" />
    </ImageWrapper>
  </Wrapper>
);
