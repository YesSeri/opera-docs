import Link from 'next/link'
import styled from 'styled-components'
import { useRouter } from "next/router";

// This creates a custom component that wraps an <a> tag
const StyledLink = styled.a`
	${({ active }) => active && `background-color: #222; color:#fff!important;`}
`

export default function NavLink({ href, name }) {
	const router = useRouter();
	const { pathname } = router
	return (
		<Link prefetch href={href} passHref>
			<StyledLink active={pathname === href} >{name}</StyledLink>
		</Link>
	)
}
