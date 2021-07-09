import styled from "styled-components";
import { ResultPaneSingle, ResultsContainerSingle } from '../../utils/sharedStyles'
import Link from 'next/link'

const CustomPane = styled(ResultPaneSingle)`
	display: grid;
	*:not(:last-child){
		border-bottom: 1px solid #ddd;
	}
`

export { CustomPane, ResultsContainerSingle, Link }