import styled from 'styled-components';

export const HollowButton = styled.button`
  min-width: 120px;
  position: relative;
  border: 1px solid #a9b5bb;
  border-image: initial;
  border-radius: 6px;
  cursor: pointer;
  color: #333;
  font-size: 12px;
  font-family: Montserrat, sans-serif;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  display: inline-block;
  height: 30px;
  margin: 5px;
  padding: 5px 15px;
  outline: none;
  display: inline-block;
  &:disabled {
    background: #9e9e9e;
    border: 1px solid #9e9e9e !important;
    color: #07384b;
  }
  &.big {
    height: 48px;
    border-radius: 6px;
  }
  &.thin-font {
    font-weight: 500;
  }
`;
