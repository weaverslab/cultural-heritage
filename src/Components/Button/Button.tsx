import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 48px;
  height: 48px;
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: ${(props) => props.theme.shadows};
  border-radius: ${(props) => props.theme.borderRadius};
`;

interface Props {
  type: string;
}

const Button: React.FunctionComponent<Props> = ({ type }: Props) => {
  return <Wrapper>d</Wrapper>;
};

export default Button;
