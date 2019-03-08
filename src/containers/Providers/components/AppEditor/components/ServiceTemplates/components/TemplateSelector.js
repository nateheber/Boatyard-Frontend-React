import React from 'react';
import styled from 'styled-components';

import { SearchBox } from 'components/basic/Input';

import templatesInfo from '../defaultTemplateValues' ;
import { BoatWash, Fuel, LineHandling, PumpOut, TrashPickup, TemplateOption } from './index';

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
  constructor(props) {
    super(props);
    const { selected } = props;
    this.state = { selected };
  }

  onChange = item => () => {
    const { selected } = this.props;
    if (item !== selected) {
      this.setState({ selected: item });
      this.props.onChange(item);
    }
  }

  renderTemplates = () => {
    const keys = Object.keys(templatesInfo);
    const { selected } = this.state;
    return keys.map((item) => {
      const templateDefValues = templatesInfo[item].data;
      const title = templatesInfo[item].templateTitle;
      const isSelected = item === selected;
      switch (item) {
        case 'lineHandling':
          return (
            <TemplateOption title={title} selected={isSelected} onClick={this.onChange(item)} key={`template_${item}`}>
              <LineHandling { ...templateDefValues } disabled />
            </TemplateOption>
          );
        case 'trashPickup':
          return (
            <TemplateOption title={title} selected={isSelected} onClick={this.onChange(item)} key={`template_${item}`}>
              <TrashPickup {...templateDefValues} disabled />
            </TemplateOption>
          );
        case 'pumpOut':
          return (
            <TemplateOption title={title} selected={isSelected} onClick={this.onChange(item)} key={`template_${item}`}>
              <PumpOut {...templateDefValues} disabled />
            </TemplateOption>
          );
        case 'fuel':
          return (
            <TemplateOption title={title} selected={isSelected} onClick={this.onChange(item)} key={`template_${item}`}>
              <Fuel {...templateDefValues} disabled />
            </TemplateOption>
          );
        case 'boatWash':
          return (
            <TemplateOption title={title} selected={isSelected} onClick={this.onChange(item)} key={`template_${item}`}>
              <BoatWash {...templateDefValues} disabled />
            </TemplateOption>
          );
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

