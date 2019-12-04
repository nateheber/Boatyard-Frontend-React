import React from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';

import { CheckField } from 'components/basic/Input';
import { GetProvider } from 'store/actions/providers';

class ProviderCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      providerName: `Provider #${props.providerId}`
    };
    this._isMounted = false;
  }

  componentDidMount() {
    const { providerId } = this.props;
    if (providerId) {
      this.props.GetProvider({ providerId, success: this.onFetchSucceed });
    }
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  };

  getProviderName = () => {
    const { provider } = this.props;
    return `${get(provider, 'provider_name', this.state.providerName)} ${get(provider, 'name', this.state.providerName)}`;
  };

  onFetchSucceed = (provider) => {
    if (this._isMounted) {
      this.setState({ providerName: provider.name });
    }
  };

  render() {
    const { checked, onClick } = this.props;
    return (
      <CheckField title={this.getProviderName()} checked={checked} onClick={onClick}/>
    );
  }
}

const mapDispatchToProps = {
  GetProvider
};

export default connect(null, mapDispatchToProps)(ProviderCheck);
