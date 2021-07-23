import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeritageThumbnail from "../HeritageThumbnail";
import Marker from "../Marker";
/* eslint-disable @typescript-eslint/ban-ts-comment */

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const SearchButton = styled.div`
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
    width: 52px;
    height: 52px;
    transition: all 0.2s ease-in;
  }
`;

const CenterButton = styled.div`
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
    width: 52px;
    height: 52px;
    transition: all 0.2s ease-in;
  }
`;

interface Props {
  data: Array<Heritage>;
  zoom: number;
  lat: number;
  lng: number;
  thumbnailData?: Heritage;
  customMapCenter: any;
  handleClickMarker: (key: string) => void;
  handleClickMap: () => any;
  handleClickSearch: () => any;
  handleClickCenter: () => any;
}

const MapViewPresenter: React.FunctionComponent<Props> = ({
  data,
  zoom,
  lat,
  lng,
  thumbnailData,
  customMapCenter,
  handleClickMarker,
  handleClickMap,
  handleClickSearch,
  handleClickCenter,
}: Props) => {
  const [delayData, setDelayData] = useState<Array<Heritage>>([]);

  useEffect(() => {
    setTimeout(() => {
      setDelayData(data);
    }, 500);
  }, [data]);

  return (
    <Wrapper>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_KEY || "" }}
        center={{ lat: customMapCenter.lat, lng: customMapCenter.lng }}
        zoom={zoom}
        options={{ disableDefaultUI: true }}
        onChildClick={handleClickMarker}
        onClick={handleClickMap}
      >
        {/* @ts-ignore */}
        <Marker lat={lat} lng={lng} type="me" />
        {delayData.map((heritage, idx) => {
          return (
            <Marker
              key={idx}
              /* @ts-ignore */
              lat={heritage.location._lat}
              lng={heritage.location._long}
              tooltip={heritage.title}
            />
          );
        })}
      </GoogleMapReact>
      <SearchButton onClick={handleClickSearch}>Q</SearchButton>
      <CenterButton onClick={handleClickCenter}>#</CenterButton>
      {thumbnailData && <HeritageThumbnail data={thumbnailData} />}
    </Wrapper>
  );
};

export default MapViewPresenter;
