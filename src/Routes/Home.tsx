import React from "react";
import styled from "styled-components";
import MapView from "../Components/MapView";

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
`;
const MobileSizeView = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const Home: React.FunctionComponent = () => {
  return (
    <Wrapper>
      <MobileSizeView>
        <MapView />
      </MobileSizeView>
    </Wrapper>
  );
};
export default Home;
