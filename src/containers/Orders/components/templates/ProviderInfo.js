import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { GetProvider } from 'store/actions/providers';

const Wrapper = styled.div`
  box-sizing: border-box;
  height: 44px;
  background-color: white;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 16px;
  font-weight: 400;
  padding: 10px 15px;
  color: #004258;
`

class ProviderInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      providerName: `Provider #${props.id}`
    };
    this._isMounted = false;
  }

  componentDidMount() {
    const { id } = this.props;
    this.props.GetProvider({ providerId: id, success: this.onFetchSucceed })
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onFetchSucceed = (provider) => {
    if (this._isMounted) {
      this.setState({ providerName: provider.name })
    }
  }

  render() {
    const { providerName } = this.state;;
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