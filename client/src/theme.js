const theme = {
  color: {
    main: '#6a1a1b',
    second: '#eee',
  },
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