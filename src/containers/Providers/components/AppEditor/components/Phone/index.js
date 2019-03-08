import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { PhoneBanner, PhonePreview, ItemListPreview } from './components';

class Phone extends React.Component {
  renderHomeScreen = () => {
    const { image, provider, renderingData, onChangeOrder, onEdit } = this.props;
    const providerName = get(provider, 'name');
    return (
      <React.Fragment>
        <PhoneBanner image={image} providerName={providerName} />
        <ItemListPreview items={renderingData.items} onEdit={onEdit} onChangeOrder={onChangeOrder} />
      </React.Fragment>
    )
  }
  renderContent = () => {
    const { renderingData } = this.props;
    const { type } = renderingData;
    if (type === 'homeScreen') {
      return this.renderHomeScreen();
    }
    return false;
  }
  getHeaderTitle = () => {
    const { renderingData } = this.props;
    const { type } = renderingData;
    if (type === 'homeScreen') {
      return get(renderingData, 'screen');
    }
    return '';
  }
  render() {
    const screenTitle = this.getHeaderTitle();
    return (
      <PhonePreview screenTitle={screenTitle}>
        {this.renderContent()}
      </PhonePreview>
    )
  }
}

const mapStateToProps = (state) => ({
  provider: state.provider.currentProvider
});

export default connect(mapStateToProps)(Phone);
