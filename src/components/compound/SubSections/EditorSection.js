import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 30px 20px;
  padding: 30px 15px;
  display: flex;
  flex-direction: column;
`;

const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-top: 20px;
  padding-top: 35px;
  border-top: 1px solid #dfdfdf;
`;

export const EditorSection = ({ content, actions }) => (
  <Wrapper>
    <FieldsContainer>{content}</FieldsContainer>
    <ActionsContainer>{actions}</ActionsContainer>
  </Wrapper>
);
