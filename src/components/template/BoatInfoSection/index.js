import React from 'react'
import { connect } from 'react-redux'
import { findIndex } from 'lodash'

import EditModal from './EditModal'
import InfoSection from './InfoSection'

import { updateBoats, deleteBoats } from 'reducers/boats'

class BoatInfoSection extends React.Component {
  state = {
    edit: false,
    editingBoatIdx: -1,
    openedBoatIdx: -1,
  }
  editBoat = (idx) => {
    this.setState({
      edit: true,
      editingBoatIdx: idx
    })
  }
  endEditing = () => {
    this.setState({
      edit: false,
    })
  }
  getBoatLocation = (boatIdx) => {
    const { boats, included } = this.props
    if (boatIdx === -1) {
      return {}
    }
    const locationId = boats[boatIdx].locationId
    const locationIdx = findIndex(included, location => parseInt(location.id) === locationId)
    if (locationIdx >= 0) {
      return {
        locationType: included[locationIdx].attributes.locationType,
        name: included[locationIdx].attributes.name,
        ...included[locationIdx].relationships.address.data
      }
    }
    return {}
  }
  updateBoatInfo = ({ boat, location: { locationType, name, ...addressAttributes } }) => {
    const { boats, refreshInfo } = this.props
    const { editingBoatIdx } = this.state
    const boatId = boats[editingBoatIdx].id
    this.props.updateBoats({
      id: boatId,
      data: {
        ...boat,
        location_attributes: {
          locationType,
          name,
          addressAttributes
        }
      },
      callback: refreshInfo
    })
    this.endEditing();
  }
  toggleInfoSection = (idx) => {
    const { openedBoatIdx } = this.state;
    this.setState({
      openedBoatIdx: openedBoatIdx === idx ? -1 : idx,
    })
  }
  render() {
    const { boats } = this.props
    const { edit, editingBoatIdx, openedBoatIdx } = this.state
    const boatLocation = this.getBoatLocation(editingBoatIdx)
    return (
      <React.Fragment>
        {
          boats.map((boat, idx) => (
            <InfoSection
              opened={openedBoatIdx === idx || boats.length === 1}
              onEdit={() => this.editBoat(idx)}
              key={`boatInfo_${boat.id}`}
              {...boat}
              location={this.getBoatLocation(idx)}
              toggleSection={() => this.toggleInfoSection(idx)}
            />
          ))
        }
        {
          editingBoatIdx !== -1 && <EditModal open={edit} onClose={this.endEditing} onSave={this.updateBoatInfo} boatInfo={boats[editingBoatIdx]} locationInfo={boatLocation} />
        }
      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ boat: { boats, included } }) => ({
  boats,
  included
})

const mapDispatchToProps = {
  updateBoats,
  deleteBoats
}

export default connect(mapStateToProps, mapDispatchToProps)(BoatInfoSection)
