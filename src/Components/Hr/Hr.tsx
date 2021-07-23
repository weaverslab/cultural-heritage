import React from "react";
import styled from "styled-components";

interface StyledProps {
  width: string;
}

const Wrapper = styled.div<StyledProps>`
  width: ${(props) => props.width};
  svg {
    width: 100%;
  }
`;

interface Props {
  width?: string;
}

const Hr: React.FunctionComponent<Props> = ({ width = "100%" }: Props) => {
  return (
    <Wrapper width={width}>
      <svg
        preserveAspectRatio="none"
        width="400"
        height="8"
        viewBox="0 0 400 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line y1="4" x2="80" y2="4" stroke="#6F8C92" strokeWidth="8" />
        <line x1="80" y1="4" x2="160" y2="4" stroke="#E4E5E6" strokeWidth="8" />
        <line
          x1="160"
          y1="4"
          x2="240"
          y2="4"
          stroke="#FDD983"
          strokeWidth="8"
        />
        <line
          x1="240"
          y1="4"
          x2="320"
          y2="4"
          stroke="#D68787"
          strokeWidth="8"
        />
        <line
          x1="320"
          y1="4"
          x2="400"
          y2="4"
          stroke="#A78D8E"
          strokeWidth="8"
        />
      </svg>
    </Wrapper>
  );
};

export default Hr;
