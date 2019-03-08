import React from 'react';
import update from 'immutability-helper';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';

import { ServiceDNDCard } from './components';

const wrapperStyle = {
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  overflowY: 'scroll',
  paddingBottom: '35px',
}

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
        { services.map((service, idx) => (
          <ServiceDNDCard
            id={service.id}
            service={service}
            key={`service_preview${idx}`}
            onEdit={onEdit}
            moveCard={this.moveCard}
						findCard={this.findCard}
          />
        )) }
      </div>
    );
  }
}

export default _.flow(
  DropTarget(ItemTypes.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
  })),
  DragDropContext(HTML5Backend),
)(ServicePreview);
