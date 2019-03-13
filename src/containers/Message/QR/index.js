import React from 'react';
import { connect } from 'react-redux';
import { findIndex } from 'lodash';

import { GetQuickReplies, CreateQuickReply, UpdateQuickReply } from 'store/actions/quickReplies';

import MessageBasic from '../MessageBasic';
import QRLeft from './QRLeft';
import QRContent from './QRContent';

class QRBox extends React.Component {
  state = {
    createNew: false,
    empty: true,
    selected: [],
    showItem: -1,
    showContent: false
  };

  componentDidMount() {
    this.props.GetQuickReplies({ params: {} });
  }

  onAdd = () => {
    this.setState({
      empty: true,
      createNew: true,
      showContent: true,
      showItem: -1
    });
  }

  onSave = (data) => {
    const { showItem } = this.state;
    const { CreateQuickReply, UpdateQuickReply } = this.props;
    if (showItem !== -1) {
      UpdateQuickReply({ quickReplyId: showItem, data });
    } else {
      CreateQuickReply({ data });
    }
    this.setState({
      empty: true,
      createNew: false,
    });
  }

  onCancel = () => {
    this.setState({
      empty: true,
      createNew: false,
      showContent: false,
      showItem: -1,
    });
  }

  onBack = () => {
    this.setState({
      showContent: false,
      showItem: -1
    });
  }

  onSelect = (selected) => {
    this.setState({ selected });
  }

  onShowItem = (id) => {
    this.setState({
      empty: false,
      showItem: id,
      showContent: true
    });
  }

  render() {
    const { quickReplies } = this.props;
    const { createNew, empty, showItem, showContent } = this.state;
    const idx = findIndex(quickReplies, o => o.id === showItem);
    return (
      <MessageBasic
        left={
          <QRLeft
            items={quickReplies}
            onAdd={this.onAdd}
            onSelect={this.onSelect}
            onShowItem={this.onShowItem}
            onDeleteItems={() => {}}
          />
        }
        right={
          <QRContent
            createNew={createNew}
            empty={empty}
            onCancel={this.onCancel}
            onSave={this.onSave}
            onBack={this.onBack}
            showItem={quickReplies[idx]}
          />
        }
        showContent={showContent}
      />
    );
  }
}

const mapStateToProps = ({ quickReply: { quickReplies, currentStatus } }) => ({ quickReplies, currentStatus });

const mapDispatchToProps = { GetQuickReplies, CreateQuickReply, UpdateQuickReply };

export default connect(mapStateToProps, mapDispatchToProps)(QRBox);