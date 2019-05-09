import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Row, Col } from 'react-flexbox-grid';
import deepEqual from 'deep-equal';
import { toastr } from 'react-redux-toastr';
import { get } from 'lodash';

import { GetOrder, SendQuote, actionTypes } from 'store/actions/orders';
import { Section } from 'components/basic/InfoSection';
import { TextArea } from 'components/basic/Input';
import { NormalText } from 'components/basic/Typho';
import Modal from 'components/compound/Modal';
import { OrangeButton, HollowButton } from 'components/basic/Buttons';
import OnClickEditor from '../basic/OnClickEditor';
import TaxEditor from '../basic/TaxEditor';

const Label = styled.div`
  color: #8f8f8f;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 16px;
  line-height: 20px;
  &.total {
    font-weight: bold;
    color: #07384b;
  }
`;

const FieldLabel = styled.div`
  color: #004258;
  font-family: 'Montserrat', sans-serif;
  font-size: 12px;
  font-weight: bold;
  padding-top: 10px;
  margin-bottom: 20px;
`;

const Value = styled.div`
  color: #8f8f8f;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 16px;
  line-height: 20px;
  &.total {
    font-weight: bold;
    color: #07384b;
  }
`;

const ButtonGroup = styled(Row)`
  padding: 20px 0;
  margin: 0 !important;
  border-top: 1px solid #e6e6e6;
  align-items: center;
  justify-content: flex-end;
`;

const Column = styled(Col)`
  padding: 0 !important;
  margin-left: -5px;
  margin-right: -5px;
`;

const Description = styled(NormalText)`
  font-family: 'Open sans-serif', sans-serif;
  padding: 10px 0;
`;

class OrderReviewSection extends React.Component {
  constructor(props) {
    super(props)
    const summary = this.getSummaryInfo();
    this.state = { showQuote: false, ...summary };
  }

  componentDidUpdate(prevProps) {
    if (!deepEqual(prevProps, this.props)) {
      const summary = this.getSummaryInfo();
      this.setState({ ...summary });
    }
  }

  getSummaryInfo = () => {
    const { order } = this.props;
    const total = get(order, 'attributes.total');
    const subtotal = get(order, 'attributes.subTotal');
    const taxRate = get(order, 'attributes.taxRate');
    const taxAmount = get(order, 'attributes.taxAmount');
    const discount = get(order, 'attributes.discount');
    const deposit = get(order, 'attributes.deposit');
    const comments = get(order, 'attributes.comments');
    return {
      total,
      subtotal,
      taxRate,
      discount,
      deposit,
      taxAmount,
      comments
    };
  };

  updatePriceInfo = () => {
    const { comments, ...priceInfo } = this.state;
    this.props.updateOrder({order: priceInfo});
  };

  onChangeTax = (taxRate) => {
    const { subtotal } = this.props;
    const taxAmount = parseFloat(taxRate) * parseFloat(subtotal) / 100;
    const total = taxAmount + parseFloat(subtotal);
    this.setState({ taxRate, taxAmount, total }, this.updatePriceInfo);
  };

  onChangeDeposit = (deposit) => {
    this.setState({ deposit }, this.updatePriceInfo);
  };

  onChangeDiscount = (discount) => {
    const { subtotal, taxAmount } = this.state;
    const total = parseFloat(subtotal) + parseFloat(taxAmount) - parseFloat(discount);
    this.setState({ discount, total }, this.updatePriceInfo);
  };

  onChangeComment = (evt) => {
    this.setState({ comments: evt.target.value });
  };

  submitComments = () => {
    const { comments } = this.state;
    this.props.updateOrder({ order: { comments } });
  };


  canSendQuote = () => {
    const { order } = this.props;
    const orderState = get(order, 'attributes.state');
    return orderState === 'accepted' || orderState === 'provisioned' || orderState === 'scheduled';
  };

  canSendInvoice = () => {
    const { order } = this.props;
    const orderState = get(order, 'attributes.state');
    return orderState === 'accepted' ||
      orderState === 'provisioned' ||
      orderState === 'scheduled' ||
      orderState === 'started' ||
      orderState === 'invoiced';
  };

  onSendQuote = () => {
    this.setState({ showQuote: true });
  }

  hideQuoteModal = () => {
    this.setState({ showQuote: false });
  }

  sendQuote = () => {
    const { SendQuote, GetOrder, order } = this.props;
    const orderId = get(order, 'id');
    const orderState = get(order, 'attributes.state');
    const isResend = orderState === 'provisioned' || orderState === 'scheduled';
    SendQuote({
      orderId,
      isResend,
      success: () => {
        this.setState({ showQuote: false });
        toastr.success('Success', 'Sent quote successfully!');
        GetOrder({ orderId });
      },
      error: () => {
        this.setState({ showQuote: false });
      }
    });
  };

  render() {
    const { taxRate, deposit, discount, subtotal, total, taxAmount, comments, showQuote } = this.state;
    const { currentStatus } = this.props;
    const modalActions = [
      <HollowButton onClick={this.hideQuoteModal} key="modal_btn_cancel">Cancel</HollowButton>,
      <OrangeButton onClick={this.sendQuote} key="modal_btn_save">Send</OrangeButton>
    ];
    return (
      <Section>
        <Row style={{ paddingBottom: 10 }}>
          <Col xs={12} sm={6} md={6}>
            <FieldLabel>ORDER NOTES</FieldLabel>
            <TextArea
              style={{ minHeight: 140, marginBottom: 20 }}
              value={comments || ''}
              onChange={this.onChangeComment}
            />
            <HollowButton style={{ margin: 0, marginBottom: 15 }} onClick={this.submitComments}>COMMENT INTERNALLY</HollowButton>
          </Col>
          <Col xs={12} sm={2} md={2}></Col>
          <Col xs={12} sm={4} md={4}>
            <Row style={{ padding: '10px 0px' }}>
              <Col xs={6}><Label>Subtotal:</Label></Col>
              <Col xs={6}><Value>${parseFloat(subtotal).toFixed(2)}</Value></Col>
            </Row>
            <TaxEditor value={taxRate} taxAmount={taxAmount} onChange={this.onChangeTax} />
            <OnClickEditor value={deposit} label="Deposit" onChange={this.onChangeDeposit} />
            <OnClickEditor value={discount} label="Discount" onChange={this.onChangeDiscount} />
            <Row style={{ padding: '10px 0px' }}>
              <Col xs={6}><Label className="total">Total:</Label></Col>
              <Col xs={6}><Value className="total">${parseFloat(total).toFixed(2)}</Value></Col>
            </Row>
          </Col>
        </Row>
        <ButtonGroup>
          <Column>
            {this.canSendQuote() && <HollowButton onClick={this.onSendQuote}>
              Send Quote
            </HollowButton>}
            {this.canSendInvoice() && <HollowButton onClick={this.addNewItem}>
              Send Invoice
            </HollowButton>}
          </Column>
        </ButtonGroup>
        <Modal
          title={'Send Quote'}
          actions={modalActions}
          loading={currentStatus === actionTypes.SEND_QUOTE}
          normal={true}
          open={showQuote}
          onClose={this.hideQuoteModal}
        >
          <Description>Are you sure you want to send this quote?</Description>
        </Modal>
        {/* {privilege === 'provider' && (
          <SendQuoteModal
            loading={currentStatus === actionTypes.SEND_QUOTE}
            open={showQuote}
            onClose={this.hideQuoteModal}
            onSendQuote={this.sendQuote}
          />
        )} */}
      </Section>
    )
  }
}

const mapStateToProps = state => ({
  privilege: state.auth.privilege,
  currentStatus: state.order.currentStatus,
})

const mapDispatchToProps = {
  GetOrder,
  SendQuote
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderReviewSection);
