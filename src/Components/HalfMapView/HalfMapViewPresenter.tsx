import GoogleMapReact from "google-map-react";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../Button";
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

const AddPinButton = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;

  &:hover {
    cursor: pointer;
  }
`;

const RemovePinButton = styled.div`
  position: absolute;
  bottom: calc(16px + 48px + 8px);
  right: 16px;

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
  mode: "creator" | "player";
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
            selected={true}
          />
        )}
      </GoogleMapReact>

      {mode === "creator" && (
        <>
          <AddPinButton onClick={handlePlus}>
            <Button type="addPin" />
          </AddPinButton>
          <RemovePinButton onClick={handleReset}>
            <Button type="removePin" />
          </RemovePinButton>
          <Aim>+</Aim>
        </>
      )}
    </Wrapper>
  );
};

export default HalfMapViewPresenter;
