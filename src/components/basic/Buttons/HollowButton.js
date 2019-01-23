import styled from 'styled-components';

export const HollowButton = styled.button`
  min-width: 120px;
  position: relative;
  border-width: 1px;
  border-style: solid;
  border-color: rgb(169, 181, 187);
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
  height: 33px !important;
  margin: 5px;
  padding: 5px 15px;
  outline: none;
  display: inline-block;
  &:disabled {
    background: #9e9e9e;
    border: 1.5px solid #9e9e9e !important;
  }
`;
