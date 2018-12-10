import React from 'react';
import styled from 'styled-components';

import { MessageEmptyState } from 'components/basic/Message';
import { QRGenerator } from 'components/compound/MessageComponents';
import { InboxContentHeader } from 'components/compound/MessageHeader';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

export default class QRContent extends React.Component {
  render() {
    const { empty, createNew, showItem, onCancel, onSave, onBack } = this.props;
    return createNew ? (
      <Wrapper>
        <InboxContentHeader name="New Quick Reply" onBack={onBack} />
        <QRGenerator onCancel={onCancel} onSave={onSave} />
      </Wrapper>
    ) : empty ? (
      <Wrapper>
        <MessageEmptyState text="No Quick Reply Selected" />
      </Wrapper>
    ) : (
      <Wrapper>
        <InboxContentHeader name="Edit Quick Reply" onBack={onBack} />
        <QRGenerator showItem={showItem} onCancel={onCancel} onSave={onSave} />
      </Wrapper>
    );
  }
}
