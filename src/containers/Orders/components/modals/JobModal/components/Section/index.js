import styled from 'styled-components';
import { Col } from 'react-flexbox-grid';

export const Section = styled.div`
margin-bottom: 30px;
`;

export const SectionHeader = styled.div`
background: #F5F5F5;
height: 80px;
padding: 0 25px;
display: flex;
align-items: center;
justify-content: space-between;
`;

export const SectionContent = styled.div`
  background: #FFFFFF;
  border: 1px solid #A9B5BB;
  padding: 25px;
  &.hidden {
    display: none;
  }
`;

export const Column = styled(Col)`
  align-items: center;
  display: flex;
`;
