import React from 'react';
import styled from 'styled-components';

import { ServiceItem } from './components';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: scroll;
  padding-bottom: 35px;
`;

export default class ServicePreview extends React.Component {
  render() {
    const { services, onEdit } = this.props;
    return (
      <Wrapper>
        { services.map(service => (
          <ServiceItem service={service} key={`service_preview${service.id}`} onEdit={onEdit} />
        )) }
      </Wrapper>
    );
  }
}
