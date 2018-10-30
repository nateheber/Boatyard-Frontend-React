import React from 'react';
import styled from 'styled-components';

import { MessageEmptyState } from '../../../basic/Message';
import { QRGenerator } from '../../../compound/MessageComponents';
import { InboxContentHeader } from '../../../compound/MessageHeader';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

export default class QRContent extends React.Component {
  render() {
    const { empty, createNew, showItem, onCancel, onSave } = this.props;
    return createNew ? (
      <Wrapper>
        <InboxContentHeader name="New Quick Reply" />
        <QRGenerator onCancel={onCancel} onSave={onSave} />
      </Wrapper>
    ) : empty ? (
      <Wrapper>
        <MessageEmptyState text="No Quick Reply Selected" />
      </Wrapper>
    ) : (
      <Wrapper>
        <InboxContentHeader name="Edit Quick Reply" />
        <QRGenerator showItem={showItem} onCancel={onCancel} onSave={onSave} />
      </Wrapper>
    );
  }
}
