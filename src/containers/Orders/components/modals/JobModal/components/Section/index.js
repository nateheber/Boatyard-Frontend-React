import styled from 'styled-components';
import { Col } from 'react-flexbox-grid';

export const Section = styled.div`
margin-bottom: 30px;
`;

export const SectionHeader = styled.div`
background: #F5F5F5;
height: 80px;
padding: 0 25px;
display: flex;
align-items: center;
justify-content: space-between;
`;

export const SectionContent = styled.div`
  background: #FFFFFF;
  border: 1px solid #A9B5BB;
  padding: 25px;
  &.hidden {
    display: none;
  }
  .title {
    font-family: Helvetica;
    font-size: 15px;
    color: #003247;
    text-align: left;
    line-height: 23px;
    margin-bottom: 10px;
    text-transform: uppercase;
  }
`;

export const Column = styled(Col)`
  align-items: center;
  display: flex;
`;

export const HeaderTitle = styled.div`
  font-family: Montserrat;
  font-size: 18px;
  color: #003247;
  text-align: left;
  font-weight: bold;
`;

export const Image = styled.img`
  width: 11px;
  &.arrow {
    width: 5px;
  }
  &.print {
    width: 18px;
  }
`;

export const DeleteButton = styled.button`
  border: none;
  padding: 0;
  background: none;
  height: 20px;
  width: 20px;
  margin-left: 6px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  .close-icon {
    fill: #003247;
    height: 20px;
    width: 20px;
  }
`;
