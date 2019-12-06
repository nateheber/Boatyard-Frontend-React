import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { capitalize } from 'lodash';
import { RadioButton, CardInfo, Wrapper } from 'components/template/CreditCardSection/CreditCardOption';

const CCOption = ({payment: {id, attributes: {amount, updatedAt}, cc: {attributes: {last4, name}}}, onSelect, isSelected}) => {
  return (
    <Wrapper onClick={() => onSelect(id)} >
      <RadioButton onClick={() => onSelect(id)} className={classNames({ active: isSelected })}/>
      <CardInfo className={classNames({ selected: isSelected })}>
        {moment(updatedAt).format('MMM D, YYYY')} - ${amount.toFixed(2)}<br/>
        {capitalize(name)} xxxxxx{last4}
      </CardInfo>
    </Wrapper>
  )
}


export default CCOption;