import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import EvilIcon from 'react-evil-icons';
import { toastr } from 'react-redux-toastr';

import { GetSiteBanners, CreateSiteBanner, DeleteSiteBanner } from 'store/actions/site-banners';
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

const ImageList = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  max-height: 536px;
  overflow-y: scroll;
  margin-top: 13px;
`;

const BannerWrapper = styled.div`
  position: relative;
  width: 282px;
  height: 80px;
  margin: 0 12px 18px;
  .overlay {
    transition: all ease-in-out .2s;
    opacity: 0;
  }
  .btn-close {
    transition: all ease-in-out .2s;
    opacity: 0;
    .close-icon {
      fill: white;
    }
  }
  &:hover {
    .overlay {
      opacity: 1;
    }
    .btn-close {
      opacity: 1;
      .close-icon {
        fill: white;
      }
    }
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const DeleteButton = styled.button`
  background: no-repeat;
  border: none;
  padding: 0;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  outline: none;
`;

const Image = styled.div`
  display: inline-block;
  width: 100%;
  height: 80px;
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
        },
        error: (e) => {
          toastr.error('Error', e.message);
        }
      });
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

  handleDelete = (bannerId) => () => {
    const { GetSiteBanners, DeleteSiteBanner, onChangeBanner } = this.props;
    DeleteSiteBanner({
      bannerId,
      success: () => {
        GetSiteBanners({
          params: { per_page: 1000 },
          success: () => {
            const { banners } = this.props;
            if (banners.length > 0) {
              onChangeBanner(banners[0], bannerId);
            }
          },
          error: (e) => {
            toastr.error('Error', e.message);
          }
        });
      },
      error: (e) => {
        toastr.error('Error', e.message);
      }
    });
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
            <UploadButton style={{ marginLeft: 10 }} title="Upload Image" accept="image/*" onChange={this.handleFileChange} />
          </HeaderWrapper>
          <ImageList>
            {
              banners.map(banner => (
                <BannerWrapper>
                  <Image src={banner.banner.url} key={`image_${banner.id}`} onClick={this.handleChangeBanner(banner)} />
                  <Overlay className="overlay" />
                  <DeleteButton className="btn-close" onClick={this.handleDelete(banner.id)}>
                    <EvilIcon name="ei-close-o" size="s" className="close-icon" />
                  </DeleteButton>
                </BannerWrapper>
              ))
            }
          </ImageList>
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
  CreateSiteBanner,
  DeleteSiteBanner
};

export default connect(mapStateToProps, mapDispatchToProps)(AppBanners);
