import GoogleMapReact from "google-map-react";
import React from "react";
import styled from "styled-components";
import Loader from "../Loader";
import Marker from "../Marker";
/* eslint-disable @typescript-eslint/ban-ts-comment */

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 50%;
`;

const Aim = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 900;
  font-size: 32px;
  transform: translateX(-50%) translateY(-50%);
  &:hover {
    cursor: default;
  }
`;

const PlusButton = styled.div`
  position: absolute;
  bottom: 16px;
  left: 16px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const ResetButton = styled.div`
  position: absolute;
  bottom: 16px;
  left: calc(16px + 48px + 8px);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: white;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

interface Props {
  zoom: number;
  lat: number;
  lng: number;
  data: Heritage;
  guide?: Guide;
  mode: string;
  loading: boolean;
  customMapCenter: any;
  handleApiLoaded: any;
  handlePlus: () => any;
  handleReset: () => any;
}

const HalfMapViewPresenter: React.FunctionComponent<Props> = ({
  zoom,
  lat,
  lng,
  data,
  mode,
  loading,
  customMapCenter,
  handleApiLoaded,
  handlePlus,
  handleReset,
}: Props) => {
  return loading ? (
    <Loader height={"50%"} />
  ) : (
    <Wrapper>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_KEY || "" }}
        center={{ lat: customMapCenter.lat, lng: customMapCenter.lng }}
        zoom={zoom}
        options={{ disableDefaultUI: true }}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={handleApiLoaded}
      >
        {/* @ts-ignore */}
        <Marker lat={lat} lng={lng} type="me" />
        {data && (
          <Marker
            // @ts-ignore
            lat={data.location._lat}
            lng={data.location._long}
            tooltip={data.title}
          />
        )}
      </GoogleMapReact>
      {mode === "creator" && <Aim>+</Aim>}
      {mode === "creator" && <PlusButton onClick={handlePlus}>+</PlusButton>}
      {mode === "creator" && <ResetButton onClick={handleReset}>-</ResetButton>}
    </Wrapper>
  );
};

export default HalfMapViewPresenter;
