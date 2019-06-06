import React from 'react';
import Switch from 'react-switch';

import { InputWrapper, TextArea } from 'components/basic/Input';
import { Section, SectionHeader, SectionContent, HeaderTitle } from '../Section';

export default class NotesSection extends React.Component {
  handleChangeVisible = (contentVisible) => {
    const { onChangeVisible } = this.props;
    if (onChangeVisible) {
      onChangeVisible(contentVisible);
    }
  };

  handleChangeNotes = evt => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(evt.target.value);
    }
  };

  render() {
    const { contentVisible, notes } = this.props;
    return (
        <Section>
          <SectionHeader>
            <HeaderTitle>Notes</HeaderTitle>
            <Switch
              checked={contentVisible}
              onChange={this.handleChangeVisible}
              onColor={'transparent'}
              offColor={'transparent'}
              uncheckedIcon={
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    fontSize: 12,
                    color: '#FFFFFF',
                    paddingRight: 2,
                    backgroundColor: '#A9B5BB',
                    borderRadius: '0 6px 6px 0'
                  }}
                >
                  OFF
                </div>
              }
              checkedIcon={
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    fontSize: 12,
                    color: '#FFFFFF',
                    paddingRight: 2,
                    backgroundColor: '#F38118',
                    borderRadius: '6px 0 0  6px'
                  }}
                >
                  ON
                </div>
              }
              className='switch-job'
              id='icon-switch'
            />
          </SectionHeader>
          {contentVisible && <SectionContent>
            <InputWrapper className='primary'>
              <TextArea
                style={{ marginBottom: 0, border: '1px solid #A9B5BB' }}
                value={notes}
                onChange={this.handleChangeNotes}
              />
            </InputWrapper>
          </SectionContent>}
        </Section>

    );
  }
}
