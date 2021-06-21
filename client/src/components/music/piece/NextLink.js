import React from 'react'
import { createPieceUrl } from '../../utils/utilFunctions'

const NextLink = ({ last_name, opera_id, opera, piece_id, title }) => {
    console.log({ last_name, opera_id, opera, piece_id, title })
    const url = createPieceUrl()
    return (
        <div>
            <a></a>
        </div>
    )
}

export default NextLink
