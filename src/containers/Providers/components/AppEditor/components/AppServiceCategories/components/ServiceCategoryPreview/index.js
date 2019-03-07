import React from 'react';
import styled from 'styled-components';

import { CategoryItem } from './components';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  overflow-y: scroll;
  padding-bottom: 35px;
`;

export default class ServicePreview extends React.Component {
  render() {
    const { categories, onEdit } = this.props;
    return (
      <Wrapper>
        { categories.map((category, idx) => (
          <CategoryItem category={category} key={`category_preview${idx}`} onEdit={onEdit} />
        )) }
      </Wrapper>
    );
  }
}
