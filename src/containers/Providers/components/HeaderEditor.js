import React from 'react';

import { Row, Col } from 'react-flexbox-grid';

import {
  InputWrapper,
  InputLabel,
  ImageUploader,
  ImageSelector
} from 'components/basic/Input';
import { OrangeButton, HollowButton } from 'components/basic/Buttons';
import { EditorSection } from 'components/compound/SubSections';

import { HomeImagePreview } from './HomeImagePreview';
import { BannerImagePreview } from './BannerImagePreview';

export class HeaderEditor extends React.Component {
  constructor(props) {
    super(props);
    const { banner, homeImage, customImage, icon } = props;
    this.state = {
      banner: banner.url,
      homeImage: homeImage.url,
      customImage: customImage.url,
      icon: icon.url,
      homeImages: homeImage.url ? [homeImage.url] : []
    };
  }
  onChangeField = (field, val) => {
    const updateObj = {};
    updateObj[field] = val;
    this.setState(updateObj);
    if (field === 'homeImage') {
      const { homeImages } = this.state;
      this.setState({
        homeImages: [...homeImages, val]
      });
    }
  };
  save = () => {
    const { banner, homeImage, customImage, icon } = this.state;
    this.props.save({ banner, homeImage, customImage, icon });
  };
  removeBanner = () => {
    this.setState({
      banner: null
    });
  };
  renderFields = () => {
    const { homeImages, homeImage, banner } = this.state;
    const { name } = this.props;
    console.log(homeImages);
    return (
      <React.Fragment>
        <Row>
          <Col xs={12} md={6}>
            <InputWrapper className="secondary">
              <InputLabel>Choose Home Image</InputLabel>
              <ImageSelector images={homeImages} />
              <ImageUploader
                title="UPLOAD HOME IMAGE"
                onChange={val => this.onChangeField('homeImage', val)}
              />
              <ImageUploader
                title="UPLOAD CUSTOME HEADER IMAGE"
                onChange={val => this.onChangeField('banner', val)}
              />
            </InputWrapper>
          </Col>
          <Col xs={12} md={5} mdOffset={1}>
            <InputWrapper className="secondary">
              <InputLabel>Home Image Preview (1500px x 1182px)</InputLabel>
              <HomeImagePreview image={homeImage} title={name} />
              <InputLabel>Banner Image Preview (1500px x 473px)</InputLabel>
              <BannerImagePreview image={banner} onClick={this.removeBanner} />
            </InputWrapper>
          </Col>
        </Row>
      </React.Fragment>
    );
  };
  renderActions = () => {
    const { next } = this.props;
    return (
      <React.Fragment>
        <HollowButton onClick={this.save}>SAVE</HollowButton>
        <OrangeButton onClick={next}>NEXT</OrangeButton>
      </React.Fragment>
    );
  };
  render() {
    return (
      <EditorSection
        content={this.renderFields()}
        actions={this.renderActions()}
      />
    );
  }
}
