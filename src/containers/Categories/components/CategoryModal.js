import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import styled from 'styled-components';
import classNames from 'classnames';
import { get, isEmpty, startCase } from 'lodash';

import { actionTypes, GetIcons } from 'store/actions/icons';
import Modal from 'components/compound/Modal';
import FormFields from 'components/template/FormFields';
import { OrangeButton, HollowButton, UploadButton } from 'components/basic/Buttons';
import LoadingSpinner from 'components/basic/LoadingSpinner';
import { NormalText } from 'components/basic/Typho'

const Divider = styled.div`
  height: 20px;
  width: 100%;
`;

const IconSection = styled.div`
`;

const NoIcons = styled(NormalText)`
  width: 100%;
  text-align: center;
  margin-top: 30px;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  > span {
    font-size: 12px;
    font-family: Montserrat, sans-serif;
    text-transform: uppercase;
    font-weight: 700;
    color: #004258;
    margin-right: 20px;
  }

  .selected-icon {
    position: relative;
    width: 30px;
    height: 30px;
    margin: 2px;
    padding: 2px;
    border: 1px solid #dfdfdf;
    border-radius: 8px;
    background-image: url('https://dev.boatyard.com/img/logo.svg');
    background-size: contain;
    background-position: center;
    transition: all ease-in-out .2s;
    background-repeat: no-repeat;
    .close-icon {
      position: absolute;
      opacity: 0;
      right: -5px;
      top: -15px;
      font-size: 25px;
      transition: all ease-in-out .2s;
    }
    &.has-icon {
      cursor: pointer;
      .close-icon {
        cursor: pointer;
      }
    &:hover {
      &.has-icon {
      box-shadow: 0 3px 5px 1px rgba(0, 0, 0, 0.25);
        .close-icon {
          opacity: 1;
        }
      }
    }
  }
`;

const IconsContainer = styled.div`
  width: 100%;
  height: 156px;
  overflow: auto;
  display: flex;
  border: 1px solid #dfdfdf;
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
      border: 1px solid #dfdfdf;
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
      descriptionField: [],
      iconRef: null,
      customIcon: null,
      defaultIcon: null
    };
  }

  componentDidMount() {
    const { category } = this.props;
    const customIcon = get(category, 'customIcon.url');
    if (!isEmpty(customIcon)) {
      this.setState({ customIcon });
      this.refs.selectedIconContainer.style.backgroundImage = `url(${customIcon})`;
    }
    this.getCategoryFields();
    this.getDescriptionField();
    this.loadIcons();
  }

  loadIcons = (page = 1) => {
    const { GetIcons } = this.props;
    GetIcons({ params: { page } });
  };

  renderIcons = () => {
    const { icons } = this.props;
    const {defaultIcon } = this.state;
    if (isEmpty(icons)) {
      return (
        <NoIcons>There is no default icons.</NoIcons>
      );
    } else {
      return icons.map(icon => {
        return (
          <div
            className={classNames('service-icon-wrapper', icon.id === defaultIcon && '-selected')}
            onClick={() => this.handleChangeIcon(icon)}
          >
            <img className="service-icon" alt={icon.name} src={icon.icon} />
          </div>
        )
      });
    }
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

  handleFileChange = (file, ref) => {
    this.setState({ defaultIcon: null, iconRef: ref, customIcon: file });
    this.refs.selectedIconContainer.style.backgroundImage = `url(${file})`;
  }

  deleteCustomIcon = () => {
    const { customIcon, iconRef } = this.state;
    if (!isEmpty(customIcon)) {
      this.setState({ customIcon: null });
      this.refs.selectedIconContainer.style.backgroundImage = 'none';
      if (iconRef) {
        iconRef.value = '';
      }
    }
  };

  handleChangeIcon = (icon) => {
    this.setState({ customIcon: null, defaultIcon: icon.id });
  };

  onSave = () => {
    const { onSave } = this.props;
    const { defaultIcon, customIcon } = this.state;
    if (this.categoryFields.validateFields()) {
      let values = {
        ...this.categoryFields.getFieldValues(),
        ...this.descriptionField.getFieldValues()
      };
      values = {
        ...values,
        customIcon
      };
      if (defaultIcon) {
        values = {
          ...values,
          icon: defaultIcon
        };
      }
      onSave(values);
    } else {
      toastr.clean()
      toastr.error('Please fill out all the required fields')
    }
  };

  render() {
    const { loading, title, category, open, onClose, onDelete, currentStatus } = this.props;
    const { categoryFields, descriptionField, customIcon } = this.state;
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
            <span>Choose Icon</span>
            <UploadButton title="Upload Icon" accept="image/*" onFileChange={this.handleFileChange} />
            <div className={classNames('selected-icon', !isEmpty(customIcon) && 'has-icon' )} ref="selectedIconContainer" onClick={this.deleteCustomIcon}>
              <label className="close-icon">×</label>
            </div>
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
