import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { OrangeButton } from 'components/basic/Buttons';
import { ChatBox } from 'components/compound/Message/ChatBox';
import { BoatyardSelect } from 'components/basic/Dropdown';
import CustomerOption from 'components/basic/CustomerOption';

import { refinedNetworkSelector } from 'store/selectors/network';
import { CreateNetwork } from 'store/actions/networks';
import {
  FilterChildAccounts,
} from 'store/actions/child-accounts';

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

class NewMessage extends React.Component {
  state = {
    user: -1,
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

  onChangeUserFilter = val => {
    return new Promise((resolve, reject) => {
      this.props.FilterChildAccounts({
        params: {
          'search_by_full_name': val
        },
        success: resolve,
        error: reject
      });
    });
  };

  onChangeUser = (user) => {
    console.log(user);
    this.setState({ user });
  }

  onSend = (data) => {
    console.log(data);
  }

  render() {
    const { user, defaultOptions } = this.state;
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
            value={user}
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
})

const mapDispatchToProps = {
  CreateNetwork,
  FilterChildAccounts,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessage);