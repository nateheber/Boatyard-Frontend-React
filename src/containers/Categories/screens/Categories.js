import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Col, Row } from 'react-flexbox-grid';

import { actionTypes as categoryActions, GetCategories, CreateCategory } from 'store/actions/categories';
import Table from 'components/basic/Table';
import { CategoryHeader } from 'components/compound/SectionHeader';
import { Input } from 'components/basic/Input';
import CategoryModal from '../components/CategoryModal';

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

class Categories extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      visibleOfCategoryModal: false
    };
  }

  componentDidMount() {
    this.loadPage(1);
  }

  loadPage = (page) => {
    const { keyword } = this.state;
    const { GetCategories } = this.props;
    const params = {
      page: page,
      per_page: 24,
      'category[name]': keyword
    };
    GetCategories({ params });
  };

  handleInputChange = (event) => {
    const keyword = event.target.value;
    this.setState({ keyword }, () => {
      this.loadPage(1);
    });
  }

  toDetails = category => {
    this.props.history.push(`/category-details/?category=${category.id}`);
  };

  showCategoryModal = () => {
    this.setState({ visibleOfCategoryModal: true });
  };

  hideCategoryModal = () => {
    this.setState({ visibleOfCategoryModal: false });
  };

  createCategory = (data) => {
    const { CreateCategory, page } = this.props;
    CreateCategory({
      data,
      success: () => {
        this.hideCategoryModal();
        this.loadPage(page);
      }
    })
  };

  render() {
    const { categories, currentStatus, page, perPage, total } = this.props;
    const { keyword, visibleOfCategoryModal } = this.state;
    const columns = [
      { label: 'category name', value: 'name' },
    ];
    const pageCount = Math.ceil(total/perPage);

    return (
      <Wrapper>
        <CategoryHeader onAdd={this.showCategoryModal} />
        <SearchSection>
          <SearchCotainer>
            <Input
              type="text"
              placeholder="SEARCH CATEGORIES"
              value={keyword}
              onChange={this.handleInputChange}
            />
          </SearchCotainer>
        </SearchSection>
        <Table
          loading={currentStatus === categoryActions.GET_CATEGORIES}
          type={'tile'}
          columns={columns}
          records={categories}
          page={page}
          pageCount={pageCount}
          onPageChange={this.loadPage}
          toDetails={this.toDetails}
        />
        {visibleOfCategoryModal && <CategoryModal
          title={'New Category'}
          loading={currentStatus === categoryActions.CREATE_CATEGORY}
          open={visibleOfCategoryModal}
          onClose={this.hideCategoryModal}
          onSave={this.createCategory}
        />}
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ category: { categories, currentStatus, page, perPage, total } }) => ({
  categories,
  currentStatus,
  page,
  perPage,
  total
});

const mapDispatchToProps = {
  GetCategories,
  CreateCategory
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Categories)
);
