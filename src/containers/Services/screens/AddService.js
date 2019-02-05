import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Col, Row } from 'react-flexbox-grid';

import { GetCategories } from 'store/actions/categories';
import Table from 'components/basic/Table';
import { PageTitle } from 'components/basic/Typho';
import { SectionHeaderWrapper, LeftPart, RightPart } from 'components/basic/Header';
import { OrangeButton } from 'components/basic/Buttons';
import { Input } from 'components/basic/Input';
import AddServiceModal from '../components/AddServiceModal';

const Wrapper = styled.div`
  height: 100%;
  background-color: white;
`;

const SearchSection = styled(Row)`
  border-top: 1px solid #A9B5BB;
  margin: 0 !important;
`;

const SearchCotainer = styled(Col)`
  padding: 24px 20px;
  width: 305px;
`;

class AddService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      visibleOfServiceModal: false
    };
  }

  componentDidMount() {
    this.loadPage(1);
  }

  loadPage = (page) => {
    const { GetCategories } = this.props;
    const params = {
      page: page
    };
    GetCategories({ params });
  };

  toDetails = service => {
    this.setState({ selectedService: service }, () => {
      this.showAddServiceModal();
    });
  };

  createService = (values) => {
    // this.props.history.push(`/service-details/`);
    console.log('------------Values-----------', values);
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

  handleInputChange = (event) => {
    this.setState({ keyword: event.target.value });
  }

  render() {
    const columns = [
      { label: 'serivce name', value: 'name' },
    ];
    const { keyword, visibleOfServiceModal, selectedService } = this.state;
    const { categories, categoryStatus, page, perPage, total } = this.props;
    const pageCount = Math.ceil(total/perPage);
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
            <Input
              type="text"
              placeholder="SEARCH SERVICE"
              value={keyword}
              onChange={this.handleInputChange}
            />
          </SearchCotainer>
        </SearchSection>
        <Table
          loading={categoryStatus === ''}
          type={'tile'}
          columns={columns}
          records={categories}
          page={page}
          pageCount={pageCount}
          onPageChange={this.loadPage}
          toDetails={this.toDetails}
        />
        {visibleOfServiceModal && <AddServiceModal 
          title={selectedService.name}
          open={visibleOfServiceModal}
          service={selectedService}
          onClose={this.hideAddServiceModal}
          onSave={this.createService}
        />}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  serviceStatus: state.service.currentStatus,
  categories: state.category.categories,
  categoryStatus: state.category.currentStatus,
  page: state.category.page,
  perPage: state.category.perPage,
  total: state.category.total
});

const mapDispatchToProps = {
  GetCategories
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddService)
);
