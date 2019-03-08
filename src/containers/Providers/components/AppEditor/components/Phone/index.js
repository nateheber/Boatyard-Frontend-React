import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { PhoneBanner, PhonePreview, ItemListPreview } from './components';

import { BoatWash, Fuel, LineHandling, PumpOut, TrashPickup } from '../ServiceTemplates/components';

class Phone extends React.Component {
  renderHomeScreen = () => {
    const { image, provider, renderingData, onChangeOrder, onEdit, onClickItem } = this.props;
    const providerName = get(provider, 'name');
    const items = get(renderingData, 'items', []);
    return (
      <React.Fragment>
        <PhoneBanner image={image} providerName={providerName} />
        <ItemListPreview
          items={items}
          onEdit={onEdit}
          onClickItem={onClickItem}
          onChangeOrder={onChangeOrder}
        />
      </React.Fragment>
    )
  }

  renderCategoryScreen = () => {
    const { renderingData, onChangeOrder, onEdit, onClickItem } = this.props;
    const items = get(renderingData, 'items', []);
    return (
      <ItemListPreview
        items={items}
        onEdit={onEdit}
        onClickItem={onClickItem}
        onChangeOrder={onChangeOrder}
      />
    )
  }

  renderServiceScreen = () => {
    const { renderingData: { template } } = this.props;
    if (template) {
      const { templateType, data } = template;
      switch (templateType) {
        case 'lineHandling':
          return (
            <LineHandling { ...data.data } />
          );
        case 'trashPickup':
          return (
            <TrashPickup {...data.data} />
          );
        case 'pumpOut':
          return (
            <PumpOut {...data.data} />
          );
        case 'fuel':
          return (
            <Fuel {...data.data} />
          );
        case 'boatWash':
          return (
            <BoatWash {...data.data} />
          );
        default:
          return false;
      }
    }
    return false;
  }

  renderContent = () => {
    const { renderingData } = this.props;
    const { type } = renderingData;
    if (type === 'homeScreen') {
      return this.renderHomeScreen();
    } else if (type === 'category') {
      return this.renderCategoryScreen();
    } else if (type === 'service') {
      return this.renderServiceScreen();
    }
    return false;
  }

  getHeaderTitle = () => {
    const { renderingData } = this.props;
    const { type } = renderingData;
    if (type === 'homeScreen') {
      return get(renderingData, 'screen');
    } else if (type === 'category') {
      return get(renderingData, 'info.name');
    } else if (type === 'service') {
      return get(renderingData, 'info.name');
    }
    return '';
  }

  getTitle = () => {
    const { renderingData } = this.props;
    const { type } = renderingData;
    if (type === 'service') {
      return get(renderingData, 'template.data.templateTitle', '');
    }
    return '';
  }

  render() {
    const { renderingData, onBack, hasBack } = this.props;
    const screenTitle = this.getHeaderTitle();
    const secondary = renderingData.type === 'service';
    const title = this.getTitle();
    return (
      <PhonePreview hasBack={hasBack} onBack={onBack} secondary={secondary} title={title} screenTitle={screenTitle}>
        {this.renderContent()}
      </PhonePreview>
    )
  }
}

const mapStateToProps = (state) => ({
  provider: state.provider.currentProvider
});

export default connect(mapStateToProps)(Phone);
