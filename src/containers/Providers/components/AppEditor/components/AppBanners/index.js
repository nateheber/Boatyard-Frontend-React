import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { GetSiteBanners, CreateSiteBanner } from 'store/actions/site-banners';
import { UploadButton } from 'components/basic/Buttons';
// import { SearchBox } from 'components/basic/Input';
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

// const SearchWrapper = styled.div`
//   display: inline-block;
//   box-sizing: border-box;
//   width: 282px;
//   margin: 10px;
// `;

// const SearchInput = styled(SearchBox)`
//   display: inline-block;
//   box-sizing: border-box;
//   width: 282px;
// `;

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

class AppBanners extends React.Component {
  delayTimer = null;

  handleFileChange = (file, baseString, ref) => {
    const { GetSiteBanners, CreateSiteBanner, onChangeBanner } = this.props;
    if (file) {
      CreateSiteBanner({
        data: {
          site_banner: {
            name: file.name,
            banner: baseString
          }
        },
        success: (banner) => {
          onChangeBanner(banner);
          GetSiteBanners({ params: { per_page: 1000 }});
        }
      })  ;
    }
  };

  onChangeKeyword = (keyword) => {
    if (this.delayTimer) clearTimeout(this.delayTimer);
    this.delayTimer = setTimeout(function() {
        // Do the ajax stuff
        console.log('-------search--------', keyword);
    }, 500);
  };

  handleChangeBanner = (banner) => () => {
    const { onChangeBanner } = this.props;
    onChangeBanner(banner);
  };

  render() {
    const { banners } = this.props;
    return (
      <SelectorWrapper>
        <Wrapper>
          <HeaderWrapper>
            {/* <SearchWrapper>
              <SearchInput placeholder="SEARCH" onChange={this.onChangeKeyword} />
            </SearchWrapper> */}
            <UploadButton style={{ marginLeft: 10 }} title="Upload Image" accept="image/*" onFileChange={this.handleFileChange} />
          </HeaderWrapper>
          <ImageWrapper>
            {
              banners.map(banner => (
                <Image src={banner.banner.url} key={`image_${banner.id}`} onClick={this.handleChangeBanner(banner)} />
              ))
            }
          </ImageWrapper>
        </Wrapper>
      </SelectorWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  currentProvider: state.provider.currentProvider,
  banners: state.siteBanner.banners
});

const mapDispatchToProps = {
  GetSiteBanners,
  CreateSiteBanner
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBanners);
