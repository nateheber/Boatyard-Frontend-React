import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Col, Row } from 'react-flexbox-grid';
import { filter } from 'lodash';
import { toastr } from 'react-redux-toastr';

import { actionTypes as categoryActions, GetCategories } from 'store/actions/categories';
import { actionTypes as serviceActions, CreateService, GetAllServices } from 'store/actions/services';
import { refinedCategoriesSelector } from 'store/selectors/categories';
import { refinedAllServicesSelector } from 'store/selectors/services';
import Table from 'components/basic/Table';
import { PageTitle } from 'components/basic/Typho';
import { SectionHeaderWrapper, LeftPart, RightPart } from 'components/basic/Header';
import { OrangeButton } from 'components/basic/Buttons';
import { SearchBox } from 'components/basic/Input';
import AddServiceModal from '../components/AddServiceModal';
import AddLocationServiceModal from '../components/AddLocationServiceModal';

const Wrapper = styled.div`
  height: 100%;
  background-color: white;
`;

const SearchSection = styled(Row)`
  border-top: 1px solid #D5DBDE;
  border-bottom: 1px solid #D5DBDE;
  margin: 0 0 20px 0 !important;
`;

const SearchCotainer = styled(Col)`
  padding: 24px 20px;
  width: 305px;
`;

class AddService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleOfServiceModal: false,
      keyword: '',
      filtered: []
    };
  }

  componentDidMount() {
    this.loadPage(1);
  }

  loadPage = (page) => {
    const { providerLocationId, GetCategories, GetAllServices } = this.props;
    if (providerLocationId) {
      GetAllServices({
        params: {
          page: 1,
          per_page: 1000,
          'service[order]': 'name',
          'service[sort]': 'asc'  
        },
        success: () => {
          this.handleInputChange('');
        },
        error: (e) => {
          toastr.error('Error', e.message);
        }
      });
    } else {
      GetCategories({
        params: {
          page: page,
          per_page: 1000,    
          'category[order]': 'name',
          'category[sort]': 'asc'  
        },
        success: () => {
          this.handleInputChange('');
        },
        error: (e) => {
          toastr.error('Error', e.message);
        }
      });
    }
  };

  toDetails = selectedItem => {
    this.setState({ selectedItem }, () => {
      this.showAddServiceModal();
    });
  };

  showAddServiceModal = () => {
    this.setState({ visibleOfServiceModal: true });
  };

  hideAddServiceModal = () => {
    this.setState({ visibleOfServiceModal: false });
  }

  goToServices = () => {
    this.props.history.push(`/services`);
  }

  handleInputChange = (keyword) => {
    const { providerLocationId, services, categories } = this.props;
    const trimmedKeyword = (keyword || '').trim();
    this.setState({ keyword: trimmedKeyword }, () => {
      if (trimmedKeyword.trim().length === 0) {
        this.setState({ filtered: providerLocationId ? services : categories });
      } else {
        if (providerLocationId) {
          const filtered = filter(services, service => service.name.toLowerCase().indexOf(trimmedKeyword.toLowerCase()) > -1);
          this.setState({ filtered });
        } else {
          const filtered = filter(categories, category => category.name.toLowerCase().indexOf(trimmedKeyword.toLowerCase()) > -1);
          this.setState({ filtered });
        }
      }
    });
  }

  createService = (values) => {
    const { CreateService, providerLocationId } = this.props;
    const data = providerLocationId ? { provider_location_service: values } : { service: values };
    console.log(data);
    CreateService({ 
      data,
      success: () => {
        this.hideAddServiceModal();
      }
    });
  };

  render() {
    const columns = [
      { label: 'serivce name', value: 'name' },
    ];
    const { visibleOfServiceModal, selectedItem, filtered } = this.state;
    const { categoryStatus, serviceStatus, providerLocationId } = this.props;
    return (
      <Wrapper>
        <SectionHeaderWrapper>
          <LeftPart>
            <PageTitle>Services</PageTitle>
          </LeftPart>
          <RightPart>
            <OrangeButton className="desktop" onClick={this.goToServices}>
              My Services
            </OrangeButton>
          </RightPart>
        </SectionHeaderWrapper>
        <SearchSection>
          <SearchCotainer>
            <SearchBox placeholder="SEARCH SERVICES" onChange={this.handleInputChange} />
          </SearchCotainer>
        </SearchSection>
        <Table
          loading={categoryStatus === categoryActions.GET_CATEGORIES}
          type={'tile'}
          columns={columns}
          records={filtered}
          toDetails={this.toDetails}
        />
        {visibleOfServiceModal &&
          <React.Fragment>
            {providerLocationId ?
              <AddLocationServiceModal
                loading={serviceStatus === serviceActions.CREATE_SERVICE}
                open={visibleOfServiceModal}
                service={selectedItem}
                onClose={this.hideAddServiceModal}
                onSave={this.createService}
              />
            :
              <AddServiceModal
                loading={serviceStatus === serviceActions.CREATE_SERVICE}
                open={visibleOfServiceModal}
                category={selectedItem}
                onClose={this.hideAddServiceModal}
                onSave={this.createService}
              />
            }
          </React.Fragment>
        }
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: refinedCategoriesSelector(state, ''),
  providerLocationId: state.auth.providerLocationId,
  services: refinedAllServicesSelector(state),
  categoryStatus: state.category.currentStatus,
  serviceStatus: state.service.currentStatus,
  page: state.category.page,
  perPage: state.category.perPage,
  total: state.category.total
});

const mapDispatchToProps = {
  GetCategories,
  GetAllServices,
  CreateService
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddService)
);
