import React from 'react';
import styled from 'styled-components';
import { filter, orderBy } from 'lodash';
import { Input } from 'components/basic/Input';
import LocationCheck from 'containers/Teams/components/LocationCheck';

const FitlerWrapper = styled.div`
  padding: 20px 30px 0;
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
  z-index: 100;
  position: absolute;
  font-family: 'Source Sans Pro', sans-serif;
  border: 1px solid #eaeaea;
  background-color: white;
  position: absolute;
  width: 304px;
  padding: 0;
  right: 0;
  top: 32px;
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
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.state = {
      keyword: '',
    }
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  onChangeFilter = (evt) => {
    this.setState({ keyword: evt.target.value });
  };

  setWrapperRef = (node) => {
    this.wrapperRef = node;
  }


  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.onClose();
    }
  }

  render() {
    const { keyword } = this.state;
    let { locations, selected } = this.props;
    if ( keyword ) {
        locations = filter(locations, l => l.locationName.toLowerCase().indexOf(keyword.toLowerCase()) > -1);
    }
    locations = orderBy(locations, ['name'], ['asc']);
    console.log(locations);
    return (
        <DropdownMenu ref={this.setWrapperRef}>
          <FitlerWrapper>
            <WrapperTitle>Choose Locations</WrapperTitle>
            <Input type="text" value={keyword} onChange={this.onChangeFilter} />
          </FitlerWrapper>
          <Scroller>
            {
              locations.map(location => (
                <MenuItemLi key={`location-${location.providerLocationId}`} >
                  <LocationCheck 
                    checked={selected === location.providerLocationId} 
                    title={location.locationName} 
                    onClick={() => selected !== location.providerLocationId && this.props.onChangeSelection(location)} />
                </MenuItemLi>
              ))
            }
          </Scroller>
        </DropdownMenu>      
    );
  }
}

export default LocationSelector;