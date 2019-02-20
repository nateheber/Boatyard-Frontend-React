import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Col, Row } from 'react-flexbox-grid';
import { withRouter } from 'react-router-dom';
import { get, isNumber, isEmpty } from 'lodash';
import { toastr } from 'react-redux-toastr';

import { actionTypes, GetServices, UpdateService, DeleteService } from 'store/actions/services';
import Table from 'components/basic/Table';
import { ServiceHeader } from 'components/compound/SectionHeader';
import EditServiceModal from '../components/EditServiceModal';
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

class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      sort: { col: 'name', direction: 'asc' },
      visibleOfEditServiceModal: false,
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
      'service[sort]': sort.direction,
      'service[order]': sort.col
    } : {
      page: page,
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
    DeleteService({
      serviceId: get(selectedService, 'id'),
      success: () => {
        this.hideEditModal();
        this.loadPage(page);
      },
      error: () => {
        const { errors } = this.props;
        if (errors && errors.length > 0) {
          for (const key in errors) {
            if (isNumber(key)) {
              toastr.error(errors[key].join(''));
            }else {
              toastr.error(key, errors[key].join(''));
            }
          }
        }
      }
    });
  }

  updateService = (data) => {
    const { selectedService } = this.state;
    const { page, UpdateService } = this.props;
    UpdateService({
      serviceId: get(selectedService, 'id'),
      data,
      success: () => {
        this.hideEditModal();
        this.loadPage(page);
      },
      error: () => {
        const { errors } = this.props;
        if (errors && errors.length > 0) {
          for (const key in errors) {
            if (isNumber(key)) {
              toastr.error(errors[key].join(''));
            }else {
              toastr.error(key, errors[key].join(''));
            }
          }
        }
      }
    });
  }

  render() {
    const columns = [
      { label: 'service name', value: 'name', sort: 'name' },
      { label: 'price', value: 'cost', sort: 'cost', prefix: '$', isValue: true, isCurrency: true },
      { label: 'price type', value: 'costType', sort: 'cost_type' }
    ];

    const { services, currentStatus, page, perPage, total } = this.props;
    const { sort, visibleOfEditServiceModal, selectedService } = this.state;
    const pageCount = Math.ceil(total/perPage);
    return (
      <Wrapper>
        <ServiceHeader onAdd={this.createService} />
        <SearchSection>
          <SearchCotainer>
            <SearchBox placeholder="SEARCH SERVICES" onChange={this.handleInputChange} />
          </SearchCotainer>
        </SearchSection>
        <Table
          loading={currentStatus === actionTypes.GET_SERVICES}
          columns={columns}
          records={services}
          sort={sort}
          onSortChange={this.onSortChange}
          page={page}
          pageCount={pageCount}
          onPageChange={this.loadPage}
          toDetails={this.toDetails}
        />
        {visibleOfEditServiceModal && <EditServiceModal
          loading={currentStatus === actionTypes.UPDATE_SERVICE}
          open={visibleOfEditServiceModal}
          service={selectedService}
          onClose={this.hideEditModal}
          onDelete={this.deleteService}
          onSave={this.updateService}
        />}
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ service: { services, currentStatus, page, perPage, total } }) => ({
  services,
  currentStatus,
  page,
  perPage,
  total
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
