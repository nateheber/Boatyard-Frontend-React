import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get, keys, startCase } from 'lodash';

import { MessageItem, TemplateItem } from 'components/basic/Message';

const Wrapper = styled.div``;

class TemplateSelector extends React.Component {
  state = {
    selected: ''
  };
  getOptions = () => {
    const { privilege, globalTemplates, localTemplates } = this.props;
    let templates = globalTemplates;
    if (privilege !== 'admin') {
      templates = localTemplates;
    }
    const triggerKeys = keys(templates);
    const options = triggerKeys.map((triggerKey) => ({
      triggerKey,
      title: startCase(triggerKey),
      subject: get(templates, `${triggerKey}.attributes.subject`),
      // trigger: get(globalTemplates, `${triggerKey}.trigger`),
      // messageType: get(globalTemplates, `${triggerKey}.messageType`),
    }));
    return options;
  }
  render() {
    const { onSelect } = this.props;
    const { selected } = this.state;
    const options = this.getOptions();
    return (
      <Wrapper>
        {
          options.map(({ triggerKey, subject, title }, idx) => (
            <MessageItem
              onClick={() => {
                this.setState({ selected: triggerKey });
                onSelect(triggerKey);
              }}
              className={selected === triggerKey ? 'active' : 'detactive'}
              key={triggerKey}
            >
              <TemplateItem
                title={title}
                description={subject}
              />
            </MessageItem>
          ))
        }
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