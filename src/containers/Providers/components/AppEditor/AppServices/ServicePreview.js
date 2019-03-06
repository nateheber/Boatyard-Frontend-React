import React from 'react';
import styled from 'styled-components';

import ServiceItem from '../../basic/ServiceItem';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: scroll;
  margin-bottom: 35px;
`;

export default class ServicePreview extends React.Component {
  render() {
    const { services } = this.props;
    return (
      <Wrapper>
        { services.map(service => (
          <ServiceItem service={service} key={`service_preview${service.id}`} />
        )) }
      </Wrapper>
    );
  }
}
