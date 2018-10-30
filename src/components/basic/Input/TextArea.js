import styled from 'styled-components';

export const TextArea = styled.textarea`
  background: #fff;
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #dfdfdf;
  min-height: 100px;
  width: 100%;
  border-radius: 5px !important;
  outline: none;
  box-sizing: border-box;
  resize: none;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  &:disabled {
    background: #f1f1f1;
  }
`;
