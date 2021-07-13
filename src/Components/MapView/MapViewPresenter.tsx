import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
/* eslint-disable @typescript-eslint/ban-ts-comment */

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const SearchButton = styled.div`
  position: fixed;
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
    width: 52px;
    height: 52px;
    transition: all 0.2s ease-in;
  }
`;

const Me = styled.div`
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
`;

const Spot = styled.div`
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

const SpotDetail = styled.div`
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
  data: Array<Heritage>;
  zoom: number;
  lat: number;
  lng: number;
  getData: any;
}

const MapViewPresenter: React.FunctionComponent<Props> = ({
  data,
  zoom,
  lat,
  lng,
  getData,
}: Props) => {
  useEffect(() => {
    // console.log(data);
  }, [data]);

  return (
    <Wrapper>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_KEY || "" }}
        center={{ lat: lat, lng: lng }}
        zoom={zoom}
      >
        {/* @ts-ignore */}
        <Me lat={lat} lng={lng}>
          Me
        </Me>
        {data.map((heritage, idx) => {
          return (
            <Spot
              key={idx}
              /* @ts-ignore */
              lat={heritage.location._lat}
              lng={heritage.location._long}
            >
              <SpotDetail>{heritage.title}</SpotDetail>
            </Spot>
          );
        })}
      </GoogleMapReact>
      <SearchButton
        onClick={() => {
          getData();
        }}
      >
        Q
      </SearchButton>
    </Wrapper>
  );
};

export default MapViewPresenter;
