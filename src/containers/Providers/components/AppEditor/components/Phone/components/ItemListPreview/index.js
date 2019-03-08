import React from 'react';
import update from 'immutability-helper';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { ItemDNDCard } from './components';

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

class ItemListPreview extends React.Component {
  moveCard = (id, atIndex) => {
    const { item, index } = this.findCard(id)
    const { items } = this.props;
    const newItems = update(items, {
      $splice: [[index, 1], [atIndex, 0, item]],
    });
    this.props.onChangeOrder(newItems);
	}

	findCard = (id) => {
    const { items } = this.props;
    const item = items.filter(s => s.id === id)[0];

		return {
			item,
			index: items.indexOf(item),
		}
	}

  render() {
    const { items, onEdit, connectDropTarget } = this.props;
    return connectDropTarget(
      <div style={wrapperStyle}>
        { items.map((item) => (
          <ItemDNDCard
            id={item.id}
            item={item}
            key={item.id}
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
  }))(ItemListPreview);

export default DragDropContext(HTML5Backend)(DropTargetContainer);
