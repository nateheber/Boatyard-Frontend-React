import React from 'react';
import { connect } from 'react-redux';

import { GetGlobalTemplates, GetLocalTemplates } from 'store/actions/messageTemplates';

import MessageBasic from '../MessageBasic';
import TemplateLeft from './TemplateLeft';
import TemplateContent from './TemplateContent';

class TemplateBox extends React.Component {
  state = {
    selected: '',
    showContent: false
  };

  componentDidMount() {
    const { GetGlobalTemplates, GetLocalTemplates } = this.props;
    GetGlobalTemplates({ params: { 'per_page': 200 } });
    GetLocalTemplates({ params: { 'per_page': 200 } });
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
            onBack={() => {
              this.setState({
                showContent: false
              });
            }}
            onCancel={() => {
              this.setState({
                selected: '',
                showContent: false
              });
            }}
            onSave={() => {
              this.setState({
                selected: '',
                showContent: false
              });
            }}
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
});

const mapDispatchToProps = {
  GetGlobalTemplates,
  GetLocalTemplates,
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateBox);
