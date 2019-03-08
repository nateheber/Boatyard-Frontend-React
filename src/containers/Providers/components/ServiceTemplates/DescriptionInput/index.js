import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';

const DescriptionInput = styled(TextareaAutosize)`
  box-sizing: border-box;
  width: 223px;
  padding: 10px 15px;
  padding-top: 0px;
  height: auto;
  background: transparent;
  font-size: 8.4px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #094359;
  resize: vertical;
  border: none;
  outline: none;
  &:focus {
    background-color: rgba(255, 255, 255, 0.5);
  }
  &.list {
    font-size: 9.6px;
    text-transform: uppercase;
  }
`;

export default DescriptionInput;