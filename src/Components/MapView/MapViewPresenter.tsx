import GoogleMapReact from "google-map-react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import HeritageThumbnail from "../HeritageThumbnail";
import Marker from "../Marker";
/* eslint-disable @typescript-eslint/ban-ts-comment */

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const CenterButton = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  /* width: 48px;
  height: 48px; */

  &:hover {
    cursor: pointer;
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
              selected={heritage.id === thumbnailData?.id}
            />
          );
        })}
      </GoogleMapReact>
      <CenterButton onClick={handleClickCenter}>
        <Button type="geoRefresh" />
      </CenterButton>
      {thumbnailData && <HeritageThumbnail data={thumbnailData} />}
    </Wrapper>
  );
};

export default MapViewPresenter;
