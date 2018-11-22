import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import Table from '../basic/Table';
import { ServiceHeader } from '../compound/SectionHeader';

import { fetchServices } from '../../reducers/services';

const Wrapper = styled.div`
  height: 100%;
  background-color: white;
`;

class Services extends React.Component {
  componentDidMount() {
    this.props.fetchServices();
  }
  toDetails = serviceId => {
    this.props.history.push(`/service-details/?service=${serviceId}`);
  };
  createService = () => {
    this.props.history.push(`/service-details/`);
  };
  render() {
    const columns = [
      { label: 'serivce name', value: 'service_name' },
      { label: 'location', value: 'location' },
      { label: 'price', value: 'price' },
      { label: 'price type', value: 'price_type' },
      { label: 'price unit', value: 'price_unit' }
    ];
    const records = [
      {
        service_name: 'Somthing Else?'
      },
      {
        service_name: 'Boat Detail'
      },
      {
        service_name: 'Boat Wash',
        price: '$3.00',
        price_type: 'length',
        price_unit: '/ft'
      },
      {
        service_name: 'Interior Cleaning',
        price: '$30.00',
        price_unit: '/hr'
      },
      {
        service_name: 'Maintenance Plan',
        price: '$35.00',
        price_type: 'length',
        price_unit: '/ft/month'
      }
    ];
    return (
      <Wrapper>
        <ServiceHeader onAdd={this.createService} />
        <Table
          columns={columns}
          records={records}
          sortColumn="order"
          toDetails={this.toDetails}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ service: { services } }) => ({
  services
});

const mapDispatchToProps = {
  fetchServices
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Services)
);
