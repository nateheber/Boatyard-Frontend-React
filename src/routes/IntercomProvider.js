import React from 'react';

import { withRouter } from 'react-router-dom';
import { IntercomAPI } from 'components/basic/Intercom';

class IntercomProvider extends React.Component {
  componentWillMount() {
    this.unlisten = this.props.history.listen((location, action) => {
      IntercomAPI('update', { page_changed_at: Date.now() });
    });    
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(IntercomProvider);
