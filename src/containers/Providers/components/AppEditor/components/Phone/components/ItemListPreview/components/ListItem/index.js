import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import classNames from 'classnames';
import { get } from 'lodash';

import Pencil from 'resources/edit.svg';

const Wrapper = styled.div`
  display: block;
  position: relative;
  height: 59px;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  height: 100%;
  box-sizing: border-box;
  flex-direction: row;
  align-items: center;
  border-bottom: solid 0.5px #979797;
  background-color: #d8d8d8;
  padding: 10px 15px;
`;

const Icon = styled.img`
  object-fit: cover;
  width: 24px;
  height: 24px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 12px;
  max-width: 135px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #094359;
  line-height: 13px;
`;

const Description = styled.div`
  font-size: 8px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 8px;
  letter-spacing: normal;
  color: #094359;
  margin-top: 3px;
`;

const EditWrapper = styled.div`
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  left: 0px;
  top: 0px;
  background-color: transparent;
  &.show {
    background-color: rgba(0, 0, 0, 0.7);
  }
  padding: 4px;
  transition: 0.5s all;
`;

const EditButtonWrapper = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  background-color: transparent;
  border: 1px dashed transparent;
  &.show {
    border: 1px dashed #D8D8D8;
  }
  transition: 0.5s all;
  padding-right: 9px;
`;

const EditButton = styled.div`
  width: 17px;
  height: 17px;
  background-color: #979797;
  mask-image: url(${Pencil});
  mask-size: 17px 17px;
  mask-repeat: no-repeat;
  &:hover {
    background-color: #D8D8D8;
  }
  cursor: pointer;
`;

class ListItem extends React.Component {
  state = {
    showEditWrapper: false
  }

  showEditWrapper = () => {
    this.setState({ showEditWrapper: true });
  }

  hideEditWrapper = () => {
    this.setState({ showEditWrapper: false });
  }

  onClickItem = () => {
    const { item, onClickItem } = this.props;
    onClickItem(item);
  }

  onEdit = (evt) => {
    evt.stopPropagation();
    const { item, onEdit } = this.props;
    onEdit(item);
  }

  getIcon = () => {
    const { item } = this.props;
    const iconId = get(item, 'info.attributes.iconId');
    const { icons } = this.props;
    return get(icons.find(icon => icon.id.toString() === iconId.toString()), 'icon.url');
    // if (item.type === 'category') {
    //   const iconId = get(item, 'info.attributes.iconId');
    //   const { icons } = this.props;
    //   return get(icons.find(icon => icon.id.toString() === iconId.toString()), 'icon.url');
    // }
    // const { info } = item;
    // const defaultIcon = get(info, 'defaultIcon');
    // const customIcon = get(info, 'customIcon');
    // return defaultIcon || customIcon;
  }

  getRenderingTexts = () => {
    const { item } = this.props;
    const { info: { attributes: { name, description } } } = item;  
    return { name, description };
    // if (item.type === 'category') {
    //   const { info: { attributes: { name, description } } } = item;  
    //   return { name, description };
    // }
    // const { info: { name, description } } = item;
    // return { name, description };
  }

  render () {
    const { style } = this.props;
    const { showEditWrapper } = this.state;
    const { name, description } = this.getRenderingTexts();
    const icon = this.getIcon();
    return (
      <Wrapper onClick={this.onClickItem} style={style}>
        <Container>
          <Icon src={icon} />
          <ContentWrapper>
            <Title>{name}</Title>
            <Description>{description}</Description>
          </ContentWrapper>
          <EditWrapper className={classNames({ show: showEditWrapper })}>
            <EditButtonWrapper className={classNames({ show: showEditWrapper })}>
              <EditButton onMouseEnter={this.showEditWrapper} onMouseLeave={this.hideEditWrapper} onClick={this.onEdit} />
            </EditButtonWrapper>
          </EditWrapper>
        </Container>
      </Wrapper>
    )
  }
};

const mapStateToProps = (state) => ({
  icons: state.icon.icons
});

export default connect(mapStateToProps)(ListItem);
