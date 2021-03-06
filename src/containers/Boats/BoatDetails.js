import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';
import { findIndex } from 'lodash';

import { BoatEditor } from 'components/template/Editors';

import { updateBoats, createBoats } from 'reducers/boats';

class BoatDetails extends React.Component {
  constructor(props) {
    super(props);
    const { boats } = props;
    const query = queryString.parse(props.location.search);
    const boatId = query.boat;
    if (boatId) {
      const idx = findIndex(boats, boat => boat.id === boatId);
      const boatDetail = boats[idx];
      this.state = {
        ...boatDetail
      };
    } else {
      this.state = {
        name: '',
        location: {
          attributes: {}
        },
        year: '',
        make: '',
        model: '',
        length: 0
      };
    }
  }
  onSave = data => {
    if (this.state.id) {
      this.props.updateBoats({
        id: this.state.id,
        data
      });
      this.props.history.goBack();
    } else {
      this.props.createBoats(data);
    }
  };
  onCancel = () => {
    this.props.history.goBack();
  };
  render() {
    return (
      <BoatEditor
        data={this.state}
        onCancel={this.onCancel}
        onSave={this.onSave}
      />
    );
  }
}

const mapStateToProps = ({ boat: { boats }, category: { categories } }) => ({
  boats
});

const mapDispatchToProps = {
  updateBoats,
  createBoats
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BoatDetails)
);
