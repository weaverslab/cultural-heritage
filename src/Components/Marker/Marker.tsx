import React from "react";
import styled, { css } from "styled-components";

interface StyledProps {
  type: string;
}

const SpotCSS = css`
  position: relative;
  top: -15px;
  left: -15px;
  width: 30px;
  height: 30px;
  background-color: white;
  border: 3px solid blue;
  color: blue;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 12px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    border-color: #c99233;
    color: #c99233;
    div {
      visibility: visible;
      opacity: 1;
      transition: opacity 0.3s ease-in;
    }
  }
`;

const MeCSS = css`
  position: relative;
  top: -18px;
  left: -18px;
  width: 36px;
  height: 36px;
  background-color: red;
  color: white;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 20px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:after {
    content: "me";
  }
`;

const Wrapper = styled.div<StyledProps>`
  ${(props) => props.type === "spot" && SpotCSS}
  ${(props) => props.type === "me" && MeCSS}
`;

const ToolTip = styled.div`
  visibility: hidden;
  position: absolute;
  display: flex;
  opacity: 0;
  width: 200px;
  height: 30px;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  top: -40px;
  background-color: white;
  border: 2px solid blue;
  z-index: 999;
`;

interface Props {
  type: string;
  tooltip: any;
}

const Marker: React.FunctionComponent<Props> = ({
  type = "spot",
  tooltip,
}: Props) => {
  return (
    <Wrapper type={type}>
      {type === "spot" && <ToolTip>{tooltip}</ToolTip>}
    </Wrapper>
  );
};

export default Marker;
