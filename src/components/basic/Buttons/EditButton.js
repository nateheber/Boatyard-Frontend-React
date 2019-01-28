import React from 'react'
import styled from 'styled-components'

import Edit from 'resources/edit.svg'

const Btn = styled.div`
  width: 17px;
  float: right;
  display: inline-block;
  cursor: pointer;
`
const Img = styled.img`
  width: 17px;
  object-fit: contain
`

export const EditButton = ({ onClick }) => (
  <Btn onClick={onClick}>
    <Img src={Edit} />
  </Btn>
)