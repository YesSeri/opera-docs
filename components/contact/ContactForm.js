import * as gtag from '../../lib/gtag'
function handleClick() {
	gtag.event({
		action: 'clicked_email',
		category: 'Contact',
	})
}
export default function Contact() {
	return (
		<p>Contact me</p>
		// <p>To contact me, please write me an email at <a onClick={handleClick} href="mailto:ariavault@protonmail.com">ariavault@protonmail.com</a>.</p>
	)
}