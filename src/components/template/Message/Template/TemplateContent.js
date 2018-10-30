import React from 'react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import changeCase from 'change-case';

import { InboxContentHeader } from '../../../compound/MessageHeader';
import { TemplateEditor } from '../../../compound/MessageComponents';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

export default class QRContent extends React.Component {
  render() {
    const { selected, onCancel, onSave } = this.props;
    return isEmpty(selected) ? (
      false
    ) : (
      <Wrapper>
        <InboxContentHeader
          name={`Edit ${changeCase.ucFirst(selected)} Reply`}
        />
        <TemplateEditor
          selected={selected}
          onCancel={onCancel}
          onSave={onSave}
        />
      </Wrapper>
    );
  }
}
