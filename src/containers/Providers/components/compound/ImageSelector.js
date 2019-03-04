import React from 'react';
import styled from 'styled-components';

import { SearchBox } from 'components/basic/Input';
import { HollowButton } from 'components/basic/Buttons';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  dispaly: flex;
  flex-direction: row;
  align-items: center;
`;

const SearchInput = styled(SearchBox)`
  display: inline-block;
  box-sizing: border-box;
  width: 253px;
  margin-right: 27px;
`;

const UploadButton = styled(HollowButton)`
  width: 144px;
  margin-left: 27px;
`;

const ImageWrapper = styled.div`
  display: block;
  padding-right: 16px;
  max-height: 580px;
  overflow-y: scroll;
  margin-top: 24px;
`;

const Image = styled.div`
  display: inline-block;
  width: 282px;
  margin-right: 24px;
  margin-bottom: 20px;
  height: 80px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
  border-radius: 6px;
  cursor: pointer;
`;

export default class ImageSelector extends React.Component {
  onSelectImage = image => () => {
    this.props.onSelectImage(image);
  }

  render() {
    const { imageList } = this.props;
    return (
      <Wrapper>
        <HeaderWrapper>
          <SearchInput placeholder="SEARCH" />
          <UploadButton>Upload Image</UploadButton>
        </HeaderWrapper>
        <ImageWrapper>
          {
            imageList.map((image, idx) => (
              <Image src={image.src} key={`image_${idx}`} onClick={this.onSelectImage(image)} />
            ))
          }
        </ImageWrapper>
      </Wrapper>
    )
  }
}