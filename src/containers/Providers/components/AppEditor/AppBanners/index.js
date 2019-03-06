import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import ImageSelector from './ImageSelector';
import {
  PhonePreview, PhoneBanner,
  ContentWrapper, SelectorWrapper, PreviewWrapper,
} from '../../basic';

import Image1 from 'resources/test_images/1.png';
import Image2 from 'resources/test_images/2.png';
import Image3 from 'resources/test_images/3.png';
import Image4 from 'resources/test_images/4.png';
import Image5 from 'resources/test_images/5.png';
import Image6 from 'resources/test_images/6.jpeg';

const imageList = [
  { title: 'Header 1', src: Image1 },
  { title: 'Header 2', src: Image2 },
  { title: 'Header 3', src: Image3 },
  { title: 'Header 4', src: Image4 },
  { title: 'Header 5', src: Image5 },
  { title: 'Header 6', src: Image6 },
];

class AppBanners extends React.Component {
  state = {
    image: imageList[0]
  }

  componentDidMount() {
    const { image } = this.state;
    this.props.onChangeImage(image);
  }

  onSelectImage = (image) => {
    this.setState({ image });
  }

  getProviderName = () => {
    const { currentProvider } = this.props;
    return get(currentProvider, 'data.attributes.name', '');
  }

  render() {
    const { image } = this.state;
    const providerName = this.getProviderName();
    return (
      <ContentWrapper>
        <SelectorWrapper>
          <ImageSelector imageList={imageList} onSelectImage={this.onSelectImage} />
        </SelectorWrapper>
        <PreviewWrapper>
          <PhonePreview>
            <PhoneBanner image={image} providerName={providerName} />
          </PhonePreview>
        </PreviewWrapper>
      </ContentWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  currentProvider: state.provider.currentProvider,
});

export default connect(mapStateToProps)(AppBanners);
