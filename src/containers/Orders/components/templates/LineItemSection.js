import React from 'react'
import { connect } from 'react-redux'
import deepEqual from 'deep-equal'

import NewLineItems from '../infoSections/NewLineItem'
import LineItem from '../infoSections/LineItem'
import Section from '../basic/Section'
import ButtonGroup from '../basic/ButtonGroup'

import { updateLineItem, deleteLineItem, createLineItem } from 'reducers/lineItems'

class LineItemSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newItems: [],
      lineItems: props.lineItems,
      mode: 'view'
    }
  }
  componentDidUpdate(prevProps) {
    if (!deepEqual(this.props.lineItems, prevProps.lineItems)) {
      this.setState({
        lineItems: this.props.lineItems
      })
    }
  }
  onChange = (item, idx) => {
    const newItems = [...this.state.newItems];
    newItems[idx] = item;
    this.setState({
      newItems
    })
  }
  onEdit = () => {
    this.setState({
      mode: 'edit'
    })
  }
  addNewItem = () => {
    const { newItems } = this.state;
    this.setState({
      newItems: [...newItems, {}]
    })
  }
  removeLineItem = (id) => {
    this.props.deleteLineItem(id)
  }
  render () {
    const { newItems, lineItems, mode } = this.state;
    return (
      <Section title="Quotes" mode={mode} onEdit={this.onEdit} >
        {
          lineItems.map((val, idx) => (
            <LineItem {...val} onRemove={() => this.removeLineItem(val.id)} mode={mode} />
          ))
        }
        {
          newItems.map((val, idx) => (
            <NewLineItems onChange={(item) => this.onChange(item, idx)} key={`new_item_${idx}`} />
          ))
        }
        <ButtonGroup onAdd={this.addNewItem} showSave={newItems.length > 0 || mode === 'edit'} onSave={this.onSave} />
      </Section>
    )
  }
}

const mapStateToProps = ({ lineItem: { lineItems } }) => ({
  lineItems
})

const mapDispatchToProps = {
  updateLineItem,
  deleteLineItem,
  createLineItem, 
}

export default connect(mapStateToProps, mapDispatchToProps)(LineItemSection)