import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get, isEmpty } from 'lodash';

import { OrangeButton } from 'components/basic/Buttons';
import ChatBox from 'components/template/Message/ChatBox';
import { BoatyardSelect } from 'components/basic/Dropdown';
import MessageCustomerOption from 'components/basic/MessageCustomerOption';
import CustomerOptionValue from 'components/basic/CustomerOptionValue';
import { refinedNetworkSelector, getRecipients } from 'store/selectors/network';
import { CreateNetwork, GetNetworks } from 'store/actions/networks';
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
  width: 240px;
`;

const HeaderTitle = styled.div`
  padding: 15px;
  font-size: 18px;
  font-family: 'Montserrat', sans-serif !important;
  color: #e6e6e6;
`;

// const ValueLabel = styled.div`
//   display: inline-block;
//   font-size: 12px;
//   color: #333;
// `;

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
    const senderInfo = this.getSenderInfo();
    const recipientInfo = this.getRecipientInfo(users);
    this.props.CreateNetwork({
      data: {
        network: {
          ...senderInfo,
          ...recipientInfo
        }
      },
      success: this.sendMessage(data, recipientInfo),
      error: this.networkCreationFailed(data, recipientInfo)
    });

    // users.forEach((user) => {
    //   const recipientInfo = this.getRecipientInfo(user);
    //   this.props.CreateNetwork({
    //     data: {
    //       network: {
    //         ...senderInfo,
    //         ...recipientInfo
    //       }
    //     },
    //     success: this.sendMessage(data, recipientInfo),
    //     error: this.networkCreationFailed(data, recipientInfo)
    //   })
    // });
  }

  onSendingSuccess = (result) => {
    const conversationId = get(result, 'attributes.conversationId', -1);
    this.props.onCreationSuccess(conversationId)();
  }

  sendMessage = (data, recipientInfo) => () => {
    this.props.CreateMessage({
      data: {
        ...recipientInfo,
        message: isEmpty(data.image) ? {
          content: data.text,
        } : {
          content: data.text,
          file: get(data, 'image'),
        }
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
          <Select
            // isMulti
            defaultOptions
            components={{
              Option: MessageCustomerOption,
              SingleValue: CustomerOptionValue
              // MultiValueLabel
            }}
            loadOptions={this.loadOptions}
            onInputChange={this.loadOptions}
            styles={selectorStyle}
            onChange={this.onChangeUser}
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
  recipients: getRecipients(state),
  currentCustomerStatus: state.childAccount.currentStatus,
  profile: state.profile,
  provider: state.provider.loggedInProvider,
  privilege: state.auth.privilege,
})

const mapDispatchToProps = {
  CreateNetwork,
  CreateMessage,
  FilterUsers,
  GetNetworks,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);
