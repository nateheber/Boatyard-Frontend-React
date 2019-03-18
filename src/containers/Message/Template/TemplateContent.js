import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get, isEmpty, hasIn } from 'lodash';
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

class TemplateContent extends React.Component {
  getTemplateInfo = () => {
    const { selected, globalTemplates, localTemplates } = this.props;
    if (hasIn(localTemplates, selected)) {
      return get(localTemplates, selected);
    }
    return get(globalTemplates, selected);
  }
  render() {
    const { selected, onCancel, onSave, onBack } = this.props;
    const templateInfo = this.getTemplateInfo();
    console.log(templateInfo);
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

const mapStateToProps = (state) => ({
  globalTemplates: state.messageTemplate.globalTemplates,
  localTemplates: state.messageTemplate.localTemplates,
});

export default connect(mapStateToProps)(TemplateContent);