import React from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
import styled from 'styled-components';
import classNames from 'classnames';
import { get, isEmpty, set, startCase } from 'lodash';
import EvilIcon from 'react-evil-icons';
import deepEqual from 'deep-equal';

import { actionTypes, GetIcons } from 'store/actions/icons';
import Modal from 'components/compound/Modal';
import FormFields from 'components/template/FormFields';
import { OrangeButton, HollowButton, UploadButton } from 'components/basic/Buttons';
import LoadingSpinner from 'components/basic/LoadingSpinner';
import { NormalText } from 'components/basic/Typho'

import BackIcon from 'resources/back.svg';

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
  height: 200px;
  overflow: auto;
  margin: 10px 0 30px;
`;
const IconsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  overflow: visible;

  .service-icon-wrapper {
    width: 68px;
    height: 68px;
    margin: 10px;
    padding: 3px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #dfdfdf;
    background-color: #eeeeee;
    border-radius: 8px;
    &:hover, &.-selected {
      padding:3px;
      background-color: white;
    }
    > img {
      width: 100%;
    }
  }
`;

const EditorSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
`;

const EditorArea = styled.div`
  flex: 1;
  box-sizing: border-box;
  padding-right: 46px;
`;

const PreviewArea = styled.div`
  flex: 2;
`;

const FieldName = styled.div`
  color: #004258;
  font-weight: 700;
  margin-bottom: 5px;
  font-size: 12px;
  font-family: Montserrat,sans-serif;
  margin-left: 10px;
`;

const PreviewContent = styled.div`
  width: 100%;
  height: 172px;
  background-color: rgb(204, 204, 204);
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 62px;
  padding-right: 20px;
`;

const PreviewIcon = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 60px;
  object-fit: cover;
`;

const PreviewTextWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: Montserrat, sans-serif;
  color: #004258;
`;

const PreviewName = styled.div`
  font-size: 32px;
  font-weight: bold;
  line-height: 32px;
`;

const PreviewDescription = styled.div`
  font-size: 20px;
  line-height: 18px;
  margin-top: 15px;
`;

const PreviewNextIcon = styled.img`
  with: 30px;
  height: 50px;
  transform: rotate(180deg);
`;

class CategoryModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      name: '',
      description: '',
      iconFile: null,
      iconRef: null,
      customIcon: null,
      defaultIcon: null
    };
  }

  componentDidMount() {
    const { baseData } = this.props;
    const defaultIcon = get(baseData, 'info.attributes.iconId');
    const customIcon = get(baseData, 'info.attributes.customIcon.url');
    this.setState({ defaultIcon, customIcon }, () => {
      if (!defaultIcon) {
        if (!isEmpty(customIcon)) {
          this.setState({ customIcon });
          if (this.refs.selectedIconContainer) {
            this.refs.selectedIconContainer.style.backgroundImage = `url(${customIcon})`;
          }
        }
      }
      this.getTextFields();
      // this.loadIcons();
    });
  }

  componentDidUpdate(prevProps) {
    if (!deepEqual(this.props.baseData, prevProps.baseData)) {
      const { baseData } = this.props;
      const defaultIcon = get(baseData, 'info.attributes.iconId');
      const customIcon = get(baseData, 'info.attributes.customIcon.url');
      this.setState({ defaultIcon, customIcon }, () => {
        if (!defaultIcon) {
          if (!isEmpty(customIcon)) {
            this.setState({ customIcon });
            if (this.refs.selectedIconContainer) {
              this.refs.selectedIconContainer.style.backgroundImage = `url(${customIcon})`;
            }
          }
        }
        this.getTextFields();
      });
    }
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

  getTextFields = () => {
    const { baseData } = this.props;
    const type = this.getType();
    const name = get(baseData, 'info.attributes.name');
    const description = get(baseData, 'info.attributes.description');
    const fields = [
      {
        field: 'name',
        label: `${startCase(type)} Name`,
        type: 'text_field',
        errorMessage: `Enter ${startCase(type)} name`,
        required: true,
        defaultValue: name,
        xs: 12,
      },
      {
        field: 'description',
        label: 'Button Sub Copy',
        type: 'text_area',
        defaultValue: description,
        xs: 12
      }
    ];

    this.setState({ fields, name, description });
  };

  setTextFields = ref => {
    this.textFields = ref;
  };

  handleChangeField = (value, field) => {
    const updateObj = {};
    set(updateObj, field, value[field]);
    this.setState(updateObj);
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

  onDelete = () => {
    const { baseData, onDelete } = this.props;
    onDelete(baseData);
  }

  onSave = () => {
    const { onSave } = this.props;
    const { defaultIcon, iconFile, customIcon } = this.state;
    const { baseData } = this.props;
    if (this.textFields.validateFields()) {
      let values = {
        ...this.textFields.getFieldValues()
      };
      if (defaultIcon) {
        values = {
          ...values,
          iconId: defaultIcon
        };
        onSave(baseData, values, iconFile);
      } else {
        onSave(baseData, values, iconFile, customIcon);
      }
    } else {
      toastr.clean()
      toastr.error('Please fill out all the required fields')
    }
  };

  getIcon = () => {
    const { defaultIcon, customIcon } = this.state;
    const { icons } = this.props;
    if (defaultIcon) {
      const icon = icons.find(icon => parseInt(icon.id) === parseInt(defaultIcon));
      return get(icon, 'icon.url');  
    } else {
      return customIcon;
    }
  }

  getCustomIcon = () => {
    const { customIcon } = this.state;
    if (!isEmpty(customIcon)) {
      return customIcon;
    }
    return null;
  }

  getType = () => {
    const { baseData } = this.props;
    if (isEmpty(baseData)) {
      return 'category';
    }
    return baseData.type;
  }

  render() {
    const { loading, title, open, onClose, currentStatus, baseData } = this.props;
    const { fields, name, description } = this.state;
    const customIcon = this.getCustomIcon();
    const actions = [];
    const type = this.getType();
    if (baseData) {
      actions.push(<HollowButton onClick={this.onDelete} key="modal_btn_delete">Delete</HollowButton>);
    } else {
      actions.push(<HollowButton onClick={onClose} key="modal_btn_delete">Cancel</HollowButton>);
    }
    actions.push(<OrangeButton onClick={this.onSave} key="modal_btn_save">Save</OrangeButton>);
    const modalTitle = `${(baseData && baseData.hasOwnProperty('id')) ? 'Customize' : 'Add'} ${type}`;
    const iconSrc = this.getIcon();
    return (
      <Modal
        title={title || modalTitle}
        loading={loading}
        actions={actions}
        open={open}
        onClose={onClose}
        extraLarge
      >
        <IconSection>
          <HeaderSection>
            <span>Choose Icon</span>
            <UploadButton title="Upload Icon" accept="image/*" onChange={this.handleFileChange} />
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
        <EditorSection>
          <EditorArea>
            <FormFields
              ref={this.setTextFields}
              fields={fields}
              onChange={this.handleChangeField}
            />
          </EditorArea>
          <PreviewArea>
            <FieldName>BUTTON PREVIEW</FieldName>
            <PreviewContent>
              <PreviewIcon src={iconSrc} />
              <PreviewTextWrapper>
                <PreviewName>{name}</PreviewName>
                <PreviewDescription>{description}</PreviewDescription>
              </PreviewTextWrapper>
              <PreviewNextIcon src={BackIcon} />
            </PreviewContent>
          </PreviewArea>
        </EditorSection>
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
