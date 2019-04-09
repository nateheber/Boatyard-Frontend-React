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
    const { globalTemplates } = this.props;
    const triggerKeys = keys(globalTemplates);
    const options = triggerKeys.map((triggerKey) => ({
      triggerKey,
      title: startCase(triggerKey),
      subject: get(globalTemplates, `${triggerKey}.attributes.subject`),
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
})

export default connect(mapStateToProps)(TemplateSelector);