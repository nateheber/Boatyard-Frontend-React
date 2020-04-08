import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { RadioButton, CardInfo, Wrapper } from 'components/template/CreditCardSection/CreditCardOption';

const OtherOption = ({payment: {id, attributes: {amount, updatedAt, paymentType}}, onSelect, isSelected}) => {
  return (
    <Wrapper onClick={() => onSelect(id)} >
      <RadioButton onClick={() => onSelect(id)} className={classNames({ active: isSelected })}/>
      <CardInfo className={classNames({ selected: isSelected })}>
        {moment(updatedAt).format('MMM D, YYYY')} - ${Number(amount).toFixed(2)}<br/>
        {paymentType}
      </CardInfo>
    </Wrapper>
  )
}


export default OtherOption;