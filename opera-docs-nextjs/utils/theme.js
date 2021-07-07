const theme = {
  color: {
    main: '#6a1a1b',
    second: '#eee',
  },
  // Used to make item reponsive. Should only be used for items that take up fullscreen.
  responsiveWidth:
    ` margin: auto;
    width: 70%;
    @media screen and (max-width: 1200px) {
        width: 90%;
    }
    @media screen and (max-width: 900px) {
        width: 100%;
    }
  `,
  // These three are used to set a value to be responsive.
  // Used like this: ${({ theme }) => theme.mediumSize(`width: 50%`)}
  largeSize:
    (values) => {
      return (`@media screen and (max-width: 1200px) {
        ${values}
      }`
      )
    },
  mediumSize:
    (values) => {
      return (`@media screen and (max-width: 900px) {
        ${values}
      }`
      )
    },
  smallSize:
    (values) => {
      return (`@media screen and (max-width: 600px) {
        ${values}
      }`
      )
    },
}

export default theme;