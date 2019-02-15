import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Col, Row } from 'react-flexbox-grid';
import { isEmpty } from 'lodash';

import { actionTypes as categoryActions, GetCategories } from 'store/actions/categories';
import { actionTypes as serviceActions, CreateService } from 'store/actions/services';
import { refinedCategoriesSelector } from 'store/selectors/categories';
import Table from 'components/basic/Table';
import { PageTitle } from 'components/basic/Typho';
import { SectionHeaderWrapper, LeftPart, RightPart } from 'components/basic/Header';
import { OrangeButton } from 'components/basic/Buttons';
import { SearchBox } from 'components/basic/Input';
import AddServiceModal from '../components/AddServiceModal';

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
      keyword: '',
      visibleOfServiceModal: false
    };
  }

  componentDidMount() {
    this.loadPage(1);
  }

  loadPage = (page) => {
    const { keyword } = this.state;
    const { GetCategories } = this.props;
    const params = isEmpty(keyword) ? {
      page: page,
      per_page: 24,
    } : {
      page: page,
      per_page: 24,
      search_by_name: keyword
    };
    GetCategories({ params });
  };

  toDetails = category => {
    this.setState({ selectedCategory: category }, () => {
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
    this.setState({ keyword }, () => {
      this.loadPage(1);
    });
  }

  createService = (values) => {
    const { CreateService } = this.props;
    CreateService({ 
      data: {
        service: values,
      },
      success: () => {
        this.hideAddServiceModal();
      }
    });
  };

  render() {
    const columns = [
      { label: 'serivce name', value: 'name' },
    ];
    const { visibleOfServiceModal, selectedCategory } = this.state;
    const { categories, categoryStatus, serviceStatus, page, perPage, total } = this.props;
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
            <SearchBox placeholder="SEARCH SERVICES" onChange={this.handleInputChange} />
          </SearchCotainer>
        </SearchSection>
        <Table
          loading={categoryStatus === categoryActions.GET_CATEGORIES}
          type={'tile'}
          columns={columns}
          records={categories}
          page={page}
          pageCount={pageCount}
          onPageChange={this.loadPage}
          toDetails={this.toDetails}
        />
        {visibleOfServiceModal && <AddServiceModal
          loading={serviceStatus === serviceActions.CREATE_SERVICE}
          open={visibleOfServiceModal}
          category={selectedCategory}
          onClose={this.hideAddServiceModal}
          onSave={this.createService}
        />}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  categories: refinedCategoriesSelector(state, ''),
  categoryStatus: state.category.currentStatus,
  serviceStatus: state.service.currentStatus,
  page: state.category.page,
  perPage: state.category.perPage,
  total: state.category.total
});

const mapDispatchToProps = {
  GetCategories,
  CreateService
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddService)
);
