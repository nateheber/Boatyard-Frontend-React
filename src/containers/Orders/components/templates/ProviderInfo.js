import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get } from 'lodash';

import { GetProvider } from 'store/actions/providers';

const Wrapper = styled.div`
  box-sizing: border-box;
  height: 50px;
  border: 1px solid #F5F5F5;
  background-color: white;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 10px 25px;
`

class ProviderInfo extends React.Component {
  state = {
    provider: {}
  }

  componentDidMount() {
    const { id } = this.props;
    this.props.GetProvider({ providerId: id, success: this.onFetchSucceed })
  }

  onFetchSucceed = (provider) => {
    this.setState({ provider })
  }

  getProviderName = () => {
    const { provider } = this.state;
    const { id } = this.props;
    return get(provider, 'name', `Provider #${id}`);
  }

  render() {
    const providerName = this.getProviderName();
    return (
      <Wrapper>
        {providerName}
      </Wrapper>
    )
  }
}

const mapDispatchToProps = {
  GetProvider
}

export default connect(null, mapDispatchToProps)(ProviderInfo);