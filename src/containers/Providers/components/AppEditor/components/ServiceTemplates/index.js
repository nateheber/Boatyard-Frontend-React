import React from 'react';

import { SelectorWrapper } from '../../../Wrappers';
import {
  BookPriceList, CaptainService,
  Fuel, PumpOut, TemplateSelector,
  Request, RequestPrice, RequestList,
  RequestPriceList, BookPrice,
  Book, BookList, GetHelp,
} from './components';

import defaultTemplateInfos from './defaultTemplateValues';

export default class ServiceTemplates extends React.Component {
  static getDerivedStateFromProps(props) {
    return { selected: props.selected };
  }
  state = {
    selected: '',
  }

  onChange = (selected) => {
    this.setState({ selected });
    this.props.onChange({
      templateType: selected,
      data: defaultTemplateInfos[selected],
    })
  }

  renderPreviewer = () => {
    const { selected } = this.state;
    const { data } = defaultTemplateInfos[selected];
    switch (selected) {
      case 'request':
        return <Request {...data} />;
      case 'request_price':
        return <RequestPrice {...data} />;
      case 'request_list':
        return <RequestList {...data} />;
      case 'request_price_list':
        return <RequestPriceList {...data} />;
      case 'book_price':
        return <BookPrice {...data} />;
      case 'book_price_list':
        return <BookPriceList {...data} />;
      case 'book':
        return <Book {...data} />;
      case 'book_list':
        return <BookList {...data} />;
      case 'get_help':
        return <GetHelp {...data} />;
      case 'pumpout':
        return <PumpOut {...data} />;
      case 'fuel':
        return <Fuel {...data} />;
      case 'captains':
        return <CaptainService {...data} />;
      default:
        return false;
    }
  }

  render() {
    const { selected } = this.state;
    return (
      <SelectorWrapper>
        <TemplateSelector selected={selected} onChange={this.onChange} />
      </SelectorWrapper>
    )
  }
}