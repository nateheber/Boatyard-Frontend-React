import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { get } from 'lodash';

import { HollowButton } from 'components/basic/Buttons';
import { SelectorWrapper } from '../../../Wrappers';

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
    return icons.find(icon => icon.id.toString() === iconId.toString());
  }

  render() {
    const { categories } = this.props;
    return (
      <SelectorWrapper>
        <Wrapper>
          <HeaderWrapper>
            <HollowButton style={{ marginLeft: 10, height: 32 }} onClick={this.handleButtonClick}>Add Category</HollowButton>
          </HeaderWrapper>
          <ListWrapper>
            {
              categories.map((item, idx) => {
                const { name, iconId } = item.attributes;
                const icon = this.getIcon(iconId);
                return (
                  <Tile key={`category_${idx}`} onClick={this.onSelect(item)}>
                    <div className="tile-content" onClick={this.onGoToDetails}>
                      <img className="tile-image" src={get(icon, 'icon.url')} alt={name} />
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
