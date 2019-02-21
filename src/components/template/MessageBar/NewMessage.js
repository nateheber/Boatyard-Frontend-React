import React from 'react';
import styled from 'styled-components';

import { OrangeButton } from 'components/basic/Buttons';
import { ChatBox } from 'components/compound/Message/ChatBox';
import { BoatyardSelect } from 'components/basic/Dropdown';

const ChatHeader = styled.div`
  background-color: #07384b;
  border-bottom: 1px solid #aaa2aa;
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InputWrapper = styled.div`
  display: flex;
  padding: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InputLabel = styled.div`
  color: #E6E6E6;
  font-family: "Source Sans",sans-serif !important;
  font-size: 14px;
`;

const Select = styled(BoatyardSelect)`
  width: 220px;
`;

const HeaderTitle = styled.div`
  padding: 15px;
  font-size: 18px;
  font-family: 'Montserrat', sans-serif !important;
  color: #e6e6e6;
`;

export default class NewMessage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <ChatHeader>
          <HeaderTitle>New Messages</HeaderTitle>
          <OrangeButton onClick={this.props.onCancel}>Cancel</OrangeButton>
        </ChatHeader>
        <InputWrapper>
          <InputLabel>To:</InputLabel>
          <Select placeholder="Choose a recipient" />
        </InputWrapper>
        <ChatBox third noBorder />
      </React.Fragment>
    )
  }
}