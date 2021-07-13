import {
    Circle,
    GoogleAPI,
    InfoWindow,
    Map,
    Marker
    } from "google-maps-react";
import React from "react";
import { useEffect } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

interface Props {
  google: GoogleAPI;
  data: Array<Heritage>;
  centerLat: number;
  centerLng: number;
  zoom: number;
}

const MapViewPresenter: React.FunctionComponent<Props> = ({
  google,
  data,
  centerLat,
  centerLng,
  zoom,
}: Props) => {
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <Wrapper>
      <Map
        google={google}
        center={{ lat: centerLat, lng: centerLng }}
        zoom={zoom}
      >
        <Marker
          position={{ lat: centerLat, lng: centerLng }}
          label={"me"}
          visible={true}
          icon={"/Images/Me.png"}
        />

        <Marker
          position={{ lat: centerLat + 0.006, lng: centerLng + 0.005 }}
          label={"<div>heysdfsdfsd</div>"}
          visible={true}
          icon={{ url: "/Images/Heritage.png" }}
        />
      </Map>
    </Wrapper>
  );
};

export default MapViewPresenter;
