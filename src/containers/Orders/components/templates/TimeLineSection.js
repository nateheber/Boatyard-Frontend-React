import React from 'react';
import styled from 'styled-components';

import { Section } from 'components/basic/InfoSection';

import { generateOrderTimeline } from 'utils/order';

const TimelineItem = styled.div`
  position: relative;
  color: #8f8f8f;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 20px;
  padding-left: 30px;
  &::after {
    content: ' ';
    position: absolute;
    display: inline-block;
    width: 1px;
    height: calc(100% + 25px);
    top: 0px;
    left: 0px;
    background-color: #a9b5bb;
  }
  &::before {
    content: ' ';
    position: absolute;
    display: inline-block;
    top: 0px;
    left: -8px;
    width: 16px;
    height: 16px;
    border-radius: 8px;
    background-color:  #a9b5bb;
  }
`;

export default class TimeLineSection extends React.Component {

  render () {
    const { order } = this.props;
    const timelineItems = generateOrderTimeline(order);
    return (
      <Section title="Timeline">
        {
          timelineItems.map((item, idx) => (
            <TimelineItem key={`timeline_${idx}`}>{item.message}</TimelineItem>
          ))
        }
      </Section>
    )
  }
}
