import React from 'react';
import styled from 'styled-components';
import { get } from 'lodash';

import { GradientButton } from 'components/basic/Buttons';
import { Section, SectionHeader, SectionContent, HeaderTitle, Image } from '../Section';
import { SummaryEditView } from './components';
import AddIcon from '../../../../../../../resources/job/add.png';

export const Divider = styled.div`
  border-top: 1px solid #A9B5BB;
  margin: 20px -25px;
  height: 1px;
`;

export default class JobSummarySection extends React.Component {
  addService = (service) => {
    const  { workorder: {services}, SetWorkOrder } = this.props;
    SetWorkOrder({services: [...services, service]});
  }

  handleDeleteService(index) {
    const  { workorder: {services}, SetWorkOrder } = this.props;
    const newServices = [...services];
    newServices.splice(index, 1);
    SetWorkOrder({services: newServices});
  }

  handleServiceChange(service, index) {
    const  { workorder: {services}, SetWorkOrder } = this.props;
    services[index] = service;
    SetWorkOrder({services: [...services]});
  }

  handleAddSevice = () => {
    const { workorder: {services}, SetWorkOrder, order } = this.props;
    const special_instructions = get(order, 'attributes.specialInstructions');
    SetWorkOrder({services: [...services, { special_instructions }]});
  }

  render() {
    const { workorder: {services, state } } = this.props;
    const disabled = !(!state || state === 'draft' || state === 'declined');
    return (
      <Section>
        <SectionHeader>
          <HeaderTitle>Job Summary</HeaderTitle>
            {!disabled && <GradientButton onClick={this.handleAddSevice}>
              <Image src={AddIcon} />
            </GradientButton>
            }
        </SectionHeader>
        <SectionContent>
          {
            services.map((service, index) =>
            <React.Fragment key={`service_${index}`}>
              { index !== 0 && <Divider /> }
              <SummaryEditView
                services={this.props.services}
                service={service}
                disabled={disabled}
                servicesValidationCnt={this.props.servicesValidationCnt}
                handleDelete={() => this.handleDeleteService(index)}
                onChange={(service) => this.handleServiceChange(service, index)}
              />
            </React.Fragment>
            )
          }

        </SectionContent>
      </Section>
    );
  }
}
