import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import Table from 'components/basic/Table';
import { CategoryHeader } from 'components/compound/SectionHeader';

import { fetchCategories } from 'store/reducers/categories';

const Wrapper = styled.div`
  height: 100%;
  background-color: white;
`;

class Categories extends React.Component {
  componentDidMount() {
    this.props.fetchCategories();
  }
  toDetails = category => {
    this.props.history.push(`/category-details/?category=${category.id}`);
  };
  createCategory = () => {
    this.props.history.push(`/category-details/`);
  };
  render() {
    const { categories } = this.props;
    const columns = [
      { label: 'name', value: 'name' },
      { label: 'subtitle', value: 'subtitle' },
      { label: 'description', value: 'description' },
      { label: 'app identifier', value: 'app identifier' }
    ];
    return (
      <Wrapper>
        <CategoryHeader onAdd={this.createCategory} />
        <Table
          columns={columns}
          records={categories}
          sortColumn="order"
          toDetails={this.toDetails}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ category: { categories } }) => ({
  categories
});

const mapDispatchToProps = {
  fetchCategories
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Categories)
);
