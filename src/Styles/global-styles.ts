import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
    ${reset}
    *{
        box-sizing: border-box;
    }
    html{
        min-height: calc(100% + env(safe-area-inset-top));
    }
    body{
        width: 100%;
        font-size: 16px;
        background-color: ${(props) => props.theme.colors.grey};
    }
    a{
        color: inherit;
        text-decoration: none;
    }
    input, button{
        &:focus, &:active{
            outline:none
        }
    }
    @font-face {
        font-family: 'MapoFlowerIsland';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/MapoFlowerIslandA.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'TmonMonsori';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/TmonMonsori.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }
`;

export default GlobalStyle;
