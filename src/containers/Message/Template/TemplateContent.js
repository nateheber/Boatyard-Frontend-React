import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { isEmpty, startCase } from 'lodash';

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
  handleSaveTemplate = (templateInfo) => {
    const { onSave } = this.props;
    if (onSave) {
      onSave(templateInfo);
    }
  };

  getTemplateInfo = () => {
    const { selected, globalTemplates, localTemplates, privilege } = this.props;
    let templates = globalTemplates;
    if (privilege === 'provider') {
      templates = localTemplates;
    }
    return templates.find(template => template.triggerKey === selected);
  };

  render() {
    const { selected, onCancel, onBack } = this.props;
    if (isEmpty(selected)) {
      return false;
    }
    const templateInfo = this.getTemplateInfo();
    return (
      <Wrapper>
        <InboxContentHeader
          name={`Edit <${startCase(selected)}> Template`}
          onBack={onBack}
        />
        <TemplateEditor
          defaultTemplateInfo={templateInfo}
          selected={selected}
          onCancel={onCancel}
          onSave={this.handleSaveTemplate}
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