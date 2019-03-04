import styled from 'styled-components';

const DescriptionInput = styled.textarea`
  width: 223px;
  padding: 10px;
  padding-top: 0px;
  min-height: 60px;
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
`;

export default DescriptionInput;