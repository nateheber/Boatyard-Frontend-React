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
      case 'requestPrice':
        return <RequestPrice {...data} />;
      case 'requestList':
        return <RequestList {...data} />;
      case 'requestPriceList':
        return <RequestPriceList {...data} />;
      case 'bookPrice':
        return <BookPrice {...data} />;
      case 'bookPriceList':
        return <BookPriceList {...data} />;
      case 'book':
        return <Book {...data} />;
      case 'bookList':
        return <BookList {...data} />;
      case 'getHelp':
        return <GetHelp {...data} />;
      case 'pumpOut':
        return <PumpOut {...data} />;
      case 'fuel':
        return <Fuel {...data} />;
      case 'captainService':
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