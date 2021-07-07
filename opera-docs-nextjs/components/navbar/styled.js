import { NavWrapper } from '../../utils/sharedStyles'
import nextLink from 'next/link';
import styled from 'styled-components'

const Link = styled(nextLink)`
   /* background-color: ${({ active }) => {
       console.log(active)

       return active ? 'red' : 'blue'
       
       }}  */
       background-color:red;
`

export { NavWrapper, Link }