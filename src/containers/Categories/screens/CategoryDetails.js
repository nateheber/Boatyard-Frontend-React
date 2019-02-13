import React from 'react';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { withRouter } from 'react-router-dom';

import { CategoryEditor } from '../components/CategoryEditor';

import { GetCategory, UpdateCategory, CreateCategory } from 'store/actions/categories';

class CategoryDetails extends React.Component {
  constructor(props) {
    super(props);
    const query = queryString.parse(props.location.search);
    const categoryId = query.category;
    const { GetCategory } = this.props;
    if (categoryId) {
      GetCategory({ categoryId, success: this.onFetchSuccess });
    } else {
      this.state = {
        id: '',
        name: '',
        subtitle: '',
        appIdentifier: '',
        description: '',
        isHidden: false,
        primary: false,
        fieldAttributes: []
      };
    }
  }
  getFieldInfo = () => {
    if (this.state) {
      const {
        name,
        subtitle,
        appIdentifier,
        description,
        isHidden,
        primary,
        fieldAttributes
      } = this.state;
      const mainFields = [
        {
          field: 'name',
          label: 'Name',
          type: 'text_field',
          errorMessage: 'Enter the service name',
          required: true,
          defaultValue: name || '',
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
          xl: 6
        },
        {
          field: 'subtitle',
          label: 'Subtitle',
          type: 'text_field',
          defaultValue: subtitle || '',
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
          xl: 6
        },
        {
          field: 'appIdentifier',
          label: 'App Identifier',
          type: 'text_field',
          defaultValue: appIdentifier || '',
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
          xl: 6
        },
        {
          field: 'description',
          label: 'Description',
          type: 'text_area',
          defaultValue: description || '',
          xs: 12,
          sm: 12,
          md: 6,
          lg: 6,
          xl: 6
        },
        {
          field: 'isHidden',
          label: 'Hidden',
          type: 'check_box',
          defaultValue: isHidden,
          xs: 6,
          sm: 6,
          md: 3,
          lg: 3,
          xl: 3
        },
        {
          field: 'primary',
          label: 'Primary',
          type: 'check_box',
          defaultValue: primary,
          xs: 6,
          sm: 6,
          md: 3,
          lg: 3,
          xl: 3
        }
      ];
      const additionalFields = fieldAttributes.map(
        ({ id, name, fieldType, required }) => ({
          id,
          fieldInfo: [
            {
              field: 'name',
              label: 'Name',
              type: 'text_field',
              errorMessage: 'Enter the field name',
              required: true,
              defaultValue: name,
              xs: 6,
              sm: 6,
              md: 4,
              lg: 4,
              xl: 4
            },
            {
              field: 'fieldType',
              label: 'Field Type',
              type: 'select_box',
              errorMessage: 'Select Field Type',
              required: true,
              defaultValue: fieldType,
              options: [
                { value: 'check_box', label: 'CheckBox' },
                { value: 'text_area', label: 'TextArea' },
                { value: 'select_box', label: 'SelectBox' },
                { value: 'text_field', label: 'TextInput' }
              ],
              xs: 6,
              sm: 6,
              md: 4,
              lg: 4,
              xl: 4
            },
            {
              field: 'required',
              label: 'Required',
              type: 'check_box',
              defaultValue: required,
              xs: 6,
              sm: 6,
              md: 4,
              lg: 4,
              xl: 4
            }
          ]
        })
      );
      return { mainFields, additionalFields };
    }
    return { mainFields: [], additionalFields: [] };
  };
  onFetchSuccess = result => {
    const { data, included } = result;
    const {
      id,
      attributes: {
        name,
        subtitle,
        appIdentifier,
        description,
        isHidden,
        primary
      }
    } = data;
    const fieldAttributes = included
      ? included.map(({ id, attributes }) => ({
          id,
          ...attributes
        }))
      : [];
    this.setState({
      id,
      name,
      subtitle,
      appIdentifier,
      description,
      isHidden,
      primary,
      fieldAttributes
    });
  };
  onSave = data => {
    if (this.state.id) {
      this.props.UpdateCategory({
        id: this.state.id,
        data
      });
      this.props.history.goBack();
    } else {
      this.props.CreateCategory(data);
    }
  };
  onCancel = () => {
    this.props.history.goBack();
  };
  render() {
    const { mainFields, additionalFields } = this.getFieldInfo();
    return (
      <CategoryEditor
        mainFields={mainFields}
        additionalFields={additionalFields}
        onCancel={this.onCancel}
        onSave={this.onSave}
      />
    );
  }
}

const mapStateToProps = ({ category: { currentStatus, currentCategory } }) => ({
  currentStatus,
  currentCategory
});

const mapDispatchToProps = {
  GetCategory,
  CreateCategory,
  UpdateCategory
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CategoryDetails)
);
