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

const Forbidden: React.FunctionComponent = () => {
  return <Wrapper>잘못된 접근입니다.</Wrapper>;
};

export default Forbidden;
