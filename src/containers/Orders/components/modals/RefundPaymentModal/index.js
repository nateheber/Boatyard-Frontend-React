import React, { useState } from 'react';
import { find } from 'lodash';
import { Row, Col } from 'react-flexbox-grid';
import { HollowButton, OrangeButton } from 'components/basic/Buttons';
import { CurrencyInput } from 'components/basic/Input'
import Modal from 'components/compound/Modal';
import { Wrapper } from './style';
import CardOption  from './components/CardOption';

const RefundPaymentModal = ({payments, loading, open, onClose, onRefund}) => {
  const [selectedPaymentId, setSelectedPaymentId] = useState(payments[0].id);
  const [ balance, setBalance] = useState(payments[0].attributes.amount);

  const handleRefund = () => {
    onRefund(selectedPaymentId);
  };

  const onOptionChange = (id) => {
    const selectedPayment = find(payments, {id});
    setSelectedPaymentId(id);
    setBalance(selectedPayment.attributes.amount);
  };

  const action = [
    <HollowButton onClick={onClose} key="Cancel">Cancel</HollowButton>,
    <OrangeButton onClick={ev => handleRefund()} key="Next">Refund</OrangeButton>
  ];
  return (
    <Modal
      title="Refund Payments"
      actions={action}
      open={open}
      loading={loading}
      onClose={onClose}
    >
      <Wrapper>
        <Row>
          <Col sm={7}>
            <p className="title">Select Payment</p>
            {
              payments.map((p) =>
                <CardOption
                  payment={p}
                  onSelect={id => onOptionChange(id)}
                  isSelected={selectedPaymentId === p.id}
                  key={`cardoption-${p.id}`}
                />
              )
            }
          </Col>
          <Col sm={5}>
            <p className="title">Refund Amount</p>
            <CurrencyInput fixedDecimalScale decimalScale={2} value={balance} disabled />
          </Col>
        </Row>
      </Wrapper>
    </Modal>
  )
}

export default RefundPaymentModal;
