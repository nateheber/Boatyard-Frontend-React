import styled from 'styled-components';

export const OrangeButton = styled.button`
  margin: 0;
  padding: 5px 15px;
  position: relative;
  height: 30px;
  color: white !important;
  background-color: #f7941e;
  border: 1.5px solid #f7941e;
  min-width: 130px;
  cursor: pointer;
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  text-align: center;
  border-radius: 6px !important;
  text-transform: uppercase;
  outline: none;
  display: inline-block;
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
`;
