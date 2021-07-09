import { Title } from '../../utils/sharedStyles'
import styled from 'styled-components';
const Form = styled.form`
	display:grid;
	grid-template-columns: 1fr;
	justify-content: center;
    ${({ theme }) => theme.responsiveWidth}
	* {
		${({ theme }) => theme.mediumSize(`margin: 10px;`)}
	}
`
const Textarea = styled.textarea`
	min-height: 250px;
`

export { Title, Form, Textarea };