import styled from 'styled-components';

export const Input = styled.input`
  background: #fff;
  padding: 0 15px;
  margin-bottom: 15px;
  border: 1px solid #dfdfdf;
  height: 35px;
  width: 100%;
  border-radius: 5px !important;
  outline: none;
  box-sizing: border-box;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  &:disabled {
    background: #f1f1f1;
  }
`;
