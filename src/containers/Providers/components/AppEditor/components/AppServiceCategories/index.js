import React from 'react';
import { connect } from 'react-redux';
import { get, isEmpty, filter } from 'lodash';

import { ServiceCategorySelector } from './components';

import { SelectorWrapper } from '../../../Wrappers';

import categoryOptions from './defaultServiceCategories';

class AppServiceCategories extends React.Component {
  static getDerivedStateFromProps(props) {
    return ({ categories: props.categories });
  }

  state = {
    categories: [],
    currentCategory: {},
    showModal: false,
  };

  getProviderName = () => {
    const { currentProvider } = this.props;
    return get(currentProvider, 'name', '');
  }

  setCategories = (categories) => {
    this.props.onChange(categories);
    this.setState({ categories });
  }

  hideModal = () => {
    this.setState({ showModal: false });
  }

  onEdit = (category) => {
    this.setState({
      currentCategory: category,
      showModal: true,
    })
  }

  updateCategory = (values, iconFile, customIcon) => {
    const { categories, currentCategory } = this.state;
    const idx = categories.findIndex(category => category.id === currentCategory.id);
    const newCategories = categories.map(category => ({...category}));
    newCategories[idx] = {
      ...newCategories[idx],
      ...values,
      ...(isEmpty(customIcon) ? {} : {customIcon})
    }
    this.setState({ categories: newCategories, showModal: false });
    this.props.onChange(newCategories);
  }

  deleteCategory = (id) => {
    const { categories } = this.state;
    const newCategories = filter(categories, category => category.id !== id);
    this.setState({ categories: newCategories, showModal: false });
    this.props.onChange(newCategories);
  }

  render() {
    const { onAdd } = this.props;
    return (
      <React.Fragment>
        <SelectorWrapper>
          <ServiceCategorySelector categories={categoryOptions} onAdd={onAdd} />
        </SelectorWrapper>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  currentProvider: state.provider.currentProvider,
})

export default connect(mapStateToProps)(AppServiceCategories);
