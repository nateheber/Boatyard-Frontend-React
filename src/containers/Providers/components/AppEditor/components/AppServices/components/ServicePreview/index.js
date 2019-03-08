import React from 'react';
import update from 'immutability-helper';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import { ServiceDNDCard } from './components';

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

class ServicePreview extends React.Component {
  moveCard = (id, atIndex) => {
    const { service, index } = this.findCard(id)
    const { services } = this.props;
    const newServices = update(services, {
      $splice: [[index, 1], [atIndex, 0, service]],
    });
    this.props.onChangeOrder(newServices);
	}

	findCard = (id) => {
    const { services } = this.props;
    const service = services.filter(s => s.id === id)[0];

		return {
			service,
			index: services.indexOf(service),
		}
	}

  render() {
    const { services, onEdit, connectDropTarget } = this.props;
    return connectDropTarget(
      <div style={wrapperStyle}>
        { services.map((service) => (
          <ServiceDNDCard
            id={service.id}
            service={service}
            key={service.id}
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
  }))(ServicePreview);

export default DragDropContext(HTML5Backend)(DropTargetContainer);
