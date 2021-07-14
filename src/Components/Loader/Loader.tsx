import React from "react";
import styled from "styled-components";

interface StyledProps {
  width: string;
  height: string;
}

const Wrapper = styled.div<StyledProps>`
  position: absolute;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: #e6e690;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface Props {
  width?: string;
  height?: string;
}

const Loader: React.FunctionComponent<Props> = ({
  width = "100%",
  height = "100%",
}: Props) => {
  return (
    <Wrapper width={width} height={height}>
      준비중입니다.
    </Wrapper>
  );
};

export default Loader;
