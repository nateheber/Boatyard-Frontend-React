import React from 'react';
import styled from 'styled-components';
import { isEmpty } from 'lodash';
import classNames from 'classnames';

import { HollowButton } from 'components/basic/Buttons';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const ControlPart = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 11px;
`;

const FieldName = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-size: 14px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #003247;
`;

const PreviewWrapper = styled.div`
  width: 382px;
  height: 143.6px;
  &.empty {
    border: 1px solid #dfdfdf;
  }
`

const PreviewImage = styled.img`
  width: 382px;
  height: 143.6px;
  object-fit: cover;
`

export default class LocationImage extends React.Component {
  handleChange = event => {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.props.onChange(reader.result);
    }
    reader.readAsDataURL(event.target.files[0]);
  };

  setFileRef = ref => {
    this.fileInput = ref;
  }

  uploadImage = () => {
    this.fileInput.click();
  }

  render () {
    const { image } = this.props;
    return (
      <Wrapper>
        <ControlPart>
          <FieldName>Location Image</FieldName>
          <HollowButton className="thin-font" onClick={this.uploadImage}>Upload Image</HollowButton>
        </ControlPart>
        <PreviewWrapper className={classNames({ empty: isEmpty(image) })}>
          {!isEmpty(image) && <PreviewImage src={image} alt="preview_image" />}
        </PreviewWrapper>
        <input
          ref={this.setFileRef}
          type="file"
          style={{ display: 'none' }}
          onChange={this.handleChange}
          key={isEmpty(image)}
        />
      </Wrapper>
    )
  }
}