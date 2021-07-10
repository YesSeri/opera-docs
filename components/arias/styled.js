import styled from "styled-components";
import { ResultPaneSingle, ResultsContainerSingle, Container } from '../../utils/sharedStyles'
import Link from 'next/link'

const CustomPane = styled(ResultPaneSingle)`
	display: grid;
`
const Item = styled(Link)`
	border-bottom: 1px solid #ddd;
	padding:5px 0;

`
const LastItem = styled(Item)`
	border-bottom: none;
`

export { CustomPane, ResultsContainerSingle, Item, LastItem, Container }