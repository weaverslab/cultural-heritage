import React from "react";
import styled from "styled-components";
import Hr from "../Hr";

interface StyledProps {
  width: string;
  height: string;
}

const Wrapper = styled.div<StyledProps>`
  position: absolute;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => props.theme.colors.grey[20]};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Pattern = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("/images/patterns.png");
  background-repeat: repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${(props) => props.theme.fonts.bigTitle};
`;

const Message = styled.div`
  margin-top: 1rem;
`;

interface Props {
  width?: string;
  height?: string;
  message?: string;
}

const Loader: React.FunctionComponent<Props> = ({
  width = "100%",
  height = "100%",
  message = "로딩중입니다",
}: Props) => {
  return (
    <Wrapper width={width} height={height}>
      <Pattern>
        <Hr width={"100px"} />
        <Message>{message}</Message>
      </Pattern>
    </Wrapper>
  );
};

export default Loader;
