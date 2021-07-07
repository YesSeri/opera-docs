import styled from 'styled-components';
import {NavWrapper} from '../../utils/sharedStyles'

const CloseButton = styled.div`
	padding: 0 0.8em;
	${({ theme }) => theme.smallSize('padding: 0 0.4em;')}
`
export {NavWrapper, CloseButton}