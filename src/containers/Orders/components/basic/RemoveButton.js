import React from 'react'
import styled from 'styled-components'

import Trash from 'resources/trash.svg'

const Btn = styled.div`
  width: 14px;
  float: right;
  display: inline-block;
  margin-top: 10px;
`
const Img = styled.img`
  width: 14px;
  object-fit: contain
`

export default ({ onClick }) => (
  <Btn onClick={onClick}>
    <Img src={Trash} />
  </Btn>
)