import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  max-width: 480px;
  background-color: white;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding-top: 2rem;
`;

const Home: React.FunctionComponent = () => <Wrapper>home</Wrapper>;
export default Home;
