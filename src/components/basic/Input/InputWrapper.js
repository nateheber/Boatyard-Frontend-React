import styled from 'styled-components';

export const InputLabel = styled.div`
  display: flex;
  flex: 1;
  font-family: Montserrat;
  font-weight: 600;
  font-size: 14px;
  color: #003247;
  text-align: left;
  margin-bottom: 20px;
  text-transform: capitalize;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  text-transform: uppercase;
  margin-bottom: 5px;
  &.primary,
  &.secondary,
  &.third {
    flex-direction: column;
    align-items: flex-start;
  }
  &.primary > ${InputLabel} {
    font-weight: 400;
    margin-bottom: 5px;
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
  &.third > ${InputLabel} {
    margin: 20px 0px;
    color: #8f8f8f;
    font-weight: 400;
    font-size: 14px;
    font-family: "Open sans-serif", sans-serif;
    text-transform: none;
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
  .field-section {
    width: 100%;
  }
  &.upload {
    display: flex;
    flex-direction: row;
    .field-section {
      width: 50px;
    }
    .file-section {
      width: calc(100% - 50px);
      height: 72px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #FFFFFF;
      border: 1px solid #D8D8D8;
      border-radius: 6px;
      label {
        font-family: Helvetica;
        font-size: 14px;
        color: #D8D8D8;
        text-align: center;
        padding: 0 20px;
      }
    }
  }
`;

export const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;
