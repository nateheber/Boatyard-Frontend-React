import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { get, filter } from 'lodash';

import { refinedServicesSelector } from 'store/selectors/services';
import { SearchBox } from 'components/basic/Input';
import LogoImage from '../../../../../../../../resources/boat_flag.png';

const HeaderWrapper = styled.div`
  dispaly: flex;
  flex: 1;
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

const Tile = styled.div`
  display: inline-block;
  width: 282px;
  margin: 0 12px 18px;
  .tile-content {
    height: 78px;
    display: flex;
    background: #F8F8F8;
    align-items: center;
    padding: 0 10px 0 30px;
    cursor: pointer;
    border-radius: 6px;
    &:hover {
      background: #EEE;
    }
    .tile-image {
      max-width: 40px;
      min-width: 40px;
      margin-right: 40px;
      max-height: 40px;  
    }
    .tile-name {
      font-family: Helvetica;
      font-size: 12px;
      color: #003247;
      text-transform: uppercase;
    }  
  }
`;

const ListWrapper = styled.div`
  display: block;
  width: 100%;
  max-height: 536px;
  overflow-y: scroll;
  margin-top: 13px;
`


class ServiceSelector extends React.Component {
  static getDerivedStateFromProps(props) {
    const { selected } = props;
    return { selected };
  }
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
      filteredServices: props.services
    };
  }

  onChangeKeyword = (keyword) => {
    const { services } = this.props;
    const refinedKeyword = (keyword || '').trim().toLowerCase();
    if (refinedKeyword.length > 0) {
      const filteredServices = filter(services, service => service.name.toLowerCase().includes(refinedKeyword));
      this.setState({ filteredServices });
    } else {
      this.setState({ filteredServices: services });
    }
  }

  onSelect = service => () => {
    const { id, name, categoryId, description, secondaryDescription, cost, costType, subtitle, iconId, customIcon } = service;
    const defaultIcon = get(service, 'relationships.icon.attributes.icon.url');
    this.props.onAdd({
      serviceId: id,
      categoryId,
      name,
      subtitle,
      description,
      secondaryDescription,
      iconId,
      defaultIcon,
      customIcon: customIcon.url,
      cost,
      costType,
    });
  }

  render() {
    const { filteredServices } = this.state;
    return (
      <HeaderWrapper>
        <SearchWrapper>
          <SearchInput onChange={this.onChangeKeyword} placeholder="SEARCH" />
        </SearchWrapper>
        <ListWrapper>
          {
            filteredServices.map((item) => {
              const { id, name } = item;
              const defaultIcon = get(item, 'relationships.icon.attributes.icon.url');
              const customIcon = get(item, 'customIcon.url');
              return (
                <Tile key={`service_${id}`} onClick={this.onSelect(item)}>
                  <div className="tile-content" onClick={this.onGoToDetails}>
                    <img className="tile-image" src={defaultIcon || customIcon || LogoImage} alt={name} />
                    <p className="tile-name">{name}</p>
                  </div>
                </Tile>
              )
            })
          }
        </ListWrapper>
      </HeaderWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  services: refinedServicesSelector(state)
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceSelector);
