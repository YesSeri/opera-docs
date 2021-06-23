import React, { } from 'react'
import Links from './Links'
import Synopsis from './Synopsis';
import Info from './Info';
import { Title } from './styled'

const InfoContainer = ({ data: { title, id, description, type, opera, last_name, first_name, file_title } }) => {
  return (
    <div>
      <Title>{title}</Title>
      <Synopsis description={description} />
      <Links id={id} />
      <Info type={type} opera={opera} last_name={last_name} first_name={first_name} file_title={file_title} />
    </div>
  )
}

export default InfoContainer
