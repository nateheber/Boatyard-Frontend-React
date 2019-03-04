import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { get, isEmpty, findIndex, remove } from 'lodash';

import { SearchBox } from 'components/basic/Input';

import { GetServices, UpdateService } from 'store/actions/services';
import { refinedServicesSelector } from 'store/selectors/services';

const HeaderWrapper = styled.div`
  dispaly: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const SearchInput = styled(SearchBox)`
  display: inline-block;
  box-sizing: border-box;
  width: 253px;
  margin-right: 27px;
`;

const Tile = styled.div`
  display: inline-block;
  width: 280px;
  margin-right: 27px
  padding: 0 12px;
  margin-bottom: 20px;
  .tile-content {
    display: flex;
    background: #F8F8F8;
    align-items: center;
    padding: 20px 10px 20px 30px;
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

const SearchWrapper = styled.div`
  display: block;
  padding-right: 16px;
  width: 100%;
  max-height: 580px;
  overflow-y: scroll;
  margin-top: 24px;
`


class ServiceSelector extends React.Component {
  static getDerivedStateFromProps(props) {
    const { selected } = props;
    return { selected };
  }

  state = {
    keyword: '',
    selected: [],
  }

  componentDidMount() {
    const { provider, GetServices } = this.props;
    const providerId = get(provider, 'data.id');
    GetServices({ params: { 'service[provider_id]': providerId } });
  }

  onChangeKeyword = (keyword) => {
    this.setState({
      keyword,
    }, () => {
      this.loadPage(1);
    })
  }

  onSelect = service => () => {
    const { selected } = this.state;
    const result = selected.map(service => ({ ...service }));
    const idx = findIndex(result, item => item.id === service.id);
    if (idx >= 0) {
      remove(result, item => item.id === service.id);
    } else {
      result.push(service);
    }
    this.props.onChange(result);
  }

  loadPage = (page) => {
    const { keyword } = this.state;
    const { provider, GetServices } = this.props;
    const providerId = get(provider, 'data.id');
    const params = isEmpty(keyword) ? {
      page: page,
      per_page: 24,
      'service[provider_id]': providerId
    } : {
      page: page,
      per_page: 24,
      'service[provider_id]': providerId,
      search_by_name: keyword
    };
    GetServices({ params });
  };

  render() {
    const { services } = this.props;
    return (
      <HeaderWrapper>
        <SearchInput onChange={this.onChangeKeyword} placeholder="SEARCH" />
        <SearchWrapper>
          {
            services.map((item) => {
              const { id, name } = item;
              const defaultIcon = get(item, 'relationships.icon.attributes.icon.button3X.url');
              const customIcon = get(item, 'customIcon.button3X.url');
              return (
                <Tile key={`service_${id}`} onClick={this.onSelect(item)}>
                  <div className="tile-content" onClick={this.onGoToDetails}>
                    <img className="tile-image" src={customIcon || defaultIcon} alt={name} />
                    <p className="tile-name">{name}</p>
                  </div>
                </Tile>
              )
            })
          }
        </SearchWrapper>
      </HeaderWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  services: refinedServicesSelector(state),
  provider: state.provider.currentProvider,
  currentStatus: state.service.currentStatus,
  page: state.service.page,
  perPage: state.service.perPage,
  total: state.service.total,
});

const mapDispatchToProps = {
  GetServices,
  UpdateService,
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceSelector);
