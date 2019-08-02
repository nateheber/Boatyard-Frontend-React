import styled from 'styled-components';
import TextareaAutosize from 'react-autosize-textarea';

const DescriptionInput = styled(TextareaAutosize)`
  position: relative;
  box-sizing: border-box;
  width: 221px;
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
  &.required {
    padding-left: 20px;
  }
  &.required::before {
    content: '*';
    position: absolute;
    display: inline-block;
    width: 10px;
    height: 10px;
    left: 0px;
    top: 0px;
    color: #094359;
    font-size: 8.4px;
  }
  &.title {
    font-family: Helvetica;
    font-size: 20px;
    color: #04416A;
    text-align: center;
    border: none;
    margin-bottom: 30px;
    width: 180px;
  }
`;

export default DescriptionInput;