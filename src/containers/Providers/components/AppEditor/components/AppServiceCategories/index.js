import React from 'react';
import { connect } from 'react-redux';

import { ServiceCategorySelector } from './components';

import { SelectorWrapper } from '../../../Wrappers';

import categoryOptions from './defaultServiceCategories';

class AppServiceCategories extends React.Component {
  render() {
    const { onAdd } = this.props;
    return (
      <SelectorWrapper>
        <ServiceCategorySelector categories={categoryOptions} onAdd={onAdd} />
      </SelectorWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  currentProvider: state.provider.currentProvider,
})

export default connect(mapStateToProps)(AppServiceCategories);
