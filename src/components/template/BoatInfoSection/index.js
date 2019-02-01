import React from 'react'
import { connect } from 'react-redux'
import { findIndex } from 'lodash'

import BoatModal from './BoatModal'
import InfoSection from './InfoSection'

import { GetBoats, UpdateBoat, DeleteBoat } from 'store/actions/boats'
import { refinedBoatsSelector } from 'store/selectors/boats';

class BoatInfoSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleOfBoatModal: false,
      openedBoatIdx: -1,
      edtingBoatIndex: -1,
      deletingBoatIndex: -1
    };  
  }

  editBoat = (index) => {
    this.setState({
      visibleOfBoatModal: true,
      edtingBoatIndex: index
    })
  }

  endEditing = () => {
    this.setState({
      visibleOfBoatModal: false,
      edtingBoatIndex: -1
    })
  }

  getBoatLocation = (index) => {
    const { boats, included } = this.props
    if (index === -1) {
      return {}
    }
    const locationId = boats[index].locationId
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

  updateBoatInfo = (data) => {
    const { boats, user, refreshInfo } = this.props;
    const { edtingBoatIndex } = this.state;
    const boatId = boats[edtingBoatIndex].id;
    let params = {};
    let paramName = 'user_id';
    if (user.type === 'child_accounts') {
      paramName = 'child_account_id';
    }
    params[`boat[${paramName}]`] = user.id;
    this.props.UpdateBoat({
      boatId,
      data,
      success: () => {
        this.endEditing();
        this.props.GetBoats({ params });
        if (refreshInfo) {
          refreshInfo();
        }
      }
    });
  }

  toggleInfoSection = (index) => {
    const { openedBoatIdx } = this.state;
    this.setState({
      openedBoatIdx: openedBoatIdx === index ? -1 : index,
    })
  }

  render() {
    const { boats, user } = this.props;
    const { visibleOfBoatModal, edtingBoatIndex, openedBoatIdx } = this.state;

    return (
      <React.Fragment>
        {boats.map((boat, index) => (
          <InfoSection
            opened={openedBoatIdx === index || boats.length === 1}
            onEdit={() => this.editBoat(index)}
            onDelete={() => this.deleteBoat(index)}
            key={`boatInfo_${boat.id}`}
            boatInfo={boat}
            toggleSection={() => this.toggleInfoSection(index)}
          />
        ))}
        {edtingBoatIndex > -1 && <BoatModal
          open={visibleOfBoatModal}
          user={user}
          onClose={this.endEditing}
          onSave={this.updateBoatInfo}
          boatInfo={boats[edtingBoatIndex]}
        />}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  boats: refinedBoatsSelector(state),
})

const mapDispatchToProps = {
  GetBoats,
  UpdateBoat,
  DeleteBoat
}

export default connect(mapStateToProps, mapDispatchToProps)(BoatInfoSection)
