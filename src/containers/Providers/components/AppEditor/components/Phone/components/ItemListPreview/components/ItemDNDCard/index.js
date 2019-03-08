import React from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import _ from 'lodash';

import ListItem from '../ListItem';

const ItemTypes = {
  CARD: 'card'
};

const cardSource = {
	beginDrag(props) {
		return {
			id: props.id,
			originalIndex: props.findCard(props.id).index,
		}
	},

	endDrag(props, monitor) {
		const { id: droppedId, originalIndex } = monitor.getItem()
		const didDrop = monitor.didDrop()

		if (!didDrop) {
			props.moveCard(droppedId, originalIndex)
		}
	},
}

const cardTarget = {
	canDrop() {
		return false
	},

	hover(props, monitor) {
		const { id: draggedId } = monitor.getItem()
		const { id: overId } = props

		if (draggedId !== overId) {
			const { index: overIndex } = props.findCard(overId)
			props.moveCard(draggedId, overIndex)
		}
	},
}

class ItemDNDCard extends React.Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		id: PropTypes.any.isRequired,
		moveCard: PropTypes.func.isRequired,
		findCard: PropTypes.func.isRequired,
		onEdit: PropTypes.func.isRequired,
	}

	render() {
		const {
			isDragging,
			connectDragSource,
			connectDropTarget,
			item,
			onEdit
		} = this.props;
		const opacity = isDragging ? 0 : 1;

		return connectDragSource(
			connectDropTarget(
				<div>
					<ListItem item={item} onEdit={onEdit} style={{ opacity }}/>
				</div>
			)
		);
	}
}

export default _.flow(
	DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging(),
	})),
	DropTarget(ItemTypes.CARD, cardTarget, connect => ({
		connectDropTarget: connect.dropTarget(),
	})),
)(ItemDNDCard);
