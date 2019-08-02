import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get } from 'lodash';

import { HollowButton } from 'components/basic/Buttons';
import { SelectorWrapper } from '../../../Wrappers';

import categoryOptions from './defaultServiceCategories';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Tile = styled.div`
  display: inline-block;
  width: 282px;
  margin: 0 12px 18px;
  .tile-content {
    height: 78px;
    display: flex;
    background: #F8F8F8;
    align-items: center;
    padding: 0 10px 0 30px;
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
`;

class AppServiceCategories extends React.Component {
  handleButtonClick = () => {
    const { onAdd } = this.props;
    if (onAdd) {
      onAdd();
    }
  };

  onSelect = category => () => {
    const { onSelect } = this.props;
    onSelect(category);
  };

  getIcon = (iconId) => {
    const { icons } = this.props;
    const icon = icons.find(icon => icon.id.toString() === iconId.toString());
    return get(icon, 'icon.url');
  }

  render() {
    return (
      <SelectorWrapper>
        <Wrapper>
          <HeaderWrapper>
            <HollowButton style={{ marginLeft: 10, height: 32 }} onClick={this.handleButtonClick}>Add Category</HollowButton>
          </HeaderWrapper>
          <ListWrapper>
            {
              categoryOptions.map((item, idx) => {
                const { attributes: { name, iconId } } = item;
                const icon = this.getIcon(iconId);
                return (
                  <Tile key={`category_${idx}`} onClick={this.onSelect(item)}>
                    <div className="tile-content" onClick={this.onGoToDetails}>
                      <img className="tile-image" src={icon} alt={name} />
                      <p className="tile-name">{name}</p>
                    </div>
                  </Tile>
                )
              })
            }
          </ListWrapper>
        </Wrapper>
      </SelectorWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  currentProvider: state.provider.currentProvider,
  icons: state.icon.icons
})

export default connect(mapStateToProps)(AppServiceCategories);
