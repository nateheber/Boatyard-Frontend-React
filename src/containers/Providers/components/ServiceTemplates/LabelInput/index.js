import styled from 'styled-components';

const LabelInput = styled.input`
  background: transparent;
  font-size: 7.2px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #094359;
  resize: none;
  border: none;
  outline: none;
  &:focus {
    background-color: rgba(255, 255, 255, 0.5);
  }
  text-transform: uppercase;
  color: white;
  width: 100%;
  &.button {
    font-size: 12px;
    text-align: center;
  }
`;

export default LabelInput;