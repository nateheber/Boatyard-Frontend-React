import React from 'react';
import update from 'immutability-helper';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { CategoryDNDCard } from './component';

const wrapperStyle = {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  overflowY: 'scroll',
  paddingBottom: '35px',
  borderBottomRightRadius: '35px',
  borderBottomLeftRadius: '35px',
  zIndex: 999
};

const ItemTypes = {
  CARD: 'card'
};

const cardTarget = {
	drop() {},
}

class ServiceCatgegoryPreview extends React.Component {
  moveCard = (id, atIndex) => {
    const { category, index } = this.findCard(id)
    const { categories } = this.props;
    const newCategories = update(categories, {
      $splice: [[index, 1], [atIndex, 0, category]],
    });
    this.props.onChangeOrder(newCategories);
	}

	findCard = (id) => {
    const { categories } = this.props;
    const category = categories.filter(s => s.id === id)[0];

		return {
			category,
			index: categories.indexOf(category),
		}
	}

  render() {
    const { categories, onEdit, connectDropTarget } = this.props;
    return connectDropTarget(
      <div style={wrapperStyle}>
        { categories.map((category) => (
          <CategoryDNDCard
            id={category.id}
            category={category}
            key={category.id}
            onEdit={onEdit}
            moveCard={this.moveCard}
						findCard={this.findCard}
          />
        )) }
      </div>
    );
  }
}

const DropTargetContainer = DropTarget(ItemTypes.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  }))(ServiceCatgegoryPreview);

export default DragDropContext(HTML5Backend)(DropTargetContainer);
