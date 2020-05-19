import styled from 'styled-components';

export const BlueButton = styled.button`
  margin: 0;
  padding: 5px 15px;
  position: relative;
  height: 30px;
  color: white !important;
  background-color: #0767A7;
  border: 1px solid #0767A7;
  min-width: 130px;
  cursor: pointer;
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  text-align: center;
  border-radius: 12px !important;
  text-transform: uppercase;
  outline: none;
  display: inline-block;
  &:disabled {
    opacity: 0.7;
  }
  &.secondary {
    height: 33px;
    min-width: 100px;
  }
  @media (min-width: 991px) {
    &.desktop {
      display: block;
    }
    &.tablet {
      display: none;
    }
    &.mobile {
      display: none;
    }
  }
  @media (max-width: 991px) {
    &.desktop {
      display: none;
    }
    &.tablet.mobile {
      display: block;
    }
    &.mobile {
      display: none;
    }
  }
  @media (max-width: 768px) {
    &.desktop {
      display: none;
    }
    &.tablet {
      display: none;
    }
    &.mobile {
      display: block;
    }
  }
  &.mobile-add {
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px !important;
    vertical-align: middle;
    font-size: 25px !important;
    min-width: 0px !important;
  }
  &.big {
    height: 48px;
    border-radius: 6px;
  }
  &.thin-font {
    font-weight: 500;
  }
`;
