import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import {
  GetGlobalTemplates,
  GetLocalTemplates,
  CreateLocalTemplate,
  UpdateGlobalTemplate,
  UpdateLocalTemplate
} from 'store/actions/messageTemplates';

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
    const { GetGlobalTemplates, GetLocalTemplates, privilege } = this.props;
    if (privilege === 'admin') {
      GetGlobalTemplates({ params: { 'per_page': 200 } });
    } else {
      GetLocalTemplates({ params: { 'per_page': 200 } });
    }
  }

  handleSaveTemplate = (templateInfo) => {
    const { privilege } = this.props;
    const { templateId, ...updatedInfo } = templateInfo;
    if (privilege === 'admin') {
      this.updateGlobalTemplate(templateId, updatedInfo);
    } else {
      this.updateLocalTemplate(templateId, updatedInfo);
    }
  };

  updateGlobalTemplate = (templateId, data) => {
    this.props.UpdateGlobalTemplate({
      templateId,
      data: {
       'global_message_template': data
      },
      success: () => {
        toastr.success('Success', 'Saved successfully!');
        const { GetGlobalTemplates } = this.props;
        GetGlobalTemplates({ params: { 'per_page': 200 } });    
      },
      error: (e) => {
        toastr.error('Error', e.message);
      }
    });
  };

  updateLocalTemplate = (templateId, data) => {
    this.props.UpdateLocalTemplate({
      templateId,
      data: {
        'message_template': data
      },
      success: () => {
        toastr.success('Success', 'Saved successfully!');
        const { GetLocalTemplates } = this.props;
        GetLocalTemplates({ params: { 'per_page': 200 } });
      },
      error: (e) => {
        toastr.error('Error', e.message);
      }
    });
  };

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
            onSave={this.handleSaveTemplate}
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
  CreateLocalTemplate,
  UpdateGlobalTemplate,
  UpdateLocalTemplate,
};

export default connect(mapStateToProps, mapDispatchToProps)(TemplateBox);
