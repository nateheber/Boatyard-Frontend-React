import styled from 'styled-components';

export const InputLabel = styled.div`
  display: flex;
  flex: 1;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  color: #333;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  &.primary,
  &.secondary {
    flex-direction: column;
    align-items: flex-start;
  }
  &.primary > ${InputLabel} {
    font-weight: 400;
    margin-bottom: 5px;
  }
  &.secondary > ${InputLabel} {
    color: #004258;
    font-weight: 700;
    margin-bottom: 15px;
    font-family: Montserrat, sans-serif;
  }
  margin: 0px 10px;
  &:first-child {
    margin-left: 0px;
  }
  &:last-child {
    margin-right: 0px;
  }
`;

export const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
