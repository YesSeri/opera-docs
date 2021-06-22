import React, { useEffect } from 'react'
import Links from './Links'
import Synopsis from './Synopsis';
import Info from './Info';
import { Title } from './styled'

const InfoContainer = ({ data }) => {
  return (
    <div>
      <Title>{data.title}</Title>
      <Synopsis description={data.description} />
      <Links id={data.id} />
      <Info data={data} />
    </div>
  )
}

export default InfoContainer
