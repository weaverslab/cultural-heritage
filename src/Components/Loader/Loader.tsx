import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #e6e690;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader: React.FunctionComponent = () => {
  return <Wrapper>준비중입니다.</Wrapper>;
};

export default Loader;
