import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get } from 'lodash';

import { OrangeButton } from 'components/basic/Buttons';
import { ChatBox } from 'components/compound/Message/ChatBox';
import { BoatyardSelect } from 'components/basic/Dropdown';
import CustomerOption from 'components/basic/CustomerOption';

import { refinedNetworkSelector } from 'store/selectors/network';
import { CreateNetwork } from 'store/actions/networks';
import { CreateMessage } from 'store/actions/conversations';
import {
  FilterUsers,
} from 'store/actions/users';

const ChatHeader = styled.div`
  background-color: #07384b;
  border-bottom: 1px solid #aaa2aa;
  padding: 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InputWrapper = styled.div`
  display: flex;
  padding: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InputLabel = styled.div`
  color: #E6E6E6;
  font-family: "Source Sans",sans-serif !important;
  font-size: 14px;
`;

const Select = styled(BoatyardSelect)`
  width: 220px;
`;

const HeaderTitle = styled.div`
  padding: 15px;
  font-size: 18px;
  font-family: 'Montserrat', sans-serif !important;
  color: #e6e6e6;
`;

const ValueLabel = styled.div`
  display: inline-block;
  font-size: 12px;
  color: #333;
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
    backgroundColor: 'transparent !important',
    cursor: 'pointer'
  })
}

const MultiValueLabel = (props) => {
  const { data: { firstName, lastName } } = props;
  return (
    <ValueLabel {...props}>
      {firstName} {lastName}
    </ValueLabel>
  );
};

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
    defaultOptions: []
  };

  componentDidMount() {
    this.loadOptions('')
      .then(result => {
        this.setState({
          defaultOptions: result,
        })
      })
  }

  loadOptions = val => {
    return this.onChangeUserFilter(val)
      .then((filtered) => {
        return filtered;
      }, () => {
        return [];
      });
  };

  getSenderInfo = () => {
    const { privilege, provider, profile } = this.props;
    const { id, type } = privilege === 'provider' ? provider.data : profile;
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
      this.props.FilterUsers({
        params: {
          'search_by_full_name': val
        },
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
    const senderInfo = this.getSenderInfo();
    users.forEach((user) => {
      const recipientInfo = this.getRecipientInfo(user);
      this.props.CreateNetwork({
        data: {
          network: {
            ...senderInfo,
            ...recipientInfo
          }
        },
        success: this.sendMessage(data, recipientInfo)
      })
    })
  }

  onSendingSuccess = (result) => {
    const conversationId = get(result, 'attributes.conversationId', -1);
    this.props.onCreationSuccess(conversationId);
  }

  sendMessage = (data, recipientInfo) => () => {
    this.props.CreateMessage({
      data: {
        message: {
          content: data.text,
          ...recipientInfo,
        }
      },
      success: this.onSendingSuccess
    })
  }

  render() {
    const { users, defaultOptions } = this.state;
    return (
      <React.Fragment>
        <ChatHeader>
          <HeaderTitle>New Messages</HeaderTitle>
          <OrangeButton onClick={this.props.onCancel}>Cancel</OrangeButton>
        </ChatHeader>
        <InputWrapper>
          <InputLabel>To:</InputLabel>
          <Select
            placeholder="Choose a recipient"
            components={{
              Option: CustomerOption,
              MultiValueLabel,
            }}
            cacheOptions
            defaultOptions={defaultOptions}
            isMulti
            onInputChange={this.onChangeUserFilter}
            loadOptions={this.loadOptions}
            onChange={this.onChangeUser}
            styles={selectorStyle}
            value={users}
          />
        </InputWrapper>
        <ChatBox third noBorder onSend={this.onSend} />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  ...refinedNetworkSelector(state),
  currentCustomerStatus: state.childAccount.currentStatus,
  profile: state.profile,
  provider: state.provider.loggedInProvider,
  privilege: state.auth.privilege,
})

const mapDispatchToProps = {
  CreateNetwork,
  CreateMessage,
  FilterUsers,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);