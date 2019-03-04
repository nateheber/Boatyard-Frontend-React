import styled from 'styled-components';

const TitleInput = styled.input`
  background: transparent;
  font-family: DIN;
  font-size: 18px;
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
  color: #094359;
  width: 100%;
  padding: 3.2px;
  padding-bottom: 7.8px;
  margin-bottom: 9.8px;
  border-bottom: 2px solid #094359;
`;

export default TitleInput;