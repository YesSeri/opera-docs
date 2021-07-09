import React, { } from 'react'
import { Links } from './links/Links'
import Synopsis from './Synopsis';
import Info from './Info';
import { Title } from './styled'

const InfoContainer = ({ data: { title, id, description, type, opera, last_name, first_name, file_title, prevId, nextId } }) => {
	return (
		<div>
			<Title>{title}</Title>
			<Synopsis description={description} />
			<Links nextId={nextId} prevId={prevId} />
			<Info type={type} opera={opera} last_name={last_name} first_name={first_name} file_title={file_title} />
		</div>
	)
}

export default InfoContainer
