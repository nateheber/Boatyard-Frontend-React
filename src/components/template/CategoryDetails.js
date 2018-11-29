import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { findIndex } from 'lodash';

import { CategoryEditor } from './Editors';

import { updateCategories, createCategories } from '../../reducers/categories';

class CategoryDetails extends React.Component {
  constructor(props) {
    super(props);
    const { categories } = props;
    const query = queryString.parse(props.location.search);
    const categoryId = query.category;
    if (categoryId) {
      const idx = findIndex(categories, category => category.id === categoryId);
      const categoryDetail = categories[idx];
      this.state = {
        ...categoryDetail
      };
    } else {
      this.state = {
        id: '',
        name: '',
        subtitle: '',
        appIdentifier: '',
        description: '',
        isHidden: false,
        primary: false
      };
    }
  }
  onSave = data => {
    if (this.state.id) {
      this.props.updateCategories({
        id: this.state.id,
        data
      });
      this.props.history.goBack();
    } else {
      this.props.createCategories(data);
    }
  };
  onCancel = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <CategoryEditor
        {...this.state}
        onCancel={this.onCancel}
        onSave={this.onSave}
      />
    );
  }
}

const mapStateToProps = ({ category: { categories } }) => ({
  categories
});

const mapDispatchToProps = {
  updateCategories,
  createCategories
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CategoryDetails)
);
