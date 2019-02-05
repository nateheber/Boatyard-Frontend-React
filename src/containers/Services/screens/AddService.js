import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { GetServices } from 'store/actions/services';
import { fetchCategories } from 'store/reducers/categories';
import Table from 'components/basic/Table';
import { PageTitle } from 'components/basic/Typho';
import { SectionHeaderWrapper, LeftPart, RightPart } from 'components/basic/Header';
import { OrangeButton } from 'components/basic/Buttons';

const Wrapper = styled.div`
  height: 100%;
  background-color: white;
`;

class AddService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: { col: 'name', direction: 'asc' }
    };
  }

  componentDidMount() {
    this.loadPage(1);
    this.props.fetchCategories();
  }

  loadPage = (page) => {
    const { GetServices } = this.props;
    const params = {
      page: page
    };
    GetServices({ params });
  };

  toDetails = service => {
    this.props.history.push(`/service-details/?service=${service.id}`);
  };

  createService = () => {
    this.props.history.push(`/service-details/`);
  };

  showAddServiceModal = () => {

  };

  goToServices = () => {
    this.props.history.push(`/services`);
  }

  render() {
    const columns = [
      { label: 'serivce name', value: 'name' },
    ];

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
  GetServices,
  fetchCategories
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddService)
);
