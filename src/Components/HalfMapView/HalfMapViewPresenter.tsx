import GoogleMapReact from "google-map-react";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
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
  createdPath: Array<Geo>;
  setCreatedPath: any;
}

const HalfMapViewPresenter: React.FunctionComponent<Props> = ({
  zoom,
  lat,
  lng,
  data,
  guide,
  mode,
  createdPath,
  setCreatedPath,
}: Props) => {
  const [customMapCenter, setCustomMapCenter] = useState<any>({
    lat,
    lng,
  });

  const mapRef = useRef<any>();
  const mapsRef = useRef<any>();
  const routeRef = useRef<any>();
  const routeMarkerRef = useRef<any>([]);

  useEffect(() => {
    if (data) {
      const newLat = data.location._lat;
      const newLng = data.location._long;

      setCustomMapCenter({
        lat: newLat,
        lng: newLng,
      });
    }
  }, [data]);

  useEffect(() => {
    if (mapsRef.current && mapRef.current) {
      if (guide) {
        drawLine(guide.route, "red");
      } else {
        clearLine();
      }
    }
  }, [guide]);

  useEffect(() => {
    if (mode === "creator" && createdPath.length > 0) {
      drawLine(createdPath, "blue");
    }
  }, [mode, createdPath]);

  function convertLatLng(coordinate: Geo) {
    return { lat: coordinate._lat, lng: coordinate._long };
  }

  function drawLine(coordinates: Array<any>, color: string): void {
    clearLine();
    routeMarkerRef.current = [];
    routeRef.current = new mapsRef.current.Polyline({
      path: coordinates.map(convertLatLng),
      geodesic: true,
      strokeColor: color,
      strokeOpacity: 1.0,
      strokeWeight: 3,
      map: mapRef.current,
    });

    for (let i = 0; i < routeRef.current.getPath().getLength(); i++) {
      const marker = new mapsRef.current.Marker({
        icon: {
          url: "/Images/blue_dot.png",
          size: new google.maps.Size(8, 8),
          anchor: new google.maps.Point(4, 4),
        },
        position: routeRef.current.getPath().getAt(i),
        map: mapRef.current,
      });
      routeMarkerRef.current.push(marker);
    }
  }

  function clearLine() {
    if (routeRef.current) {
      routeRef.current.setMap(null);
    }
    routeMarkerRef.current.forEach((marker: any) => {
      marker.setMap(null);
    });
  }

  function handlePlus() {
    if (mapRef.current) {
      const lat = mapRef.current.center.lat();
      const lng = mapRef.current.center.lng();
      setCreatedPath([...createdPath, { _lat: lat, _long: lng }]);
    }
    // setThumbnailData(data[Number(key)]);
  }

  function handleReset() {
    clearLine();
    setCreatedPath([]);
  }

  function handleApiLoaded({ map, maps }: any) {
    mapRef.current = map;
    mapsRef.current = maps;
  }

  return (
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
