import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get, isEmpty } from 'lodash';
import { Row, Col } from 'react-flexbox-grid';

import { BoatyardSelect } from 'components/basic/Dropdown';
import CustomerOption from 'components/basic/CustomerOption';
import ChatBox from 'components/template/Message/ChatBox';

import { refinedNetworkSelector } from 'store/selectors/network';
import { CreateNetwork } from 'store/actions/networks';
import { CreateMessage } from 'store/actions/conversations';
import {
  FilterUsers,
} from 'store/actions/users';

const InputWrapper = styled(Row)`
  display: flex;
  padding: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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
    marginTop: '2px',
    backgroundColor: 'transparent !important',
    cursor: 'pointer',
    color: '#efefef',
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
    users: [],
    isMount: false,
  };

  componentDidMount() {
    this.setState({ isMount: true });
  }

  componentWillUnmount() {
    this.setState({ isMount: false });
  }

  loadOptions = val => {
    console.log(val);
    return this.onChangeUserFilter(val)
      .then((filtered) => {
        console.log(filtered);
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
        success: this.sendMessage(data, recipientInfo),
        error: this.networkCreationFailed(data, recipientInfo)
      })
    })
  }

  onSendingSuccess = (result) => {
    const { isMount } = this.state;
    if (isMount) {
      const conversationId = get(result, 'attributes.conversationId', -1);
      this.props.onCreationSuccess(conversationId);
      this.setState({ isMount: false });
    }
  }

  sendMessage = (data, recipientInfo) => () => {
    this.props.CreateMessage({
      data: {
        message: isEmpty(data.image) ? {
          content: data.text,
          ...recipientInfo,
        } : {
          content: data.text,
          file: get(data, 'image'),
          ...recipientInfo,
        }
      },
      success: this.onSendingSuccess
    })
  }

  networkCreationFailed = (data, recipientInfo) => (result) => {
    if (get(result, 'recipient_id[0]') === 'already exists.') {
      this.sendMessage(data, recipientInfo)();
    }
  }

  render() {
    const { users } = this.state;
    return (
      <React.Fragment>
        <InputWrapper>
          <InputLabel xs={2}>To</InputLabel>
          <InputField xs={10}>
            <Select
              placeholder="Choose a recipient"
              components={{
                Option: CustomerOption,
                MultiValueLabel,
              }}
              cacheOptions
              isMulti
              defaultOptions
              loadOptions={this.loadOptions}
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