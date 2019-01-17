import React from 'react'
import styled from 'styled-components'

import Edit from 'resources/edit.svg'

const Btn = styled.div`
  width: 14px;
  float: right;
  display: inline-block;
  margin-top: 10px;
  cursor: pointer;
`
const Img = styled.img`
  width: 14px;
  object-fit: contain
`

export const EditButton = ({ onClick }) => (
  <Btn onClick={onClick}>
    <Img src={Edit} />
  </Btn>
)