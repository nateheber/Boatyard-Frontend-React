import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 60px 35px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
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

export const EditorSection = ({ content, actions, containerStype, contentStyle, actionsStyle }) => (
  <Wrapper style={containerStype}>
    <FieldsContainer style={contentStyle}>{content}</FieldsContainer>
    <ActionsContainer style={actionsStyle}>{actions}</ActionsContainer>
  </Wrapper>
);
