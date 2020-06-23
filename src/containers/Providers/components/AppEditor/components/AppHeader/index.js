import React from 'react';
import styled from 'styled-components';

import { HollowButton, OrangeButton } from 'components/basic/Buttons';
import { Select } from 'components/basic/Input';
import Modal from 'components/compound/Modal';
import { toastr } from 'react-redux-toastr';
import { get } from 'lodash';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  height: 90px;
  padding: 22px 90px 22px 25px;
  border-bottom: 1px solid #E6E6E6;
`;

const HeaderWrapper = styled.div`
  display: flex;
  width: 600px;
  .templateDtropdown {
    margin-left: 20px;
  }

`;

const Header = styled.div`
  color: #003247;
  font-family: Helvetica;
  font-size: 32px;
  text-align: left;
  line-height: 28px;
  min-width: 190px;
  padding-top: 10px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

function getLocationName(location) {
  return get(location ,'relationships.locations.attributes.name');
}

export default class AppHeader extends React.Component {
  state = {
    open: false
  }

  onOpenModal = () => {
    const { selectedTemplate } = this.props;
    console.log("Selected temp~~~~~~~~~~", selectedTemplate);
    if (selectedTemplate.locationName === undefined) {
      toastr.error('Error', 'Select a template to copy');
    } else {
      this.setState({open: true});
    }
  }

  onClose = () => {
    this.setState({open: false});
  }

  clone = () => {
    this.props.onCloneButtonClick();
    this.onClose();
  }


  render () {
    const { open } = this.state;
    const { selected, selectedTemplate, locations, onSave, onChangePublishStatus, onChangeLocation, handleChangeTemplate } = this.props;
    const actions = [
      <HollowButton onClick={this.onClose} key="modal_btn_cancel">CANCEL</HollowButton>,
      <OrangeButton onClick={this.clone} key="modal_btn_save">Lets Clone This!</OrangeButton>
    ];
    console.log(selected, selectedTemplate);
    return (
      <Wrapper>
        <HeaderWrapper>
          <Header>Create App</Header>
          <div>
            <span>Location:</span>
          <Select
            value={selected.id}
            placeholder="Select a Location"
            onChange={evt => {if(onChangeLocation) { onChangeLocation(evt.target.value)}}}
          >
            <React.Fragment>
              <option value={null}>Select a location...</option>
              {locations.map(val => (
                <option value={val.id} key={`location_${val.id}`}>
                  {getLocationName(val)}
                </option>
              ))}
            </React.Fragment>
          </Select>
          </div>

          <div className="templateDtropdown">
            <span>Template:</span>
          <Select
            value={selectedTemplate.id}
            onChange={evt => {if(handleChangeTemplate) { handleChangeTemplate(evt.target.value)}}}
          >
            <React.Fragment>
            <option value={null}>Select a template...</option>
              {locations.map(val => (
                <option value={val.id} key={`location_${val.id}`}>
                  {getLocationName(val)}
                </option>
              ))}
            </React.Fragment>
          </Select>
          </div>
        </HeaderWrapper>
        <ButtonsWrapper>
        <OrangeButton
            style={{margin: 5}}
            className="thin-font"
            onClick={this.onOpenModal}
          >
            Clone Templates
          </OrangeButton>
          <HollowButton onClick={onSave}>
            {selected.published ? 'Save' : 'Save Draft'}
          </HollowButton>
          <OrangeButton
            style={{margin: 5}}
            className="thin-font"
            onClick={evt => onChangePublishStatus(!selected.published)}
          >
            {selected.published ? 'UNPUBLISH' : 'PUBLISH'}
          </OrangeButton>
        </ButtonsWrapper>
        <Modal
          title="Are You Sure?!?"
          open={open}
          onClose={this.onClose}
          actions={actions}
        >
          {`You are cloning ${selectedTemplate.locationName} into ${selected.locationName}. Are you sure this is what you want to do? No turning back!`}
          <br/>
          <br />
          {`Meaning you want ${selected.locationName} to be the exact same as ${selectedTemplate.locationName}. Is this what you want?`}
      </Modal>
      </Wrapper>
    );
  }
}
