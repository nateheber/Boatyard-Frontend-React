import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Col, Row } from 'react-flexbox-grid';
import { withRouter } from 'react-router-dom';
import { get, isEmpty } from 'lodash';
import { toastr } from 'react-redux-toastr';
import Modal from 'components/compound/Modal';

import { actionTypes, GetServices, UpdateService, DeleteService } from 'store/actions/services';
import Table from 'components/basic/Table';
import { NormalText } from 'components/basic/Typho';
import { OrangeButton, HollowButton } from 'components/basic/Buttons';
import { ServiceHeader } from 'components/compound/SectionHeader';
import EditServiceModal from '../components/EditServiceModal';
import EditLocationServiceModal from '../components/EditLocationServiceModal';
import { SearchBox } from 'components/basic/Input';

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

export const Description = styled(NormalText)`
  font-family: 'Open sans-serif', sans-serif;
  padding: 10px 0;
`;

class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      sort: { col: 'name', direction: 'asc' },
      visibleOfEditServiceModal: false,
      visibleOfConfirmationModal: false,
      selectedService: {}
    };
  }

  componentDidMount() {
    this.loadPage(1);
  }

  loadPage = (page) => {
    const { keyword } = this.state;
    const { GetServices } = this.props;
    const { sort } = this.state;
    const params = isEmpty(keyword) ? {
      page: page,
      all: true,
      'service[discarded_at]': null,
      'service[sort]': sort.direction,
      'service[order]': sort.col
    } : {
      page: page,
      all: true,
      'service[discarded_at]': null,
      'service[sort]': sort.direction,
      'service[order]': sort.col,
      search_by_name: keyword
    };
    GetServices({ params });
  };

  onSortChange = (sort) => {
    this.setState({ sort: sort }, () => {
      this.loadPage(1);
    });
  }

  handleInputChange = (keyword) => {
    this.setState({ keyword }, () => {
      this.loadPage(1);
    });
  }

  toDetails = service => {
    this.setState({ selectedService: service }, () => {
      // this.props.history.push(`/service-details/?service=${service.id}`);
      this.showEditModal();
    })
  };

  createService = () => {
    this.props.history.push(`/services/new`);
  };

  showEditModal = () => {
    this.setState({ visibleOfEditServiceModal: true });
  }

  hideEditModal = () => {
    this.setState({ visibleOfEditServiceModal: false });
  }

  deleteService = () => {
    const { selectedService } = this.state;
    const { page, DeleteService } = this.props;
    this.hideConfirmationModal();
    DeleteService({
      serviceId: get(selectedService, 'id'),
      success: () => {
        this.hideEditModal();
        this.loadPage(page);
      },
      error: (e) => {
        toastr.error('Error', e.message);
      }
    });
  }

  updateService = (values) => {
    const { selectedService } = this.state;
    const { page, UpdateService, providerLocationId } = this.props;
    const data = providerLocationId ? { provider_location_service: values } : values;
    UpdateService({
      serviceId: get(selectedService, 'id'),
      data,
      success: () => {
        this.hideEditModal();
        this.loadPage(page);
      },
      error: (e) => {
        toastr.error('Error', e.message);
      }
    });
  };

  showConfirmationModal = () => {
    this.setState({
      visibleOfConfirmationModal: true
    });
  };

  hideConfirmationModal = () => {
    this.setState({
      visibleOfConfirmationModal: false
    });
  };

  render() {
    const columns = [
      { label: 'service name', value: 'name', sort: 'name' },
      { label: 'price', value: 'cost', sort: 'cost', prefix: '$', isValue: true, isCurrency: true },
      { label: 'price type', value: 'costType', sort: 'cost_type' }
    ];

    const { services, currentStatus, page, perPage, total, providerLocationId } = this.props;
    const { sort, visibleOfEditServiceModal, visibleOfConfirmationModal, selectedService } = this.state;
    const pageCount = Math.ceil(total/perPage);
    const modalActions = [
      <HollowButton onClick={this.hideConfirmationModal} key="modal_btn_cancel">Cancel</HollowButton>,
      <OrangeButton onClick={this.deleteService} key="modal_btn_save">Confirm</OrangeButton>
    ];

    return (
      <Wrapper>
        <ServiceHeader onAdd={this.createService} />
        <SearchSection>
          <SearchCotainer>
            <SearchBox placeholder="SEARCH SERVICES" onChange={this.handleInputChange} />
          </SearchCotainer>
        </SearchSection>
        <Table
          columns={columns}
          records={services}
          sort={sort}
          onSortChange={this.onSortChange}
          page={page}
          pageCount={pageCount}
          onPageChange={this.loadPage}
          toDetails={this.toDetails}
        />
        {visibleOfEditServiceModal &&
          <React.Fragment>
          {providerLocationId ?
            <EditLocationServiceModal
              loading={currentStatus === actionTypes.UPDATE_SERVICE || currentStatus === actionTypes.DELETE_SERVICE}
              open={visibleOfEditServiceModal}
              service={selectedService}
              onClose={this.hideEditModal}
              onDelete={this.showConfirmationModal}
              onSave={this.updateService}
            />
          :
            <EditServiceModal
              loading={currentStatus === actionTypes.UPDATE_SERVICE || currentStatus === actionTypes.DELETE_SERVICE}
              open={visibleOfEditServiceModal}
              service={selectedService}
              onClose={this.hideEditModal}
              onDelete={this.showConfirmationModal}
              onSave={this.updateService}
            />
          }
        </React.Fragment>
        }
        <Modal
          title={'Are You Sure?'}
          actions={modalActions}
          normal={true}
          open={visibleOfConfirmationModal}
          onClose={this.hideConfirmationModal}
        >
          <Description>Deleting this service cannot be undone.</Description>
        </Modal>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ service: { services, currentStatus, page, perPage, total }, auth: { providerLocationId } }) => ({
  services,
  currentStatus,
  page,
  perPage,
  total,
  providerLocationId
});

const mapDispatchToProps = {
  GetServices,
  UpdateService,
  DeleteService
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Services)
);
