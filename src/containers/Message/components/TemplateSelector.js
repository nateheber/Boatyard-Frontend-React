import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { startCase } from 'lodash';

import { MessageItem, TemplateItem } from 'components/basic/Message';

const Wrapper = styled.div``;

class TemplateSelector extends React.Component {
  state = {
    selected: ''
  };

  getTemplates = () => {
    const { privilege, globalTemplates, localTemplates } = this.props;
    if (privilege === 'admin') {
      return globalTemplates;
    }
    //return localTemplates;
    return globalTemplates.filter((e) => e.triggerKey === 'invoice_for_customer' || e.triggerKey === 'new_quote_available' )
  };

  renderTemplates = () => {
    const { onSelect } = this.props;
    const { selected } = this.state;
    const templates = this.getTemplates();
    //console.log(templates);
    return templates.map(template => {
      const { triggerKey, subject } = template;
      return (<MessageItem
        onClick={() => {
          this.setState({ selected: triggerKey });
          if (onSelect) {
            onSelect(triggerKey);
          }
        }}
        className={selected === triggerKey ? 'active' : 'detactive'}
        key={triggerKey}
      >
        <TemplateItem
          title={startCase(triggerKey)}
          description={subject}
        />
      </MessageItem>);
    });
  };

  render() {
    return (
      <Wrapper>
        {this.renderTemplates()}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  globalTemplates: state.messageTemplate.globalTemplates,
  localTemplates: state.messageTemplate.localTemplates,
  privilege: state.auth.privilege
})

export default connect(mapStateToProps)(TemplateSelector);