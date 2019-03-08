import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { get, isEmpty } from 'lodash';

import { SearchBox } from 'components/basic/Input';

import { GetServices, CreateService, UpdateService } from 'store/actions/services';
import { GetCategories } from 'store/actions/categories';
import { refinedCategoriesSelector } from 'store/selectors/categories';

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

  state = {
    keyword: '',
    selected: [],
  }

  componentDidMount() {
    // const { provider, GetCategories } = this.props;
    // const providerId = get(provider, 'id');
    this.loadCategories();
  }

  loadCategories() {
    const { GetCategories } = this.props;
    const { keyword } = this.state;
    const params = isEmpty(keyword) ? {
      per_page: 1000,
      'category[discarded_at]': null
    } : {
      per_page: 1000,
      'category[discarded_at]': null,
      search_by_name: keyword
    };
    GetCategories({ params });

  }

  onChangeKeyword = (keyword) => {
    this.setState({
      keyword,
    }, () => {
      this.loadCategories();
    })
  }

  onSelect = category => () => {
    this.props.onAdd(category);
  }

  loadPage = (page) => {
    const { keyword } = this.state;
    const { provider, GetServices } = this.props;
    const providerId = get(provider, 'id');
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
    const { categories } = this.props;
    return (
      <HeaderWrapper>
        <SearchWrapper>
          <SearchInput onChange={this.onChangeKeyword} placeholder="SEARCH" />
        </SearchWrapper>
        <ListWrapper>
          {
            categories.map((item) => {
              const { id, name } = item;
              const defaultIcon = get(item, 'relationships.icon.attributes.icon.url');
              const customIcon = get(item, 'customIcon.url');
              return (
                <Tile key={`service_${id}`} onClick={this.onSelect(item)}>
                  <div className="tile-content" onClick={this.onGoToDetails}>
                    <img className="tile-image" src={defaultIcon || customIcon} alt={name} />
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
  categories: refinedCategoriesSelector(state, ''),
  provider: state.provider.currentProvider,
  currentStatus: state.service.currentStatus,
  page: state.service.page,
  perPage: state.service.perPage,
  total: state.service.total,
});

const mapDispatchToProps = {
  GetServices,
  CreateService,
  UpdateService,
  GetCategories
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceSelector);
