import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-flexbox-grid';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { toastr } from 'react-redux-toastr';
import deepEqual from 'fast-deep-equal';

import { actionTypes, GetManagement, FilterManagements, CreateManagement, UpdateManagement, DeleteManagement } from 'store/actions/managements';
import { GetProviderLocations } from 'store/actions/providerLocations';
import { UpdateProvider } from 'store/actions/providers';
import { refinedProviderLocationSelector } from 'store/selectors/providerLocation';
import { InputRow, InputWrapper, Input, Select } from 'components/basic/Input';
import { Section } from 'components/basic/InfoSection';
import LoadingSpinner from 'components/basic/LoadingSpinner';
import { NormalText, PageTitle } from 'components/basic/Typho'
import { OrangeButton, HollowButton } from 'components/basic/Buttons';
import { EditorSection } from 'components/compound/SubSections';
import Modal from 'components/compound/Modal';
import { TeamDetailsHeader, LocationSelector } from '../../components';
import { validateEmail, formatPhoneNumber } from 'utils/basic';
import CloseIcon from '../../../../resources/job/close.png';

const Wrapper = styled.div`
`;

const ContentWrapper = styled.div`
  // background-color: white;
  margin: 30px 25px;
`;

const HeaderWrapper = styled.div`
  background-color: white;
`;

const InputFieldWrapper = styled(InputWrapper)`
  margin-bottom: 20px;
`;

const Label = styled.div`
  font-family: Helvetica;
  font-size: 14px;
  color: #003247;
  text-align: left;
  margin-bottom: 20px;
`;

export const Description = styled(NormalText)`
  font-family: 'Open sans-serif', sans-serif;
  padding: 10px 0;
`;

// const PermissionText = styled.div`
//   font-family: 'Source Sans Pro', sans-serif;
//   font-size: 14px;
//   color: #333;
//   text-transform: capitalize;
// `;

const LocationItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px 5px 20px;
  border: 1px solid #A9B5BB;
  border-radius: 6px;
  margin-bottom: 12px;
`;

const LocationTitle = styled.div`
  font-family: 'Open sans-serif', sans-serif;
  font-size: 14px;
  color: #184961;
  width: calc(100% - 50px);
  line-height: 16px;
`;

const DeleteIcon = styled.img`
  cursor: pointer;
`;

class TeamDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saving: false,
      managementId: null,
      management: {},
      userId: null,
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      access: 'admin',
      errorMessage: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: ''
      },
      selectedLocations: [],
      visibleOfConfirmationModal: false
    };
  }

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    const managementId = query.id;
    if (managementId) {
      this.getManagement(managementId);
    }
  }

  componentDidUpdate(prevProps) {
    if(!deepEqual(prevProps.managements, this.props.managements)) {
      this.setSelectedLocations();
    }
  }

  getManagement = (managementId) => {
    this.setState({ managementId }, () => {
      this.props.GetManagement({ managementId,
        success: (management) => {
          const userId = get(management, 'attributes.userId') || '';
          const providerId = get(management, 'attributes.providerId') || '';
          const firstName = get(management, 'relationships.user.attributes.firstName') || '';
          const lastName = get(management, 'relationships.user.attributes.lastName') || '';
          const phoneNumber = get(management, 'relationships.user.attributes.phoneNumber') || '';
          const email = get(management, 'relationships.user.attributes.email') || '';
          const access = get(management, 'attributes.access') || 'admin';
          this.setState({ management, userId, providerId, firstName, lastName, phoneNumber: formatPhoneNumber(phoneNumber), email, access }, () => {
            this.filterManagements();
          });
          const { GetProviderLocations } = this.props;
          GetProviderLocations({
            providerId,
            params: { page: 1, per_page: 100 },
            error: (e) => {
              toastr.error('Error', e.message);
            }
          });
        },
        error: () => {
          toastr.error('Error', 'Member does not exist!');
          this.onBack();
        }
      });
    });
  }

  filterManagements = () => {
    const { FilterManagements } = this.props;
    const { userId, providerId } = this.state;
    FilterManagements({
      params: {
        'management[user_id]': userId,
        'management[provider_id]': providerId
      },
      success: () => {
        this.setSelectedLocations();
      },
      error: (e) => {
        toastr.error('Error', e.message);
      }
    });
  }

  isValidForm = () => {
    const { firstName, lastName, phoneNumber, email } = this.state;
    let hasError = false;
    let errorMessage = {
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: ''
    };
    if (firstName.trim().length <= 0) {
      errorMessage = {
        ...errorMessage,
        firstName: 'First Name is Required'
      };
      hasError = hasError || true;
    }
    if (lastName.trim().length <= 0) {
      errorMessage = {
        ...errorMessage,
        lastName: 'Last Name is Required'
      };
      hasError = hasError || true;
    }
    if (phoneNumber.trim().length <= 0) {
      errorMessage = {
        ...errorMessage,
        phoneNumber: 'Phone Number is Required'
      };
      hasError = hasError || true;
    }
    if (email.trim().length <= 0) {
      errorMessage = {
        ...errorMessage,
        email: 'Email is Required'
      };
      hasError = hasError || true;
    } else if (!validateEmail(email)) {
      errorMessage = {
        ...errorMessage,
        email: 'Invalid Email'
      };
      hasError = hasError || true;
    }
    this.setState({ errorMessage });
    return !hasError;
  }

  handlePermissionChange = (evt) => {
    const access = evt.target.value;
    this.setState({ access });
  };

  onChangeFN = evt => {
    this.setState({
      firstName: evt.target.value
    });
  };

  onChangeLN = evt => {
    this.setState({
      lastName: evt.target.value
    });
  };

  onChangeEmail = evt => {
    this.setState({
      email: evt.target.value
    });
  };

  onChangePN = evt => {
    this.setState({
      phoneNumber: evt.target.value
    });
  };

  showConfirmationModal = () => {
    this.setState({
      visibleOfConfirmationModal: true
    });
  };

  hideConfirmationModal = () => {
    this.setState({
      visibleOfConfirmationModal: false
    });
  };

  onBack = () => {
    this.props.history.push(`/team`);
  }

  onSave = () => {
    const { managementId, access } = this.state;
    const { CreateManagement, UpdateManagement } = this.props;
    if (this.isValidForm()) {
      const { firstName, lastName, email, phoneNumber } = this.state;
      const data = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        phone_number: phoneNumber.trim(),
        access
      };
      this.setState({ saving: true });
      if (managementId) {
        UpdateManagement({
          managementId,
          data: {
            management: data
          },
          success: () => {
            this.setState({ saving: false });
            toastr.success('Success', 'Saved successfully!');
            this.onBack();
          },
          error: (e) => {
            this.setState({ saving: false });
            toastr.error('Error', e.message);
          }
        });
      } else {
        if (this.props.privilege === 'admin') {
          data['provider_id'] = '1';
        }
        CreateManagement({
          data: {
            management: data
          },
          success: () => {
            this.setState({ saving: false });
            toastr.success('Success', 'Created successfully!');
            this.onBack();
          },
          error: (e) => {
            this.setState({ saving: false });
            toastr.error('Error', e.message);
          }
        });
      }
    }
  };

  deleteTeamMember = () => {
    const { DeleteManagement } = this.props;
    const { managementId } = this.state;
    DeleteManagement({
      managementId,
      success: () => {
        this.onBack();
      }
    });
  };

  setSelectedLocations = () => {
    const { providerId } = this.state;
    const { providerLocations, managements } = this.props;
    const filteredManagements = managements.filter(management => management.providerId === providerId && management.providerLocationId);
    const selectedLocations = providerLocations.filter(
      location => filteredManagements.filter(management => parseInt(location.id) === parseInt(management.providerLocationId)).length > 0
    );
    this.setState({ selectedLocations });
  }

  handleUpdateLocations = (locations) => {
    const { userId, providerId, access } = this.state;
    const { managements } = this.props;
    const filteredManagements = managements.filter(management => management.providerId === providerId && management.providerLocationId);
    const newLocations = locations.filter(
      location => filteredManagements.filter(management => parseInt(location.id) === parseInt(management.providerLocationId)).length === 0
    );

    const deletedManagements = filteredManagements.filter(
      management => locations.filter(location => parseInt(location.id) === parseInt(management.providerLocationId)).length === 0
    );
    const newManagementAttributes = newLocations.map(location => {
      return {
        user_id: userId,
        provider_location_id: location.id,
        access
      };
    });

    const deletedManagementAttributes = deletedManagements.map(management => {
      return {
        id: management.id,
        "_destroy": true
      };
    });

    const { UpdateProvider } = this.props;
    UpdateProvider({
      authType: 'provider',
      providerId,
      data: {
        provider: {
          managements_attributes: deletedManagementAttributes.concat(newManagementAttributes)
        }
      },
      success: () => {
        toastr.success('Success', 'Updated successfully!');
        this.filterManagements();
      },
      error: (e) => {
        toastr.error('Error', e.message);
      }
    });
  };

  deleteLocation = (location) => {
    const { providerId } = this.state;
    const { managements } = this.props;
    const filteredManagements = managements.filter(management => management.providerId === providerId && management.providerLocationId);
    const deletedManagement = filteredManagements.find(management => parseInt(location.id) === parseInt(management.providerLocationId));
    if (deletedManagement) {
      const { UpdateProvider } = this.props;
      UpdateProvider({
        authType: 'provider',
        providerId,
        data: {
          provider: {
            managements_attributes: [
              {
                id: deletedManagement.id,
                "_destroy": true
              }
            ]
          }
        },
        success: () => {
          toastr.success('Success', 'Deleted successfully!');
          this.filterManagements();
        },
        error: (e) => {
          toastr.error('Error', e.message);
        }
      });
    }
  };

  render() {
    const {
      saving,
      managementId,
      firstName,
      lastName,
      phoneNumber,
      email,
      access,
      errorMessage,
      selectedLocations,
      visibleOfConfirmationModal
    } = this.state;
    const { privilege, currentStatus, providerLocations } = this.props;
    const loading = currentStatus === actionTypes.GET_MANAGEMENT;
    const actions = (
      <React.Fragment>
        <HollowButton onClick={this.onBack} style={{ marginRight: 30 }}>Cancel</HollowButton>
        <OrangeButton onClick={this.onSave} style={{ minWidth: 100 }}>Save</OrangeButton>
      </React.Fragment>
    );
    const modalActions = [
      <HollowButton onClick={this.hideConfirmationModal} key="modal_btn_cancel">Cancel</HollowButton>,
      <OrangeButton onClick={this.deleteTeamMember} key="modal_btn_save">Confirm</OrangeButton>
    ];
    const editSection = (
      <React.Fragment>
        <InputRow>
          <InputFieldWrapper className="secondary">
            <Label>First Name</Label>
            <Input
              type="text"
              value={firstName}
              onChange={this.onChangeFN}
              hasError={errorMessage['firstName'].length >= 0}
              errorMessage={errorMessage['firstName']}
            />
          </InputFieldWrapper>
          <InputFieldWrapper className="secondary">
            <Label>Last Name</Label>
            <Input
              type="text"
              value={lastName}
              onChange={this.onChangeLN}
              hasError={errorMessage['lastName'].length >= 0}
              errorMessage={errorMessage['lastName']}
            />
          </InputFieldWrapper>
        </InputRow>
        <InputRow>
          <InputFieldWrapper className="secondary">
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={this.onChangeEmail}
              hasError={errorMessage['email'].length >= 0}
              errorMessage={errorMessage['email']}
            />
          </InputFieldWrapper>
          <InputFieldWrapper className="secondary">
            <Label>Phone</Label>
            <Input
              type="text"
              value={phoneNumber}
              onChange={this.onChangePN}
              mask='(999) 999-9999'
              hasError={errorMessage['phoneNumber'].length >= 0}
              errorMessage={errorMessage['phoneNumber']}
            />
          </InputFieldWrapper>
        </InputRow>
        <InputRow>
          <InputFieldWrapper className="secondary">
            <Label>Permissions</Label>
            <Select
              value={access}
              onChange={this.handlePermissionChange}
            >
              <React.Fragment>
                <option value="admin">Admin</option>
                <option value="team_member">Team Member</option>
                <option value="contractor">Contractor</option>
              </React.Fragment>
            </Select>
          </InputFieldWrapper>
          <InputFieldWrapper />
        </InputRow>
      </React.Fragment>
    );
    return (
      <Wrapper>
        {!loading && <React.Fragment>
          <HeaderWrapper>
            {managementId && <TeamDetailsHeader title={`${firstName} ${lastName}`} onAction={this.showConfirmationModal} />}
            {!managementId && <PageTitle style={{ padding: '25px 30px' }}>Add New Member</PageTitle>}
          </HeaderWrapper>
          <ContentWrapper>
            {(privilege === 'provider' || privilege === 'admin') && <Row>
              <Col xs={12} sm={12} md={8} lg={9}>
                <Section title='Contact' headerStyle={{ padding: 25 }}>
                  <EditorSection containerStype={{ padding: '30px 15px' }} actions={actions} content={editSection} />
                </Section>
              </Col>
              <Col xs={12} sm={12} md={4} lg={3}>
                <Section
                  title='Locations'
                  mode='view'
                  headerStyle={{ padding: '20px 25px' }}
                  contentStyle={{ minHeight: 439 }}
                  editComponent={<LocationSelector
                    locations={providerLocations}
                    selected={selectedLocations}
                    onChange={this.handleUpdateLocations}/>
                  }
                >
                  {selectedLocations.map(location => (
                    <LocationItem key={`location_${location.id}`}>
                      <LocationTitle>{get(location, 'relationships.locations.attributes.name')}</LocationTitle>
                      <DeleteIcon src={CloseIcon} onClick={() => this.deleteLocation(location)}/>
                    </LocationItem>
                  ))}
                </Section>
              </Col>
            </Row>}
            {!(privilege === 'provider' || privilege === 'admin') && <Row>
              <Col xs={12} sm={12} md={8} lg={9}>
                <Section title='Contact' headerStyle={{ padding: 25 }}>
                  <EditorSection containerStype={{ padding: '30px 15px' }} actions={actions} content={editSection} />
                </Section>
              </Col>
            </Row>}
          </ContentWrapper>
        </React.Fragment>}
        <Modal
          title={'Are You Sure?'}
          actions={modalActions}
          normal={true}
          open={visibleOfConfirmationModal}
          onClose={this.hideConfirmationModal}
        >
          <Description>Deleting {`${firstName} ${lastName}`}&#39;s account is permanent and cannot be undone.</Description>
        </Modal>
        {((managementId && loading) || saving) && <LoadingSpinner
          loading={loading || saving}
        />}
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  currentStatus: state.management.currentStatus,
  privilege: state.auth.privilege,
  ...refinedProviderLocationSelector(state),
  managements: state.management.filteredManagements
});

const mapDispatchToProps = {
  GetManagement,
  FilterManagements,
  CreateManagement,
  UpdateManagement,
  DeleteManagement,
  UpdateProvider,
  GetProviderLocations
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetails);
