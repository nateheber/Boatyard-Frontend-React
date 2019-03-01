import React from 'react';

import ImageSelector from '../compound/ImageSelector';

import { ContentWrapper, SelectorWrapper, PreviewWrapper } from '../basic/Wrappers';

export default class ServiceTemplates extends React.Component {
  render() {
    return (
      <ContentWrapper>
        <SelectorWrapper>
          <ImageSelector />
        </SelectorWrapper>
        <PreviewWrapper />
      </ContentWrapper>
    )
  }
}