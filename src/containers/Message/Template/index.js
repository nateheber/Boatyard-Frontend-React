import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { GetGlobalTemplates, GetLocalTemplates, UpdateGlobalTemplate } from 'store/actions/messageTemplates';

import MessageBasic from '../MessageBasic';
import TemplateLeft from './TemplateLeft';
import TemplateContent from './TemplateContent';

class TemplateBox extends React.Component {
  state = {
    selected: '',
    showContent: false
  };

  goBack = () => {
    this.setState({
      selected: '',
      showContent: false,
    });
  }

  componentDidMount() {
    const { GetGlobalTemplates, GetLocalTemplates } = this.props;
    GetGlobalTemplates({ params: { 'per_page': 200 } });
    GetLocalTemplates({ params: { 'per_page': 200 } });
  }

  getGlobalTemplateId = (triggerKey) => {
    const { globalTemplates } = this.props;
    return get(globalTemplates, `${triggerKey}.id`);
  }

  getLocalTemplateId = (triggerKey) => {
    const { localTemplates } = this.props;
    return get(localTemplates, `${triggerKey}.id`);
  }

  onSave = ({ triggerKey, templateInfo }) => {
    const { privilege } = this.props;
    if (privilege === 'admin') {
      const templateId = this.getGlobalTemplateId(triggerKey);
      this.updateGlobalTemplate(templateId, templateInfo);
    } else {
      const localTemplateId = this.getLocalTemplateId(triggerKey);
      if (localTemplateId) {
        this.updateLocalTemplate(localTemplateId, templateInfo);
      } else {
        this.createLocalTemplate(templateInfo);
      }
    }
  }

  updateGlobalTemplate = (templateId, data) => {
    // this.props.UpdateGlobalTemplate({
    //   templateId,
    //   data: {
    //    'global_message_template': {
    //       email_options: data
    //    }
    //   }
    // });
  }

  createLocalTemplate = (data) => {

  }

  updateLocalTemplate = (id, data) => {

  }

  render() {
    const { selected, showContent } = this.state;
    return (
      <MessageBasic
        left={
          <TemplateLeft
            onSelect={selected => {
              this.setState({ selected, showContent: true });
            }}
          />
        }
        right={
          <TemplateContent
            selected={selected}
            onBack={this.goBack}
            onCancel={this.goBack}
            onSave={this.onSave}
          />
        }
        showContent={showContent}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  globalTemplates: state.messageTemplate.globalTemplates,
  localTemplates: state.messageTemplate.localTemplates,
  privilege: state.auth.privilege,
});

const mapDispatchToProps = {
  GetGlobalTemplates,
  GetLocalTemplates,
  UpdateGlobalTemplate,
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateBox);
