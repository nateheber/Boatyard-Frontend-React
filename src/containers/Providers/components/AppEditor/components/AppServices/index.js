import React from 'react';
import { connect } from 'react-redux';

import { ServiceSelector} from './components';

import { SelectorWrapper } from '../../../Wrappers';

class AppServices extends React.Component {
  render() {
    const { onAdd } = this.props;
    return (
      <SelectorWrapper>
        <ServiceSelector onAdd={onAdd} />
      </SelectorWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  currentProvider: state.provider.currentProvider,
})

export default connect(mapStateToProps)(AppServices);
