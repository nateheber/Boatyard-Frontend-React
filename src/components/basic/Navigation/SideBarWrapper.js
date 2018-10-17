import styled from 'styled-components';

export const SideBarWrapper = styled.div`
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: #01556d;
  height: calc(100vh - 68px) !important;
  display: block;
  padding-bottom: 68px;
  box-sizing: border-box;
  width: 195px !important;
  @media (max-width: 991px) {
    display: block !important;
    width: 100px !important;
  }
  transition: all 0.3s ease;
  transition-property: all;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-delay: 0s;
`;
