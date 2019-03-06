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
  text-transform: uppercase;
  margin-bottom: 5px;
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
    margin-bottom: 5px;
    font-size: 12px;
    font-family: Montserrat, sans-serif;
  }
  margin: 0px 10px;
  &:first-child {
    margin-left: 0px;
  }
  &:last-child {
    margin-right: 0px;
  }
  &.size-big {
    margin-bottom: 22px;
  }
  &.size-big > ${InputLabel} {
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 500;
    color: #003247;
    margin-bottom: 21px;
    text-transform: none;
  }
`;

export const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;
