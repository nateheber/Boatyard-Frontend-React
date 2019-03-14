import React from 'react';
import styled from 'styled-components';

import { SearchBox } from 'components/basic/Input';
import { UploadButton } from 'components/basic/Buttons';

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

const ImageWrapper = styled.div`
  display: block;
  max-height: 536px;
  overflow-y: scroll;
  margin-top: 13px;
`;

const Image = styled.div`
  display: inline-block;
  width: 282px;
  height: 80px;
  margin: 0 12px 14px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
  border-radius: 6px;
  cursor: pointer;
`;

export default class ImageSelector extends React.Component {
  delayTimer = null;
  onSelectImage = image => () => {
    this.props.onSelectImage(image);
  };

  handleFileChange = (file, baseString, ref) => {
    console.log('------------------file----------', file);
    // this.setState({ defaultIcon: null, iconFile: file, iconRef: ref, customIcon: baseString });
    // this.refs.selectedIconContainer.style.backgroundImage = `url(${baseString})`;
  };

  onChangeKeyword = (keyword) => {
    if (this.delayTimer) clearTimeout(this.delayTimer);
    this.delayTimer = setTimeout(function() {
        // Do the ajax stuff
        console.log('-------search--------', keyword);
    }, 500);
  };

  render() {
    const { imageList } = this.props;
    return (
      <Wrapper>
        <HeaderWrapper>
          <SearchWrapper>
            <SearchInput placeholder="SEARCH" onChange={this.onChangeKeyword} />
          </SearchWrapper>
          <UploadButton style={{ marginLeft: 17 }} title="Upload Image" accept="image/*" onFileChange={this.handleFileChange} />
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