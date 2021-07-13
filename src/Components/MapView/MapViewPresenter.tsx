import { GoogleAPI, Map } from "google-maps-react";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

interface Props {
  google: GoogleAPI;
}

const MapViewPresenter: React.FunctionComponent<Props> = ({
  google,
}: Props) => {
  return (
    <Wrapper>
      <Map
        google={google}
        center={{ lat: 37.5, lng: 126.9 }}
        // // containerStyle={{ position: "relative", height: "100vh" }}
        // style={{ position: "relative", height: "100%" }}
      />
    </Wrapper>
  );
};

export default MapViewPresenter;
