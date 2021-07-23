import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 48px;
  height: 48px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadows};
  border-radius: ${(props) => props.theme.borderRadius};
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  type?: string;
}

const Button: React.FunctionComponent<Props> = ({ type }: Props) => {
  return (
    <Wrapper>
      {type === "geoRefresh" && (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.9833 0C18.6109 0 24 5.38912 24 12.0167C24 18.6444 18.6109 24 11.9833 24C5.35565 24 0 18.6444 0 12.0167C0 5.38912 5.35565 0 11.9833 0ZM12.8201 17.1046V20.954C17.1381 20.5858 20.5858 17.1046 20.954 12.8201H17.1381V11.2469H20.954C20.6192 6.8954 17.1381 3.4477 12.8201 3.0795V6.92887H11.2469V3.0795C6.8954 3.41423 3.38075 6.8954 3.04603 11.2469H6.92887V12.8201H3.04603C3.41423 17.1381 6.8954 20.6192 11.2469 20.9874V17.1046H12.8201Z"
            fill="black"
          />
        </svg>
      )}
    </Wrapper>
  );
};

export default Button;
