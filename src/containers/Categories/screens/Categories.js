import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { Col, Row } from 'react-flexbox-grid';
import { get, isEmpty, isNumber, startCase } from 'lodash';

import { actionTypes, GetCategories, CreateCategory, UpdateCategory, DeleteCategory } from 'store/actions/categories';
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
      selectedCategory: {},
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

  handleUpdateCategory = category => {
    this.setState({ selectedCategory: category }, () => {
      // this.props.history.push(`/category-details/?category=${category.id}`);
      this.showCategoryModal();
    })
  };

  handleCreateCategory = () => {
    this.setState({ selectedCategory: {} }, () => {
      this.showCategoryModal();
    })
  };

  showCategoryModal = () => {
    this.setState({ visibleOfCategoryModal: true });
  };

  hideCategoryModal = () => {
    this.setState({ visibleOfCategoryModal: false });
  };

  saveCategory = (data) => {
    const { CreateCategory, UpdateCategory, page } = this.props;
    const { selectedCategory } = this.state;
    if (isEmpty(selectedCategory)) {
      CreateCategory({
        data,
        success: () => {
          this.hideCategoryModal();
          this.loadPage(page);
        },
        error: () => {
          this.showErrors();
        }
      });  
    } else {
      const categoryId = get(selectedCategory, 'id');
      UpdateCategory({
        categoryId,
        data,
        success: () => {
          this.hideCategoryModal();
          this.loadPage(page);
        },
        error: () => {
          this.showErrors();
        }
      });  
    }

  }

  deleteCategory = () => {
    const { DeleteCategory, page } = this.props;
    const { selectedCategory } = this.state;
    const categoryId = get(selectedCategory, 'id');
    DeleteCategory({
      categoryId,
      success: () => {
        this.hideCategoryModal();
        this.loadPage(page);
      },
      error: () => {
        this.showErrors();
      }
    })
  };

  showErrors = () => {
    const { errors } = this.props;
    toastr.clean();
    if (errors && errors.length > 0) {
      for (const key in errors) {
        if (isNumber(key)) {
          toastr.error(startCase(errors[key].join('')));
        }else {
          toastr.error(startCase(key), startCase(errors[key].join('')));
        }
      }
    } else {
      for (const key in errors) {
        if (isNumber(key)) {
          toastr.error(startCase(errors[key]));
        }else {
          toastr.error(startCase(key), startCase(errors[key]));
        }
      }
    }
  };

  render() {
    const { categories, currentStatus, page, perPage, total } = this.props;
    const { keyword, selectedCategory, visibleOfCategoryModal } = this.state;
    const columns = [
      { label: 'category name', value: 'name' },
    ];
    const pageCount = Math.ceil(total/perPage);

    return (
      <Wrapper>
        <CategoryHeader onAdd={this.handleCreateCategory} />
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
          loading={currentStatus === actionTypes.GET_CATEGORIES}
          type={'tile'}
          columns={columns}
          records={categories}
          page={page}
          pageCount={pageCount}
          onPageChange={this.loadPage}
          toDetails={this.handleUpdateCategory}
        />
        {visibleOfCategoryModal && <CategoryModal
          title={'New Category'}
          category={selectedCategory}
          loading={currentStatus === actionTypes.CREATE_CATEGORY || currentStatus === actionTypes.UPDATE_CATEGORY}
          open={visibleOfCategoryModal}
          onClose={this.hideCategoryModal}
          onDelete={this.deleteCategory}
          onSave={this.saveCategory}
        />}
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ category: { categories, currentStatus, page, perPage, total, errors } }) => ({
  categories,
  currentStatus,
  page,
  perPage,
  total,
  errors
});

const mapDispatchToProps = {
  GetCategories,
  CreateCategory,
  UpdateCategory,
  DeleteCategory
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Categories)
);
