import React from 'react';
import styled from 'styled-components';
import { get } from 'lodash';
import classNames from 'classnames';

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

export default class ServiceItem extends React.Component {
  state = {
    showEditWrapper: false
  }

  showEditWrapper = () => {
    this.setState({ showEditWrapper: true });
  }

  hideEditWrapper = () => {
    this.setState({ showEditWrapper: false });
  }

  onSetTemplate = () => {
    console.log('toTemplate');
  }

  onEdit = (evt) => {
    evt.stopPropagation();
    const { service, onEdit } = this.props;
    onEdit(service);
  }

  render () {
    const { service, style } = this.props;
    const { showEditWrapper } = this.state;
    const { name, description } = service;
    const defaultIcon = get(service, 'defaultIcon');
    const customIcon = get(service, 'customIcon');
    return (
      <Wrapper onClick={this.onSetTemplate} style={style}>
        <Container>
          <Icon src={defaultIcon||customIcon} />
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