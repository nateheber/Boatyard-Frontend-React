import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import styled from 'styled-components';
import { get, isEmpty, startCase } from 'lodash';

import { actionTypes, GetIcons } from 'store/actions/icons';
import Modal from 'components/compound/Modal';
import FormFields from 'components/template/FormFields';
import { OrangeButton, HollowButton } from 'components/basic/Buttons';
import LoadingSpinner from 'components/basic/LoadingSpinner';

const Divider = styled.div`
  height: 20px;
  width: 100%;
`;

const IconSection = styled.div`
`;

const HeaderSection = styled.div`
  > label {
    font-size: 12px;
    font-family: Montserrat, sans-serif;
    text-transform: uppercase;
    font-weight: 700;
    color: #004258;
    margin-right: 20px;
  }
`;

const IconsContainer = styled.div`
  width: 100%;
  height: 156px;
  overflow: auto;
  display: flex;
  background: gray;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 10px 0 30px;
  position: relative;

  .service-icon-wrapper {
    width: 30px;
    height: 30px;
    margin: 2px;
    padding:2px;
    cursor: pointer;
    &.-selected {
      border: 1px solid wheat;
      border-radius: 8px;  
    }
    > img {
      width: 100%;
      height: 100%;
    }
  }
`;

class CategoryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryFields: [],
      descriptionField: []
    };
  }

  componentDidMount() {
    this.getCategoryFields();
    this.getDescriptionField();
    this.loadIcons();
  }

  onSave = () => {
    const { onSave } = this.props;
    if (this.categoryFields.validateFields()) {
      const values = {
        ...this.categoryFields.getFieldValues(),
        ...this.descriptionField.getFieldValues()
      };
      onSave(values);
    } else {
      toastr.clean()
      toastr.error('Please fill out all the required fields')
    }
  };

  loadIcons = (page = 1) => {
    const { GetIcons } = this.props;
    GetIcons({ params: { page } });
  };

  getCategoryFields = () => {
    const { category } = this.props;
    const name = get(category, 'name');
    const cost = get(category, 'cost');
    const costType = get(category, 'costType');
    const isTaxable = get(category, 'isTaxable');

    const priceTypes = [
      {
        value: null,
        label: 'None'
      },
      {
        value: 'Length',
        label: 'Length'
      },
      {
        value: 'Gallons',
        label: 'Gallons'
      },
      {
        value: 'Hour',
        label: 'Hour'
      },
      {
        value: 'Quantity',
        label: 'Quantity'
      }
    ];
    
    const categoryFields = [
      {
        field: 'name',
        label: 'Name',
        type: 'text_field',
        errorMessage: 'Enter Category name',
        required: true,
        defaultValue: name,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 4,
        xl: 4
      },
      {
        field: 'cost',
        label: 'Price',
        type: 'text_field',
        required: false,
        defaultValue: cost,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 3,
        xl: 3
      },
      {
        field: 'cost_type',
        label: 'Price Type',
        type: 'select_box',
        options: priceTypes,
        defaultValue: costType,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 3,
        xl: 3
      },
      {
        field: 'is_taxable',
        label: 'Taxable',
        type: 'check_box',
        defaultValue: isTaxable,
        xs: 12,
        sm: 12,
        md: 6,
        lg: 2,
        xl: 2
      }
    ];

    this.setState({ categoryFields });
  };

  getDescriptionField = () => {
    const { category } = this.props;
    const description = get(category, 'description');
    const descriptionField = [
      {
        field: 'description',
        label: 'Description',
        type: 'text_area',
        defaultValue: description,
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12
      }
    ];

    this.setState({ descriptionField });
  };

  setCategoryFieldsRef = ref => {
    this.categoryFields = ref;
  };

  setDescriptionFieldRef = ref => {
    this.descriptionField = ref;
  }

  renderIcons = () => {
    const { icons } = this.props;
    return (
      <React.Fragment>
        <div className="service-icon-wrapper -selected"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
        <div className="service-icon-wrapper"><img className="service-icon" alt="service" src="https://dev.boatyard.com/img/logo.svg" /></div>
      </React.Fragment>
    );
  };

  render() {
    const { loading, title, category, open, onClose, onDelete, currentStatus } = this.props;
    const { categoryFields, descriptionField } = this.state;
    const actions = isEmpty(category) ? 
      [<OrangeButton onClick={this.onSave} key="modal_btn_save">Add Category</OrangeButton>]
      :
      [
        <HollowButton onClick={onDelete} key="modal_btn_cancel">Delete</HollowButton>,
        <OrangeButton onClick={this.onSave} key="modal_btn_save">Update Category</OrangeButton>
      ];
    return (
      <Modal
        title={startCase(category.name) || title}
        loading={loading}
        actions={actions}
        open={open}
        onClose={onClose}
      >
        <IconSection>
          <HeaderSection>
            <label>Choose Icon</label>
            <HollowButton>Upload Icon</HollowButton>
          </HeaderSection>
          <IconsContainer>
            {currentStatus === actionTypes.GET_ICONS ?
              <LoadingSpinner
                loading={true}
              />
            : this.renderIcons()}
          </IconsContainer>
        </IconSection>
        <FormFields
          ref={this.setCategoryFieldsRef}
          fields={categoryFields}
        />
        <Divider />
        <FormFields
          ref={this.setDescriptionFieldRef}
          fields={descriptionField}
        />
      </Modal>
    );
  }
}

const mapStateToProps = ({ icon : {currentStatus, icons, page, perPage, total }}) => ({
  currentStatus,
  icons,
  page,
  perPage,
  total
});

const mapDispatchToProps = {
  GetIcons
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoryModal);
