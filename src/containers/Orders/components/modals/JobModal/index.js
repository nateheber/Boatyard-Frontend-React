import React from 'react';
import { get } from 'lodash';
import styled from 'styled-components';
import { Row, Col } from 'react-flexbox-grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormFields from 'components/template/FormFields';

import { HollowButton, OrangeButton } from 'components/basic/Buttons'
import Modal from 'components/compound/Modal';
import {
  InputWrapper,
  InputLabel,
  Input,
  CheckBox,
  TextArea,
  Select,
  DateSelector,
  CurrencyInput
} from 'components/basic/Input';
import { formatPhoneNumber } from 'utils/basic';
import GradientButton from '../../basic/GradientButton';
import AddIcon from '../../../../../resources/job/add.png';
import CloseIcon from '../../../../../resources/job/close.png';
import LeftArrowIcon from '../../../../../resources/job/left_arrow.png';
import RightArrowIcon from '../../../../../resources/job/right_arrow.png';
import PrintIcon from '../../../../../resources/job/print.png';
import PdfIcon from '../../../../../resources/job/pdf.png';
import TestImage1 from '../../../../../resources/test_images/1.png';
import TestImage2 from '../../../../../resources/test_images/2.png';
import TestImage3 from '../../../../../resources/test_images/3.png';
import TestImage4 from '../../../../../resources/test_images/4.png';
import TestImage5 from '../../../../../resources/test_images/5.png';
import TestImage6 from '../../../../../resources/test_images/6.jpeg';


const mainFields = ['first_name', 'last_name', 'phone_number', 'email', 'notes'];
const locationFields = ['street', 'city', 'state', 'zip'];
const LOCATION_TYPES = [
  { value: 'marina', label: 'Marina' },
  { value: 'private_dock', label: 'Private Dock' },
  { value: 'trailer', label: 'Trailer' },
  { value: 'dry_storage', label: 'Dry Storage' }
];

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const Title = styled.div`
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  padding-right: 40px;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const SectionHeader = styled.div`
  background: #F5F5F5;
  height: 80px;
  padding: 0 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled.div`
  font-family: Montserrat-Bold;
  font-size: 18px;
  color: #003247;
  text-align: left;
`;

const HeaderInputLabel = styled.label`
  font-family: Montserrat-Bold;
  font-size: 12px;
  color: #003247;
  text-align: center;
  text-decoration: uppercase;
  margin-right: 5px;
  width: 70px;
`;

const SectionContent = styled.div`
  background: #FFFFFF;
  border: 1px solid #A9B5BB;
  padding: 25px;
  &.hidden {
    display: none;
  }
`;

const Column = styled(Col)`
  align-items: center;
  display: flex;
`;

const AttachmentSlider = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Attachment = styled.div`
  display: flex;
  width: 120px;
  min-width: 120px;
  height: 120px;
  background: #FFFFFF;
  border: 1px solid #A9B5BB;
  border-radius: 6px;
  margin-left: 20px;
  &:first-child {
    margin-left: 0;
  }
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &.pdf {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > img {
      width: 42px;
      height: 46px;
    }
  }
`;

const AttachmentsContainer = styled.div`
  width: calc(100% - 100px);
  display: flex;
  align-items: center;
  height: 130px;
  overflow: auto;
`;

const Image = styled.img`
  width: 11px;
  &.arrow {
    width: 5px;
  }
  &.print {
    width: 18px;
  }
`;

const AttachmentTitle = styled.div`
  font-family: Helvetica;
  font-size: 10px;
  color: #003247;
  margin-top: 18px;
`;

export default class JobModal extends React.Component {
  setCustomerInfoFieldRef = (ref) => {
    this.customerInfoFields = ref;
  };

  setBoatInfoFieldRef = (ref) => {
    this.boatInfoFields = ref;
  };

  setLocationInfoFieldRef = (ref) => {
    this.locationInfoFields = ref;
  };

  getCustomerInfoFieldsInfo = () => {
    const customerInfo = get(this.props, 'customerInfo', {
      firstName: 'Mykolas',
      lastName: 'Kvieska',
      phoneNumber: '2344536783',
      email: 'mykolas@gmail.com'
    });
    const {
      firstName,
      lastName,
      phoneNumber,
      email
    } = customerInfo;

    const fields = [
      {
        type: 'text_field',
        field: 'first_name',
        label: 'First Name',
        errorMessage: 'Enter First Name',
        required: true,
        defaultValue: firstName,
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
        xl: 3
      },
      {
        type: 'text_field',
        field: 'last_name',
        label: 'Last Name',
        errorMessage: 'Enter Last Name',
        required: true,
        defaultValue: lastName,
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
        xl: 3
      },
      {
        type: 'text_field',
        field: 'email',
        label: 'Email',
        errorMessage: 'Enter Email',
        required: true,
        defaultValue: email,
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
        xl: 3
      },
      {
        type: 'text_field',
        field: 'phone_number',
        label: 'Phone Number',
        errorMessage: 'Enter Phone Number',
        mask: '(999) 999-9999',
        required: true,
        defaultValue: formatPhoneNumber(phoneNumber),
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
        xl: 3
      }
    ]
    return fields;
  };

  getBoatInfoFieldsInfo = () => {
    const boatInfo = get(this.props, 'boatInfo', {
      name: 'Ship & Giggles',
      make: 'Sea Ray',
      model: 'Sundancer',
      length: '40ft'
    });
    const {
      name,
      make,
      model,
      length
    } = boatInfo;

    const fields = [
      {
        type: 'text_field',
        field: 'name',
        label: 'Name',
        errorMessage: 'Enter Name',
        required: true,
        defaultValue: name,
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
        xl: 3
      },
      {
        type: 'text_field',
        field: 'make',
        label: 'Make',
        errorMessage: 'Enter Make',
        required: true,
        defaultValue: make,
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
        xl: 3
      },
      {
        type: 'text_field',
        field: 'model',
        label: 'Model',
        errorMessage: 'Enter Model',
        required: true,
        defaultValue: model,
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
        xl: 3
      },
      {
        type: 'text_field',
        field: 'length',
        label: 'Length',
        errorMessage: 'Enter Length',
        required: true,
        defaultValue: length,
        xs: 12,
        sm: 6,
        md: 3,
        lg: 3,
        xl: 3
      }
    ]
    return fields;
  };

  getLocationInfoFieldsInfo = () => {
    const locationInfo = get(this.props, 'locationInfo', {
      billingAddress: '123 Ave',
      city: 'Miami Beach',
      state: 'FL',
      zipcode: '33140',
      make: 'Sea Ray',
      locationType: 'Marian',
      slip: '100'
    });
    const {
      billingAddress,
      city,
      state,
      zipcode,
      locationType,
      slip
    } = locationInfo;

    const fields = [
      {
        type: 'text_field',
        field: 'address',
        label: 'Address',
        errorMessage: 'Enter Address',
        required: true,
        defaultValue: `${billingAddress}, ${city}, ${state}${zipcode}`,
        xs: 12,
        sm: 4,
        md: 4,
        lg: 4,
        xl: 4
      },
      {
        type: 'select_box',
        field: 'location_type',
        label: 'Location Type',
        errorMessage: 'Select Location Type',
        required: true,
        defaultValue: locationType,
        options: LOCATION_TYPES,
        xs: 12,
        sm: 4,
        md: 4,
        lg: 4,
        xl: 4
      },
      {
        type: 'text_field',
        field: 'slip',
        label: 'Slip #',
        errorMessage: 'Enter Slip Number',
        required: true,
        defaultValue: slip,
        xs: 12,
        sm: 4,
        md: 4,
        lg: 4,
        xl: 4
      }
    ]
    return fields;
  };

  onSend = () => {
    if (this.mainInfoFields.validateFields()) {
      const values = this.mainInfoFields.getFieldValues();
      let user = {};
      const address_attributes = {}
      for (const key in values) {
        const value = get(values, key, '');
        if(mainFields.indexOf(key) > -1) {
          user[key] = value;
        } else if (locationFields.indexOf(key) > -1) {
          address_attributes[key] = value;
        }
      }
      if (address_attributes.street.trim().length > 0 ||
        address_attributes.city.trim().length > 0 ||
        address_attributes.state.trim().length > 0 ||
        address_attributes.zip.trim().length > 0) {
          user = {
            ...user,
            locations_attributes: [
              {
                name: 'Home Address',
                location_type: 'residential_address',
                address_attributes
              }
            ]
          };
        }
      this.props.onSave({ user });
    }
  };

  handlePrint = () => {
  };

  handleAddAttachment = () => {
  };

  render() {
    const { open, onClose, loading } = this.props;
    const action = [
      <OrangeButton onClick={this.onSend} key="modal_btn_save">Send</OrangeButton>
    ];
    const headers = (
      <ModalHeader>
        <Title>{'Job #1234-1'}</Title>
        <Actions>
          <GradientButton onClick={this.handlePrint}>
            <Image className='print' src={PrintIcon} />
          </GradientButton>
          <OrangeButton style={{ marginLeft: 30 }} onClick={this.onSend} key="modal_btn_save">Send</OrangeButton>
        </Actions>
      </ModalHeader>
    );
    const customerFields = this.getCustomerInfoFieldsInfo();
    const boatFields = this.getBoatInfoFieldsInfo();
    const locationFields = this.getLocationInfoFieldsInfo();
    return (
      <Modal
        customHeader={headers}
        loading={loading}
        actions={action}
        open={open}
        onClose={onClose}
        large
      >
        <Section>
          <SectionHeader>
            <Column>
              <Input style={{ width: 205 }} placeholder='Job Title' />
            </Column>
            <Column>
              <HeaderInputLabel>Assign To:</HeaderInputLabel>
              <Input style={{ width: 205 }} placeholder='Team Member' />
            </Column>
          </SectionHeader>
          <SectionContent></SectionContent>
        </Section>

        <Section>
          <SectionHeader>
            <HeaderTitle>Job Summary</HeaderTitle>
              <GradientButton onClick={this.handleAddSummary}>
                <Image src={AddIcon} />
              </GradientButton>
          </SectionHeader>
          <SectionContent>
          </SectionContent>
        </Section>

        <Section>
          <SectionHeader>
            <HeaderTitle>Customer Info</HeaderTitle>
          </SectionHeader>
          <SectionContent>
            <FormFields
              ref={this.setCustomerInfoFieldRef}
              fields={customerFields}
            />
          </SectionContent>
        </Section>
        <Section>
          <SectionHeader>
            <HeaderTitle>Boat Info</HeaderTitle>
          </SectionHeader>
          <SectionContent>
            <FormFields
              ref={this.setBoatInfoFieldRef}
              fields={boatFields}
            />
          </SectionContent>
        </Section>

        <Section>
          <SectionHeader>
            <HeaderTitle>Location</HeaderTitle>
          </SectionHeader>
          <SectionContent>
            <FormFields
              ref={this.setLocationInfoFieldRef}
              fields={locationFields}
            />
          </SectionContent>
        </Section>

        <Section>
          <SectionHeader>
            <HeaderTitle>Attachments</HeaderTitle>
              <GradientButton onClick={this.handleAddAttachment}>
                <Image src={AddIcon} />
              </GradientButton>
          </SectionHeader>
          <SectionContent>
            <AttachmentSlider>
              <GradientButton onClick={this.handleMoveLeft}>
                <Image className='arrow' src={LeftArrowIcon} />
              </GradientButton>
              <AttachmentsContainer>
                <Attachment>
                  <Image src={TestImage1}></Image>
                </Attachment>
                <Attachment className='pdf'>
                  <Image src={PdfIcon}></Image>
                  <AttachmentTitle>{'MM_invoice.pdf'}</AttachmentTitle>
                </Attachment>
                <Attachment>
                  <Image src={TestImage2}></Image>
                </Attachment>
                <Attachment>
                  <Image src={TestImage3}></Image>
                </Attachment>
                <Attachment>
                  <Image src={TestImage4}></Image>
                </Attachment>
                <Attachment>
                  <Image src={TestImage5}></Image>
                </Attachment>
                <Attachment>
                  <Image src={TestImage6}></Image>
                </Attachment>
              </AttachmentsContainer>
              <GradientButton onClick={this.handleMoveRight}>
                <Image className='arrow' src={RightArrowIcon} />
              </GradientButton>
            </AttachmentSlider>
          </SectionContent>
        </Section>
      </Modal>
    );
  }
}
