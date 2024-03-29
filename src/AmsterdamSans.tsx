import { createGlobalStyle } from "styled-components";

const AmsterdamSans = createGlobalStyle`
    @font-face {
        font-family: "Amsterdam Sans";
        src: url("./static/fonts/AmsterdamSans/AmsterdamSans-Regular.woff2") format("woff2"),
            url("./static/fonts/AmsterdamSans/AmsterdamSans-Regular.woff") format("woff");
        font-weight: 400;
    }

    @font-face {
        font-family: "Amsterdam Sans";
        src: url("./static/fonts/AmsterdamSansBold/AmsterdamSans-Bold.woff2") format("woff2"),
            url("./static/fonts/AmsterdamSansBold/AmsterdamSans-Bold.woff") format("woff");
        font-weight: 700;
    }

    @font-face {
        font-family: "Amsterdam Sans";
        src: url("./static/fonts/AmsterdamSansExtraBold/AmsterdamSans-ExtraBold.woff2") format("woff2"),
            url("./static/fonts/AmsterdamSansExtraBold/AmsterdamSans-ExtraBold.woff") format("woff");
        font-weight: 800;
    }
`;

export default AmsterdamSans;
