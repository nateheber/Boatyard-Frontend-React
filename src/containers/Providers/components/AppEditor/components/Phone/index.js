import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import { PhoneBanner, PhonePreview, ItemListPreview } from './components';

import {
  BookPriceList, Fuel,
  PumpOut, CaptainService,
  Request, RequestPrice,
  RequestList, RequestPriceList,
  BookPrice, Book, BookList, GetHelp,
} from '../ServiceTemplates/components';

class Phone extends React.Component {
  renderHomeScreen = () => {
    const { banner, provider, renderingData, onChangeOrder, onEdit, onClickItem } = this.props;
    const providerName = get(provider, 'name');
    const items = get(renderingData, 'items', []);
    return (
      <React.Fragment>
        <PhoneBanner banner={banner} providerName={providerName} />
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
    const { renderingData: { template }, onChangeTemplateInfo } = this.props;
    if (template) {
      const { templateType, data: { data } } = template;
      switch (templateType) {
        case 'request':
          return <Request {...data} onChange={onChangeTemplateInfo} />;
        case 'request_price':
          return <RequestPrice {...data} onChange={onChangeTemplateInfo} />;
        case 'request_list':
          return <RequestList {...data} onChange={onChangeTemplateInfo} />;
        case 'request_price_list':
          return <RequestPriceList {...data} onChange={onChangeTemplateInfo} />;
        case 'book_price':
          return <BookPrice {...data} onChange={onChangeTemplateInfo} />;
        case 'book':
          return <Book {...data} onChange={onChangeTemplateInfo} />;
        case 'book_list':
          return <BookList {...data} onChange={onChangeTemplateInfo} />;
        case 'get_help':
          return <GetHelp {...data} onChange={onChangeTemplateInfo} />;
        case 'captains':
          return <CaptainService {...data} onChange={onChangeTemplateInfo} />;
        case 'book_price_list':
          return <BookPriceList {...data} onChange={onChangeTemplateInfo} />;
        case 'pumpout':
          return (
            <PumpOut {...data} onChange={onChangeTemplateInfo} />
          );
        case 'fuel':
          return (
            <Fuel {...data} onChange={onChangeTemplateInfo} />
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
      return get(renderingData, 'info.attributes.name');
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
