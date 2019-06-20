import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import styled from 'styled-components';
import { get, findIndex, sortBy, orderBy } from 'lodash';
import deepEqual from 'deep-equal';

import { GetProviderLocations } from 'store/actions/providerLocations';
import { refinedProviderLocationSelector } from 'store/selectors/providerLocation';

import { Input } from 'components/basic/Input';
import { GradientButton } from 'components/basic/Buttons';
import LocationCheck from '../LocationCheck';
import ConfirmModal from '../ConfirmModal';

import AddIcon from '../../../../resources/job/add.png';

const Wrapper = styled.div`
  position: relative;
  background-color: white;
`;

const FitlerWrapper = styled.div`
  padding: 20px 30px 0;
`;

const Image = styled.img`
  width: 11px;
`;

const WrapperTitle = styled.div`
  color: #184961;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
  line-height: 18px;
  font-weight: 600;
  text-transform: capitalize;
  margin-bottom: 10px;
`;

const Scroller = styled.div`
  height: 308px;
  padding: 10px 30px 20px;
  overflow-y: scroll;
`;

const DropdownMenu = styled.div`
  &.show {
    display: block;
  }
  z-index: 100;
  position: absolute;
  font-family: 'Source Sans Pro', sans-serif;
  display: none;
  border: 1px solid #eaeaea;
  background-color: white;
  position: absolute;
  width: 304px;
  padding: 0;
  right: 0;
  &::before {
    height: 100%;
    display: block;
    width: 5px;
    background: rgba(151, 151, 151, 0.2);
    content: '';
    bottom: -6px;
    right: -5px;
    position: absolute;
  }
  &::after {
    height: 5px;
    display: block;
    width: 100.5%;
    background: rgba(151, 151, 151, 0.2);
    content: '';
    bottom: -6px;
    left: -1px;
    position: absolute;
  }
  margin-top: 8px;
`;

const MenuItemLi = styled.div`
  padding: 5px 0;
`;

class LocationSelector extends React.Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      keyword: '',
      showMenu: false,
      showModal: false,
      locations: [],
      currentLocations: [],
      filteredLocations: []
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    const { providerId, GetProviderLocations } = this.props;
    GetProviderLocations({
      providerId,
      params: { page: 1, per_page: 100 },
      error: (e) => {
        toastr.error('Error', e.message);
      }
    });
    this.setLocations();
  }

  componentDidUpdate(prevProps) {
    if (!deepEqual(this.props.locations, prevProps.locations)) {
      this.setLocations();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  onChangeFilter = (evt) => {
    this.setState({ keyword: evt.target.value }, () => {
      this.filterLocations();
    });
  };

  setLocations = () => {
    const { providerLocations } = this.props;
    const locations = orderBy(providerLocations, [function(o){ return o.relationships.locations.attributes.name.toLowerCase(); }], ['asc']);
    this.setState({ locations }, () => {
      this.filterLocations();
    });
  }

  onChangeSelection = (location) => {
    const { currentLocations } = this.state;
    const idx = findIndex(currentLocations, item => `${item.id}` === `${location.id}`);
    let result = [];
    if (idx >= 0) {
      result = [...currentLocations.slice(0, idx), ...currentLocations.slice(idx + 1)];
    } else {
      result = [...currentLocations, location];
    }
    this.setState({ currentLocations: result });
  };

  showMenu = () => {
    this.setState({ showMenu: true });
  };

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  filterLocations = () => {
    const { keyword, locations } = this.state;
    let filteredLocations = locations.slice(0);
    if (keyword && keyword.trim().length > 0) {
      filteredLocations = locations.filter(location => get(location, 'relationships.locations.attributes.name', '').toLowerCase().indexOf(keyword.trim().toLowerCase()) > -1);
    }
    this.setState({ filteredLocations });
  };

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      if (this.state.showMenu) {
        this.showModal();
      }
      this.setState({
        showMenu: false
      });
    }
  }

  showModal = () => {
    const { currentLocations } = this.state;
    const { dispatchIds } = this.props;
    const originalArray = sortBy(dispatchIds);
    const targetArray = sortBy(currentLocations.map(provider => provider.id));
    if (!deepEqual(originalArray, targetArray)) {
      this.setState({ showModal: true });
    }
  };

  closeModal = () => {
    this.setState({ currentLocations: [], showModal: false });
  };

  submitData = () => {
    const { currentLocations } = this.state;
    this.props.onChange(currentLocations);
    this.setState({ showModal: false, currentLocations: [] });
  };

  isChecked = (provider) => {
    const { currentLocations } = this.state;
    const idx= findIndex(currentLocations, item => `${provider.id}` === `${item.id}`);
    return idx >= 0;
  };

  filterShowingLocations = () => {
    const { filteredLocations, currentLocations } = this.state;
    const result = filteredLocations.filter((location) => {
      const idx = currentLocations.findIndex(item => `${item.id}` === `${location.id}`);
      return idx === -1;
    });
    return result;
  };

  checkedAll = () => {
    const { locations, currentLocations } = this.state;
    if (locations.length > 0 && locations.length === currentLocations.length) {
      return true
    }
    return false;
  };

  onChangeAll = () => {
    const { locations, currentLocations } = this.state;
    if (currentLocations.length < locations.length) {
      this.setState({ currentLocations: locations.slice(0)});
    } else {
      this.setState({ currentLocations: [] });
    }
  };

  render() {
    const { showMenu, showModal, keyword, currentLocations, filteredLocations } = this.state;
    // const filteredLocations = this.filterShowingLocations();
    return (
      <Wrapper ref={this.setWrapperRef}>
        <GradientButton onClick={this.showMenu}>
          <Image src={AddIcon} />
        </GradientButton>
        <DropdownMenu className={showMenu ? 'show' : 'hide'}>
          <FitlerWrapper>
            <WrapperTitle>Choose Locations</WrapperTitle>
            <Input type="text" value={keyword} onChange={this.onChangeFilter} />
          </FitlerWrapper>
          <Scroller>
            <MenuItemLi>
              {keyword.trim().length === 0 && <LocationCheck checked={this.checkedAll()} title={'All'} onClick={this.onChangeAll} />}
            </MenuItemLi>
            {
              filteredLocations.map(( location, idx ) => (
                <MenuItemLi key={`location)${location.id}`} >
                  <LocationCheck checked={this.isChecked(location)} title={get(location, 'relationships.locations.attributes.name')} onClick={() => this.onChangeSelection(location)} />
                </MenuItemLi>
              ))
            }
            {/* {
              currentLocations.map(( location, idx ) => (
                <MenuItemLi key={`location)${location.id}`} >
                  <LocationCheck checked={this.isChecked(location)} title={get(location, 'relationships.locations.attributes.name')} onClick={() => this.onChangeSelection(location)} />
                </MenuItemLi>
              ))
            }
            {
              filteredLocations.map((location, idx) => (
                <MenuItemLi key={`location_${location.id}`} >
                  <LocationCheck checked={this.isChecked(location)} title={get(location, 'relationships.locations.attributes.name')} onClick={() => this.onChangeSelection(location)} />
                </MenuItemLi>
              ))
            } */}
          </Scroller>
        </DropdownMenu>
        <ConfirmModal open={showModal} onClose={this.closeModal} onConfirm={this.submitData} locations={currentLocations} />
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  providerId: state.auth.providerId,
  ...refinedProviderLocationSelector(state),
});

const mapDispatchToProps = {
  GetProviderLocations
};

export default connect(mapStateToProps, mapDispatchToProps)(LocationSelector);