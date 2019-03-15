import React from 'react';
import styled from 'styled-components';
import classNames from 'classnames';

import FolderIcon from './assets/folder.png';
import ImageIcon from './assets/image.png';
import SuitecaseIcon from './assets/suitecase.png';
import TemplateIcon from './assets/template.png';

const Wrapper = styled.div`
  background: white;
`;

const Title = styled.div`
  padding: 80px 25px 0;
  margin-bottom: 20px;
  font-family: Helvetica;
  font-size: 24px;
  color: #003247;
  line-height: 26px;
`

const StepWrapper = styled.div`
  border-top: 1px solid #e7e7e7;
`

const Step = styled.div`
  display: flex;
  border-bottom: 1px solid #e7e7e7;
  flex-direction: row;
  align-items: center;
  padding: 9px 10px;
  &:hover, &.active {
    background-color: #e7e7e7;
  }
  cursor: pointer;
  transition: all 0.5s;
`

const StepIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #F8F8F8;
  border-radius: 4px;
  border: 1px solid #CBCBCB;
  width: 33px;
  height: 33px;
  .active & {
    border-color: transparent;
  }
  ${Step}:hover & {
    border-color: transparent;
  }
  transition: all 0.5s;
`

const StepIcon = styled.img`
  width: 17px;
  height: 17px;
`;

const StepLabel = styled.div`
  margin-left: 18px;
  color: #003247;
  text-transform: uppercase;
  font-family: Helvetica;
  font-size: 16px;
`;

const steps = [
  { title: 'header images', icon: ImageIcon },
  { title: 'service categories', icon: FolderIcon },
  { title: 'services', icon: SuitecaseIcon },
  { title: 'templates', icon: TemplateIcon },
]

export default class StepSelector extends React.Component {
  render() {
    const { curStep, onChange } = this.props;
    return (
      <Wrapper>
        <Title>App Elements</Title>
        <StepWrapper>
          {
            steps.map((step, idx) => (
              <Step className={classNames({ active: curStep === idx })} onClick={() => onChange(idx)} key={`step_${idx}`}>
                <StepIconWrapper>
                  <StepIcon src={step.icon} />
                </StepIconWrapper>
                <StepLabel>{step.title}</StepLabel>
              </Step>
            ))
          }
        </StepWrapper>
      </Wrapper>
    )
  }
}