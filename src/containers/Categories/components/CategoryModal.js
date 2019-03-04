import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import styled from 'styled-components';
import classNames from 'classnames';
import { get, isEmpty } from 'lodash';
import EvilIcon from 'react-evil-icons';

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
      right: -7px;
      top: -8px;
      width: 20px;
      height: 20px;
      fill: #004258;
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

const ContentSection = styled.div`
  position: relative;
  width: 100%;
  height: 156px;
  overflow: auto;
  border: 1px solid #dfdfdf;
  margin: 10px 0 30px;
`;
const IconsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  overflow: visible;

  .service-icon-wrapper {
    width: 30px;
    height: 30px;
    margin: 2px;
    padding:3px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover, &.-selected {
      padding:2px;
      border: 1px solid #dfdfdf;
      border-radius: 8px;  
    }
    > img {
      width: 100%;
    }
  }
`;

class CategoryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryFields: [],
      descriptionField: [],
      iconFile: null,
      iconRef: null,
      customIcon: null,
      defaultIcon: null
    };
  }

  componentDidMount() {
    const { category } = this.props;
    const defaultIcon = get(category, 'iconId');
    const customIcon = get(category, 'customIcon.url');
    this.setState({ defaultIcon, customIcon }, () => {
      if (!defaultIcon) {
        if (!isEmpty(customIcon)) {
          this.setState({ customIcon });
          this.refs.selectedIconContainer.style.backgroundImage = `url(${customIcon})`;
        }
      }
      this.getCategoryFields();
      this.getDescriptionField();
      this.loadIcons();
    });
  }

  loadIcons = (page = 1) => {
    const { GetIcons } = this.props;
    GetIcons({ params: { page, per_page: 1000 } });
  };

  renderIcons = () => {
    const { icons } = this.props;
    const { defaultIcon } = this.state;
    const iconId = defaultIcon ? defaultIcon.toString() : '';
    if (isEmpty(icons)) {
      return (
        <NoIcons>There is no default icons.</NoIcons>
      );
    } else {
      return icons.map(icon => {
        const iconName = get(icon, 'name');
        const iconURL = get(icon, 'icon.url');
        return (
          <div
            key={`icon_${icon.id}`}
            className={classNames('service-icon-wrapper', icon.id === iconId && '-selected')}
            onClick={() => this.handleChangeIcon(icon)}
          >
            <img className="service-icon" alt={iconName} src={iconURL} />
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
        type: 'currency_field',
        required: false,
        placeholder: '$0.00',
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

  handleFileChange = (file, baseString, ref) => {
    this.setState({ defaultIcon: null, iconFile: file, iconRef: ref, customIcon: baseString });
    this.refs.selectedIconContainer.style.backgroundImage = `url(${baseString})`;
  }

  deleteCustomIcon = () => {
    const { customIcon, iconRef } = this.state;
    if (!isEmpty(customIcon)) {
      this.setState({ iconFile: null, customIcon: null });
      this.refs.selectedIconContainer.style.backgroundImage = 'none';
      if (iconRef) {
        iconRef.value = '';
      }
    }
  };

  handleChangeIcon = (icon) => {
    this.deleteCustomIcon();
    this.setState({ defaultIcon: icon.id });
  };

  onSave = () => {
    const { onSave } = this.props;
    const { defaultIcon, iconFile, customIcon } = this.state;
    if (this.categoryFields.validateFields()) {
      let values = {
        ...this.categoryFields.getFieldValues(),
        ...this.descriptionField.getFieldValues(),
      };
      values = {
        ...values,
        cost: values.cost || '0'
      };
      if (defaultIcon) {
        values = {
          ...values,
          icon_id: defaultIcon
        };
      }
      onSave(values, iconFile, customIcon);
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
        title={category.name || title}
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
              <EvilIcon name="ei-close-o" size="s" className="close-icon" />
            </div>
          </HeaderSection>
          <ContentSection>
              {currentStatus === actionTypes.GET_ICONS ?
                <LoadingSpinner
                  loading={true}
                />
              : 
              <IconsContainer>
                {this.renderIcons()}
              </IconsContainer>
              }
          </ContentSection>
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
