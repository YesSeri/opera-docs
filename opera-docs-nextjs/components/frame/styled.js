import styled from "styled-components";

const Container = styled.div`
    ${({ theme }) => theme.responsiveWidth};
    object {
        height: 100vh;
        width: 100%;
    }
    .fallbackIframe {
        height: 100vh;
        width: 100%;
    }
    .pdfobject-container { height: 100vh; }
`

export { Container }