import React from 'react';
import styled from 'styled-components';

import ServiceItem from '../basic/ServiceItem';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export default class ServicePreview extends React.Component {
  render() {
    const { services } = this.props;
    return (
      <Wrapper>
        { services.map(service => (
          <ServiceItem id={service} key={`service_preview${service}`} />
        )) }
      </Wrapper>
    );
  }
}
