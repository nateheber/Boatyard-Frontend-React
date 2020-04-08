import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get, isEmpty } from 'lodash';
import { Row, Col } from 'react-flexbox-grid';

import { BoatyardSelect } from 'components/basic/Dropdown';
import CustomerOption from 'components/basic/CustomerOption';
import ChatBox from 'components/template/Message/ChatBox';
import CustomerOptionValue from 'components/basic/CustomerOptionValue';
import { refinedNetworkSelector, getRecipients } from 'store/selectors/network';
import { GetNetworks } from 'store/actions/networks';
import { CreateMessage, CreateConversation } from 'store/actions/conversations';
import {
  FilterUsers,
} from 'store/actions/users';

const InputWrapper = styled(Row)`
  display: flex;
  padding: 30px;
  flex-direction: row;
  align-items: center;
  .customer-label {
    width: 30px;
  }
  .customer-select {
    width: calc(100% - 30px);
    max-width: 300px;
  }
`;

const InputLabel = styled(Col)`
  color: #333;
  font-family: "Source Sans Pro",sans-serif !important;
  font-size: 14px;
`;

const InputField = styled(Col)`
`;

const Select = styled(BoatyardSelect)`
  width: 100%;
`;

const selectorStyle = {
  multiValue: (base) => ({
    ...base,
    border: '1px solid #ccc',
    backgroundColor: '#FFF',
    padding: '1px 5px',
    transition: 'all 0.5s',
    ':hover': {
      backgroundColor: '#e6e6e6',
      borderColor: '#adadad',
    }
  }),
  multiValueRemove: (base) => ({
    ...base,
    marginTop: '2px',
    backgroundColor: 'transparent !important',
    cursor: 'pointer',
    color: '#efefef',
  })
}

const parseUserType = (type) => {
  switch(type) {
    case 'users':
      return 'User';
    case 'providers':
      return 'Provider';
    default:
      return 'User';
  }
}

class NewMessage extends React.Component {
  state = {
    users: -1,
    isMount: false,
  };

  componentDidMount() {
    this.setState({ isMount: true });
  }

  componentWillUnmount() {
    this.setState({ isMount: false });
  }

  loadOptions = val => {
    return new Promise((resolve, reject) => {
      this.props.GetNetworks({params: {search: val}, success: () => {
        window.setTimeout(() => resolve(this.props.recipients), 10);
      }});
    });
  };

  getSenderInfo = () => {
    const { privilege, provider, profile } = this.props;
    const { id, type } = privilege === 'provider' ? provider : profile;
    const parsedType = parseUserType(type);
    return { sender_id: id, sender_type: parsedType };
  }

  getRecipientInfo = (user) => {
    const { id, type } = user;
    const parsedType = parseUserType(type);
    return { recipient_id: id, recipient_type: parsedType };
  }

  onChangeUserFilter = val => {
    return new Promise((resolve, reject) => {
      const params = {
        'user[sort]': 'asc',
        'user[order]': 'last_name'
      };
      if (val && !isEmpty(val)) {
        params['search_by_full_name'] = val;
      }
      this.props.FilterUsers({
        params,
        success: resolve,
        error: reject
      });
    });
  };

  onChangeUser = (users) => {
    this.setState({ users });
  }

  onSend = (data) => {
    const { users } = this.state;
    const {recipient_id, recipient_type} = this.getRecipientInfo(users);
    this.props.CreateConversation({
      data: {
        conversation: {
          intended_recipient_type: recipient_type,
          intended_recipient_id: recipient_id
        }
      },
      success: (res) => this.sendMessage(data, res, recipient_id, recipient_type),
      error: this.networkCreationFailed(data)
    });
  }

  onSendingSuccess = (result) => {
    const { isMount } = this.state;
    if (isMount) {
      const conversationId = get(result, 'attributes.conversationId', -1);
      this.props.onCreationSuccess(conversationId);
      this.setState({ isMount: false });
    }
  }

  sendMessage = (message, {id: conversation_id}, recipient_id, recipient_type) => {
    this.props.CreateMessage({
      data: {
        message: {
          ...message,
          conversation_id: parseInt(conversation_id)
        },
        recipient_id: parseInt(recipient_id),
        recipient_type,
      },
      success: this.onSendingSuccess
    })
  }

  networkCreationFailed = (data, recipientInfo) => (error) => {
    if (error.message.indexOf('already exists.') > -1) {
      this.sendMessage(data, recipientInfo)();
    }
  }

  render() {
    const { users } = this.state;

    return (
      <React.Fragment>
        <InputWrapper>
          <InputLabel className="customer-label">To:</InputLabel>
          <InputField className="customer-select">
            <Select
              placeholder="Choose a recipient"
              components={{
                Option: CustomerOption,
                SingleValue: CustomerOptionValue,
              }}
              defaultOptions
              loadOptions={this.loadOptions}
              onInputChange={this.loadOptions}
              onChange={this.onChangeUser}
              styles={selectorStyle}
              value={users}
            />
          </InputField>
        </InputWrapper>
        <ChatBox onSend={this.onSend} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  ...refinedNetworkSelector(state),
  recipients: getRecipients(state),
  currentCustomerStatus: state.childAccount.currentStatus,
  profile: state.profile,
  provider: state.provider.loggedInProvider,
  privilege: state.auth.privilege,
})

const mapDispatchToProps = {
  CreateConversation,
  CreateMessage,
  FilterUsers,
  GetNetworks,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);
