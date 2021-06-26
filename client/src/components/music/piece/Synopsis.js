import React from 'react'
import { Description } from './styled'

const Synopsis = ({ description }) => {
	return (
		description && <Description>
			<b>Synopsis: </b>{description}
		</Description>
	)
}

export default Synopsis
