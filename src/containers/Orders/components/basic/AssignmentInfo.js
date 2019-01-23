import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

const Wrapper = styled.div`
  color: #8f8f8f;
  font-family: "Source Sans Pro", sans-serif;
  font-size: 14px;
  font-weight: 400;
`

export default ({ assignment: { from, to } }) => (
  <Wrapper>
    Assignment Date: {moment(from).format('MMM D, YYYY H:m A')} - {moment(to).format('MMM D, YYYY H:m A')}
  </Wrapper>
)