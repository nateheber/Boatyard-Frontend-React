import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import styled from 'styled-components';

import { GetManagements } from 'store/actions/managements';
import { refinedManagementsSelector } from 'store/selectors/managements';
import { getUserFromOrder, getBoatFromOrder } from 'utils/order';
import { OrangeButton, GradientButton } from 'components/basic/Buttons'
import Modal from 'components/compound/Modal';
import {
  Image, JobTitleSection, JobSummarySection, CustomerInfoSection,
  LocationInfoSection, BoatInfoSection, AttachmentSection, NotesSection
} from './components';

import PrintIcon from '../../../../../resources/job/print.png';
import TestImage1 from '../../../../../resources/test_images/1.png';
import TestImage2 from '../../../../../resources/test_images/2.png';
import TestImage3 from '../../../../../resources/test_images/3.png';
import TestImage4 from '../../../../../resources/test_images/4.png';
import TestImage5 from '../../../../../resources/test_images/5.png';
import TestImage6 from '../../../../../resources/test_images/6.jpeg';

// const mainFields = ['first_name', 'last_name', 'phone_number', 'email', 'notes'];
// const locationFields = ['street', 'city', 'state', 'zip'];

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const Title = styled.div`
  font-weight: bold;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  padding-right: 40px;
`;

class JobModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTeamMembers: [],
      specialInstructions: get(props.order, 'attributes.specialInstructions') || '',
      attachments: [
        {
          fileUri: TestImage1,
          fileType: 'image',
          fileName: ''
        },
        {
          fileType: 'pdf',
          fileName: 'MM_invoice.pdf'
        },
        {
          fileUri: TestImage2,
          fileType: 'image',
          fileName: ''
        },
        {
          fileUri: TestImage3,
          fileType: 'image',
          fileName: ''
        },
        {
          fileUri: TestImage4,
          fileType: 'image',
          fileName: ''
        },
        {
          fileUri: TestImage5,
          fileType: 'image',
          title: ''
        },
        {
          fileUri: TestImage6,
          fileType: 'image',
          fileName: ''
        }
      ],
      showNotesInfo: false,
      showCustomerInfo: false,
      showBoatInfo: true,
      showLocationInfo: true
    };
  }

  componentDidMount() {
    const { GetManagements } = this.props;
    GetManagements({ params: { page: 1, per_page: 1000 } });
  }

  onSend = () => {
    // if (this.mainInfoFields.validateFields()) {
    //   const values = this.mainInfoFields.getFieldValues();
    //   let user = {};
    //   const address_attributes = {}
    //   for (const key in values) {
    //     const value = get(values, key, '');
    //     if(mainFields.indexOf(key) > -1) {
    //       user[key] = value;
    //     } else if (locationFields.indexOf(key) > -1) {
    //       address_attributes[key] = value;
    //     }
    //   }
    //   if (address_attributes.street.trim().length > 0 ||
    //     address_attributes.city.trim().length > 0 ||
    //     address_attributes.state.trim().length > 0 ||
    //     address_attributes.zip.trim().length > 0) {
    //       user = {
    //         ...user,
    //         locations_attributes: [
    //           {
    //             name: 'Home Address',
    //             location_type: 'residential_address',
    //             address_attributes
    //           }
    //         ]
    //       };
    //     }
    //   this.props.onSave({ user });
    // }
  };

  handlePrint = () => {
  };

  handleTeamMemberChange = (member, isDeleting = false) => {
    const { selectedTeamMembers } = this.state;
    let selected = selectedTeamMembers.slice(0);
    if (isDeleting) {
      selected = selected.filter(item => item.value !== member.value);
    } else {
      selected.push(member);
    }
    this.setState({ selectedTeamMembers: selected });
  };

  handleChangeNotes = specialInstructions => {
    this.setState({ specialInstructions });
  };

  handleChangeVisibleOfNotesInfo = (showNotesInfo) => {
    this.setState({ showNotesInfo });
  };

  handleChangeVisibleOfCustomerInfo = (showCustomerInfo) => {
    this.setState({ showCustomerInfo });
  };

  handleChangeVisibleOfBoatInfo = (showBoatInfo) => {
    this.setState({ showBoatInfo });
  };

  handleChangeVisibleOfLocationInfo = (showLocationInfo) => {
    this.setState({ showLocationInfo });
  };

  handleAddAttachment = (attachment, resolve) => {
    const attachments = this.state.attachments.slice(0);
    attachments.push(attachment);
    this.setState({ attachments }, () => {
      if(resolve) {
        resolve();
      }
    })
  };

  handleDeleteAttachment = (index) => {
    const attachments = this.state.attachments.slice(0);
    attachments.splice(index, 1);
    this.setState({ attachments });
  }

  getOptions = () => {
    const { managements } = this.props;
    const { selectedTeamMembers } = this.state;
    if (managements) {
      const options = managements.map(management => (
        {
          value: management.id,
          label: `${management.relationships.user.attributes.firstName} ${management.relationships.user.attributes.lastName}`
        }
      ));
      return options.filter(o1 => selectedTeamMembers.filter(o2 => o2.value === o1.value).length === 0);
    }
    return [];
  };

  getOrderInfo = () => {
    const { order, privilege } = this.props;
    const customerInfo = getUserFromOrder(order, privilege);
    const boatInfo = getBoatFromOrder(order);
    return { boatInfo, customerInfo };
  };

  render() {
    const { open, onClose, loading } = this.props;
    const { showNotesInfo, showCustomerInfo, showBoatInfo, showLocationInfo, selectedTeamMembers, specialInstructions, attachments } = this.state;
    const { boatInfo, customerInfo } = this.getOrderInfo();
    const action = [
      <OrangeButton onClick={this.onSend} key='modal_btn_save'>Send</OrangeButton>
    ];
    const headers = (
      <ModalHeader>
        <Title>{'Job #1234-1'}</Title>
        <Actions>
          <GradientButton onClick={this.handlePrint}>
            <Image className='print' src={PrintIcon} />
          </GradientButton>
          <OrangeButton style={{ marginLeft: 30 }} onClick={this.onSend} key='modal_btn_save'>Send</OrangeButton>
        </Actions>
      </ModalHeader>
    );
    return (
      <Modal
        customHeader={headers}
        loading={loading}
        actions={action}
        open={open}
        onClose={onClose}
        large
      >
        <JobTitleSection
          selected={selectedTeamMembers}
          onChange={this.handleTeamMemberChange}
        />
        <JobSummarySection />
        <NotesSection
          contentVisible={showNotesInfo}
          notes={specialInstructions}
          onChangeVisible={this.handleChangeVisibleOfNotesInfo}
          onChange={this.handleChangeNotes}
        />
        <CustomerInfoSection
          contentVisible={showCustomerInfo}
          customerInfo={customerInfo}
          onChangeVisible={this.handleChangeVisibleOfCustomerInfo}
        />
        <BoatInfoSection
          contentVisible={showBoatInfo}
          boatInfo={boatInfo}
          onChangeVisible={this.handleChangeVisibleOfBoatInfo}
        />
        <LocationInfoSection
          contentVisible={showLocationInfo}
          boatInfo={boatInfo}
          onChangeVisible={this.handleChangeVisibleOfLocationInfo}
        />
        <AttachmentSection
          attachments={attachments}
          onAdd={this.handleAddAttachment}
          onDelete={this.handleDeleteAttachment}
        />
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  privilege: state.auth.privilege,
  managements: refinedManagementsSelector(state)
});

const mapDispatchToProps = {
  GetManagements
};

export default connect(mapStateToProps, mapDispatchToProps)(JobModal);