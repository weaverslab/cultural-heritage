import GoogleMapReact from "google-map-react";
import React, { useState } from "react";
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
  getData: any;
  thumbnailData?: Heritage;
  setThumbnailData: any;
}

const MapViewPresenter: React.FunctionComponent<Props> = ({
  data,
  zoom,
  lat,
  lng,
  getData,
  thumbnailData,
  setThumbnailData,
}: Props) => {
  const [customMapCenter, setCustomMapCenter] = useState<any>({
    lat,
    lng,
  });

  function handleClickMarker(key: string) {
    setThumbnailData(data[Number(key)]);
  }

  function handleClickMap() {
    setThumbnailData(undefined);
  }

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
        {data.map((heritage, idx) => {
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
      <SearchButton
        onClick={() => {
          getData();
        }}
      >
        Q
      </SearchButton>
      <CenterButton
        onClick={() => {
          setCustomMapCenter({ lat, lng });
        }}
      >
        #
      </CenterButton>
      {thumbnailData && <HeritageThumbnail data={thumbnailData} />}
    </Wrapper>
  );
};

export default MapViewPresenter;
