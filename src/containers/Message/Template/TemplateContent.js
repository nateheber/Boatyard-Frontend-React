import React from 'react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import changeCase from 'change-case';

import { InboxContentHeader } from '../components/MessageHeader';
import { TemplateEditor } from '../components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
`;

export default class TemplateContent extends React.Component {
  render() {
    const { selected, onCancel, onSave, onBack } = this.props;
    return isEmpty(selected) ? (
      false
    ) : (
      <Wrapper>
        <InboxContentHeader
          name={`Edit ${changeCase.ucFirst(selected)} Reply`}
          onBack={onBack}
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
