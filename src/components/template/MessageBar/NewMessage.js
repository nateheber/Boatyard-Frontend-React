import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get, isEmpty } from 'lodash';
import AsyncSelect from 'react-select/lib/Async';
import debounce from "debounce-promise";

import { OrangeButton } from 'components/basic/Buttons';
import ChatBox from 'components/template/Message/ChatBox';
import MessageCustomerOption from 'components/basic/MessageCustomerOption';
import CustomerOptionValue from 'components/basic/CustomerOptionValue';
import { refinedNetworkSelector, getRecipients } from 'store/selectors/network';
import { GetNetworks } from 'store/actions/networks';
import { CreateMessage, CreateConversation } from 'store/actions/conversations';
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

const HeaderTitle = styled.div`
  padding: 15px;
  font-size: 18px;
  font-family: 'Montserrat', sans-serif !important;
  color: #e6e6e6;
`;

export const colourStyles = {
  option: (provided, state) => ({
    ...provided,
    width: '600px',
    display: 'fixed',
  }),
  container: styles => ({
    ...styles,
    flex: 1,
    paddingLeft: 30,
    maxWidth: 271.31
  }),
  control: styles => ({
    ...styles,
    backgroundColor: 'white',
    fontSize: 12,
    fontFamily: 'Montserrat',
    paddingLeft: 5,
    minHeight: 28,
    border: '1px solid #dfdfdf'
  }),
  input: styles => ({
    ...styles,
    fontSize: 12,
    fontFamily: 'Montserrat',
    color: '#555',
    paddingTop: 1,
    paddingBottom: 1
  }),
  loadingMessage: styles => ({
    ...styles,
    fontSize: 12,
    fontFamily: 'Montserrat',
    color: '#555'
  }),
  dropdownIndicator: styles => ({
    ...styles,
    padding: 5
  }),
  indicatorSeparator: styles => ({
    ...styles,
    display: 'none'
  }),
  clearIndicator: styles => ({
    ...styles,
    display: 'none'
  }),
  noOptionsMessage: styles => ({
    ...styles,
    fontSize: 12
  }),
  menu: styles => ({
    ...styles,
    width: 241.31,
  }),
  placeholder: styles => ({ ...styles }),
};

export const colourOptions = [
  { value: 'ocean', label: 'Ocean', color: '#00B8D9', isFixed: true },
  { value: 'blue', label: 'Blue', color: '#0052CC', isDisabled: true },
  { value: 'purple', label: 'Purple', color: '#5243AA' },
  { value: 'red', label: 'Red', color: '#FF5630', isFixed: true },
  { value: 'orange', label: 'Orange', color: '#FF8B00' },
  { value: 'yellow', label: 'Yellow', color: '#FFC400' },
  { value: 'green', label: 'Green', color: '#36B37E' },
  { value: 'forest', label: 'Forest', color: '#00875A' },
  { value: 'slate', label: 'Slate', color: '#253858' },
  { value: 'silver', label: 'Silver', color: '#666666' },
];

// const MultiValueLabel = ({props, data}) => {
//   const { label } = data;
//   return (
//     <ValueLabel {...props}>
//       {label}
//     </ValueLabel>
//   );
// };

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
    inputValue: ''
  };

  componentDidMount() {
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
          recipient_type: recipient_type,
          recipient_id: recipient_id,
        }
      },
      success: (res) => this.sendMessage(data, res),
      error: this.networkCreationFailed(data)
    });
  }

  onSendingSuccess = (result) => {
    const conversationId = get(result, 'attributes.conversationId', -1);
    this.props.onCreationSuccess(conversationId)();
  }

  sendMessage = (message, {id: conversationId}) => {
    this.props.CreateMessage({
      conversationId,
      data: {
        message
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
        <ChatHeader>
          <HeaderTitle>New Messages</HeaderTitle>
          <OrangeButton onClick={this.props.onCancel}>Cancel</OrangeButton>
        </ChatHeader>
        <InputWrapper>
          <InputLabel>To:</InputLabel>
          <AsyncSelect
            ref={this.setCustomerSelectRef}
            components={{
              Option: MessageCustomerOption,
              SingleValue: CustomerOptionValue
              // MultiValueLabel
            }}
            isClearable
            defaultOptions
            loadOptions={debounce(this.loadOptions, 1000, {leading: true})}
            onChange={this.onChangeUser}
            value={users}
            styles={colourStyles}
            noOptionsMessage={()=>"No Result"}
          />
        </InputWrapper>
        <ChatBox third noBorder onSend={this.onSend} />
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
  CreateMessage,
  FilterUsers,
  GetNetworks,
  CreateConversation,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);
