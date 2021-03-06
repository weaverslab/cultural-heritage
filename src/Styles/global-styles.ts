import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";
import "./fonts/fonts.css";

const GlobalStyle = createGlobalStyle`
    ${reset}
    *{
        box-sizing: border-box;
        font-family: "DaumRegular"
    }
    html{
        min-height: calc(100% + env(safe-area-inset-top));
    }
    body{
        width: 100%;
        font-size: 16px;
        background-color: ${(props) => props.theme.colors.grey[100]};
    }
    a{
        color: inherit;
        text-decoration: none;
    }
    input, textarea{
        -webkit-appearance: none;
        &:focus, &:active{
            outline:none
        }
    }
`;

export default GlobalStyle;
