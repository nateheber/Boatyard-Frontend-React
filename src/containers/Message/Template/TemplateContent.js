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
  onSave = (templateInfo) => {
    const { onSave, selected } = this.props;
    onSave({ triggerKey: selected, templateInfo });
  }

  getTemplateInfo = () => {
    const { selected, globalTemplates, localTemplates, privilege } = this.props;
    if (hasIn(localTemplates, selected) && privilege !== 'admin') {
      return get(localTemplates, `${selected}.attributes.emailOptions`);
    }
    return get(globalTemplates, `${selected}.attributes.emailOptions`);
  }

  render() {
    const { selected, onCancel, onBack } = this.props;
    if (isEmpty(selected)) {
      return false;
    }
    const templateInfo = this.getTemplateInfo();
    return (
      <Wrapper>
        <InboxContentHeader
          name={`Edit ${changeCase.ucFirst(selected)} Reply`}
          onBack={onBack}
        />
        <TemplateEditor
          defaultTemplateInfo={templateInfo}
          selected={selected}
          onCancel={onCancel}
          onSave={this.onSave}
          key={selected}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  globalTemplates: state.messageTemplate.globalTemplates,
  localTemplates: state.messageTemplate.localTemplates,
  privilege: state.auth.privilege,
});

export default connect(mapStateToProps)(TemplateContent);