import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import Table from 'components/basic/Table';
import { BoatHeader } from 'components/compound/SectionHeader';

import { GetBoats } from 'store/actions/boats';

const Wrapper = styled.div`
  height: 100%;
  background-color: white;
`;

class Services extends React.Component {
  componentDidMount() {
    this.props.GetBoats({ params: { page: 1 } });
  }
  toDetails = boat => {
    this.props.history.push(`/boat-details/?boat=${boat.id}`);
  };
  createService = () => {
    this.props.history.push(`/boat-details/`);
  };
  render() {
    const columns = [
      { label: 'boat name', value: 'name' },
      { label: 'year', value: 'year' },
      { label: 'make', value: 'make' },
      { label: 'model', value: 'model' },
      { label: 'length', value: 'length' }
    ];
    const { boats } = this.props;
    return (
      <Wrapper>
        <BoatHeader onAdd={this.createService} />
        <Table
          columns={columns}
          records={boats}
          sortColumn="order"
          toDetails={this.toDetails}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ boat: { boats } }) => ({
  boats
});

const mapDispatchToProps = {
  GetBoats
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Services)
);
