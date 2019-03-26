import React from 'react';
import styled from 'styled-components';

import { HollowButton, OrangeButton } from 'components/basic/Buttons';
import { Select } from 'components/basic/Input';
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
  width: 400px;

`;

const Header = styled.div`
  color: #003247;
  font-family: Helvetica;
  font-size: 32px;
  text-align: left;
  line-height: 28px;
  min-width: 190px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

function getLocationName(location) {
  return get(location ,'relationships.locations.attributes.name');
}

export default ({ selected, locations, onSave, onChangePublishStatus, onChangeLocation }) => (
  <Wrapper>
    <HeaderWrapper>
      <Header>Create App</Header>
      <Select
        value={selected.id}
        onChange={evt => {if(onChangeLocation) { onChangeLocation(evt.target.value)}}}
      >
        <React.Fragment>
          {locations.map(val => (
            <option value={val.id} key={`location_${val.id}`}>
              {getLocationName(val)}
            </option>
          ))}
        </React.Fragment>
      </Select>
    </HeaderWrapper>
    <ButtonsWrapper>
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
  </Wrapper>
)