import React from 'react';
import styled from 'styled-components';
import { get } from 'lodash';

const HeaderWrapper = styled.div`
  dispaly: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const Tile = styled.div`
  display: inline-block;
  width: 282px;
  margin: 0 12px 18px;
  .tile-content {
    display: flex;
    background: #F8F8F8;
    align-items: center;
    padding: 20px 10px 20px 30px;
    cursor: pointer;
    border-radius: 6px;
    &:hover {
      background: #EEE;
    }
    .tile-image {
      max-width: 40px;
      min-width: 40px;
      margin-right: 40px;
      max-height: 40px;  
    }
    .tile-name {
      font-family: Helvetica;
      font-size: 12px;
      color: #003247;
      text-transform: uppercase;
    }  
  }
`;

const ListWrapper = styled.div`
  display: block;
  width: 100%;
  max-height: 536px;
  overflow-y: scroll;
  margin-top: 13px;
`


export default class ServiceCategorySelector extends React.Component {
  static getDerivedStateFromProps(props) {
    const { selected } = props;
    return { selected };
  }

  state = {
    keyword: '',
    selected: [],
  }

  onSelect = category => () => {
    const { selected } = this.state;
    const result = selected.map(category => ({ ...category }));
    const lastIndex = get(result, `[${result.length - 1}].id`, -1);
    result.push({
      id: lastIndex + 1,
      ...category,
    });
    this.props.onChange(result);
  }

  render() {
    const { categories } = this.props;
    return (
      <HeaderWrapper>
        <ListWrapper>
          {
            categories.map((item, idx) => {
              const { name } = item;
              const defaultIcon = get(item, 'defaultIcon');
              const customIcon = get(item, 'customIcon');
              return (
                <Tile key={`category_${idx}`} onClick={this.onSelect(item)}>
                  <div className="tile-content" onClick={this.onGoToDetails}>
                    <img className="tile-image" src={defaultIcon || customIcon} alt={name} />
                    <p className="tile-name">{name}</p>
                  </div>
                </Tile>
              )
            })
          }
        </ListWrapper>
      </HeaderWrapper>
    );
  }
}
