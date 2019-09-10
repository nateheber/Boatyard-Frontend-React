import React from 'react';
import styled from 'styled-components';
import EvilIcon from 'react-evil-icons';

import { UploadButton, GradientButton } from 'components/basic/Buttons';
import { Section, SectionHeader, SectionContent, HeaderTitle, Image } from '../Section';

import PdfIcon from '../../../../../../../resources/job/pdf.png';
import AddIcon from '../../../../../../../resources/job/add.png';
import LeftArrowIcon from '../../../../../../../resources/job/left_arrow.png';
import RightArrowIcon from '../../../../../../../resources/job/right_arrow.png';

const AttachmentSlider = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Attachment = styled.div`
  position: relative;
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
      object-fit: contain;
    }
  }
  .overlay {
    transition: all ease-in-out .2s;
    opacity: 0;
  }
  .btn-close {
    transition: all ease-in-out .2s;
    opacity: 0;
    .close-icon {
      fill: white;
    }
  }
  &:hover {
    .overlay {
      opacity: 1;
    }
    .btn-close {
      opacity: 1;
      .close-icon {
        fill: white;
      }
    }
  }
`;

const AddAttachmentButton = styled(UploadButton)`
  position: relative;
  width: 30px;
  height: 30px;
  padding: 0;
  outline: none;
  cursor: pointer;
  background: #FFFFFF;
  background-image: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(0,0,0,0.12) 100%);
  border: 1px solid #A9B5BB;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 30px;
`;

const AttachmentsContainer = styled.div`
  width: calc(100% - 100px);
  display: flex;
  align-items: center;
  height: 130px;
  overflow-x: auto;
  overflow-y: hidden;
`;

const AttachmentTitle = styled.div`
  font-family: Helvetica;
  font-size: 10px;
  color: #003247;
  margin-top: 18px;
  text-align: center;
  padding: 0 10px;
`;


const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const DeleteButton = styled.button`
  background: no-repeat;
  border: none;
  padding: 0;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  outline: none;
`;

export default class AttachmentSection extends React.Component {
  containerRef = React.createRef()

  handleFileChange = (file, baseString, ref) => {
    if (file && baseString && ref) {
      const { onAdd } = this.props;
      const filename = file.name;
      const fileType = file.type.indexOf('image') >= 0 ? 'image' : file.type.indexOf('pdf') ? 'pdf' : 'other';
      if (onAdd) {
        onAdd({ filename, fileType, file_attachment: baseString }, () => {
          if (this.containerRef.current) {
            const scrollWidth = this.containerRef.current.scrollWidth;
            this.containerRef.current.scrollTo({
              left: scrollWidth,
              behavior: 'smooth'
            });
          }
        });
      }
    }
  };

  handleDelete = (index) => () => {
    const { onDelete } = this.props;
    if (onDelete) {
      onDelete(index);
    }
  }

  handleMoveLeft = () => {
    if (this.containerRef.current) {
      const scrollLeft = this.containerRef.current.scrollLeft;
      const childCount = Math.ceil((scrollLeft + 10) / 142);
      let newPos = ((childCount > 0 ? childCount - 1 : 0) * 142) - 10;
      this.containerRef.current.scrollTo({
        left: newPos,
        behavior: 'smooth'
      });
    }
  }

  handleMoveRight = () => {
    if (this.containerRef.current) {
      const scrollLeft = this.containerRef.current.scrollLeft;
      let newPos = Math.ceil((scrollLeft + 10) / 142) * 142 - 10;
      if (scrollLeft === newPos) {
        newPos += 142;
      }
      this.containerRef.current.scrollTo({
        left: newPos,
        behavior: 'smooth'
      });
    }
  }

  render() {
    const { attachments, disabled } = this.props;
    return (
      <Section>
        <SectionHeader>
          <HeaderTitle>Attachments</HeaderTitle>
            {!disabled && <AddAttachmentButton accept='image/*,application/pdf' onChange={this.handleFileChange}>
              <Image src={AddIcon} />
            </AddAttachmentButton>
            }
        </SectionHeader>
        <SectionContent>
          <AttachmentSlider>
            { attachments.length > 5 &&
            <GradientButton onClick={this.handleMoveLeft}>
              <Image className='arrow' src={LeftArrowIcon} />
            </GradientButton>
            }
            <AttachmentsContainer ref={this.containerRef}>
              {attachments.map((attachment, index) => (
              <Attachment key={`attachment_${index}`} className={attachment.fileType} ref={index}>
                <Image src={attachment.fileType !== 'image' ? PdfIcon : attachment.file_attachment}></Image>
                {attachment.fileType !== 'image' && <AttachmentTitle>{attachment.filename}</AttachmentTitle>}
                <Overlay className="overlay" />
                { !disabled &&
                <DeleteButton className="btn-close" onClick={this.handleDelete(index)}>
                  <EvilIcon name="ei-close-o" size="s" className="close-icon" />
                </DeleteButton>
                }
              </Attachment>
              ))}
            </AttachmentsContainer>
            { attachments.length > 5 &&
            <GradientButton onClick={this.handleMoveRight}>
              <Image className='arrow' src={RightArrowIcon} />
            </GradientButton>
            }
          </AttachmentSlider>
        </SectionContent>
      </Section>
    );
  }
}
