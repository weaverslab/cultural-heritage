import GoogleMapReact from "google-map-react";
import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Marker from "../Marker";
/* eslint-disable @typescript-eslint/ban-ts-comment */

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 50%;
`;

interface Props {
  zoom: number;
  lat: number;
  lng: number;
  data: Heritage;
}

const HalfMapViewPresenter: React.FunctionComponent<Props> = ({
  zoom,
  lat,
  lng,
  data,
}: Props) => {
  const [customMapCenter, setCustomMapCenter] = useState<any>({
    lat,
    lng,
  });

  useEffect(() => {
    if (data) {
      setCustomMapCenter({
        lat: data.location._lat,
        lng: data.location._long,
      });
    }
  }, [data]);

  function handleClickMarker(key: string) {
    // setThumbnailData(data[Number(key)]);
  }

  function handleClickMap() {
    // setThumbnailData(undefined);
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
        {data && (
          <Marker
            // @ts-ignore
            lat={data.location._lat}
            lng={data.location._long}
            tooltip={data.title}
          />
        )}
      </GoogleMapReact>
    </Wrapper>
  );
};

export default HalfMapViewPresenter;
