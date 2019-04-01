import React from 'react';
import styled from 'styled-components';

import { SearchBox } from 'components/basic/Input';

import defaultTemplateInfos from '../defaultTemplateValues' ;
import {
  BookPriceList, Fuel, PumpOut,
  TemplateOption, CaptainService,
  Request, RequestPrice, RequestList,
  RequestPriceList, BookPrice,
  Book,
  BookList,
  GetHelp,
} from './index';

const HeaderWrapper = styled.div`
  dispaly: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const SearchWrapper = styled.div`
  display: inline-block;
  box-sizing: border-box;
  width: 282px;
  margin: 10px;
`;

const SearchInput = styled(SearchBox)`
  display: inline-block;
  box-sizing: border-box;
  width: 282px;
`;

const ListTitle = styled.div`
  padding: 10px;
  margin: 5px 0;
  font-family: Helvetica;
  font-size: 24px;
  color: #003247;
  text-align: left;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  max-height: 536px;
  overflow-y: scroll;
  padding: 10px;
`;


export default class TemplateSelector extends React.Component {
  static getDerivedStateFromProps(props) {
    return { selected: props.selected }
  }

  state = {
    selected: ''
  }

  onChange = item => () => {
    const { selected } = this.props;
    if (item !== selected) {
      this.setState({ selected: item });
      this.props.onChange(item);
    }
  }

  renderTemplates = () => {
    const keys = Object.keys(defaultTemplateInfos);
    const { selected } = this.state;
    return keys.map((item) => {
      const templateDefValues = defaultTemplateInfos[item].data;
      const name = defaultTemplateInfos[item].templateName;
      const title = defaultTemplateInfos[item].templateTitle;
      const isSelected = item === selected;
      switch (item) {
        case 'request':
          return (
            <TemplateOption title={title} name={name} selected={isSelected} onClick={this.onChange(item)} key={`template_${item}`}>
              <Request {...templateDefValues} disabled />
            </TemplateOption>
          )
        case 'request_price':
          return (
            <TemplateOption title={title} name={name} selected={isSelected} onClick={this.onChange(item)} key={`template_${item}`}>
              <RequestPrice {...templateDefValues} disabled />
            </TemplateOption>
          )
        case 'request_list':
          return (
            <TemplateOption title={title} name={name} selected={isSelected} onClick={this.onChange(item)} key={`template_${item}`}>
              <RequestList {...templateDefValues} disabled />
            </TemplateOption>
          )
        case 'request_price_list':
          return (
            <TemplateOption title={title} name={name} selected={isSelected} onClick={this.onChange(item)} key={`template_${item}`}>
              <RequestPriceList {...templateDefValues} disabled />
            </TemplateOption>
          )
        case 'book_price':
          return (
            <TemplateOption title={title} name={name} selected={isSelected} onClick={this.onChange(item)} key={`template_${item}`}>
              <BookPrice {...templateDefValues} disabled />
            </TemplateOption>
          )
        case 'book_price_list':
          return (
            <TemplateOption title={title} name={name} selected={isSelected} onClick={this.onChange(item)} key={`template_${item}`}>
              <BookPriceList {...templateDefValues} disabled />
            </TemplateOption>
          )
        case 'book':
          return (
            <TemplateOption title={title} name={name} selected={isSelected} onClick={this.onChange(item)} key={`template_${item}`}>
              <Book {...templateDefValues} disabled />
            </TemplateOption>
          )
        case 'get_help':
          return (
            <TemplateOption title={title} name={name} selected={isSelected} onClick={this.onChange(item)} key={`template_${item}`}>
              <GetHelp {...templateDefValues} disabled />
            </TemplateOption>
          )
        case 'book_list':
          return (
            <TemplateOption title={title} name={name} selected={isSelected} onClick={this.onChange(item)} key={`template_${item}`}>
              <BookList {...templateDefValues} disabled />
            </TemplateOption>
          )
        case 'pumpout':
          return (
            <TemplateOption title={title} name={name} selected={isSelected} onClick={this.onChange(item)} key={`template_${item}`}>
              <PumpOut {...templateDefValues} disabled />
            </TemplateOption>
          );
        case 'fuel':
          return (
            <TemplateOption title={title} name={name} selected={isSelected} onClick={this.onChange(item)} key={`template_${item}`}>
              <Fuel {...templateDefValues} disabled />
            </TemplateOption>
          );
        case 'captains':
          return (
            <TemplateOption title={title} name={name} selected={isSelected} onClick={this.onChange(item)} key={`template_${item}`}>
              <CaptainService {...templateDefValues} disabled />
            </TemplateOption>
          )
        default:
          return false;
      }
    });
  }

  render() {
    return (
      <HeaderWrapper>
        <SearchWrapper>
          <SearchInput onChange={this.onChangeKeyword} placeholder="SEARCH" />
        </SearchWrapper>
        <ListTitle>Template Options</ListTitle>
        <ListWrapper>
          {this.renderTemplates()}          
        </ListWrapper>
      </HeaderWrapper>
    );
  }
}

