import { GoogleAPI } from "google-maps-react";
import React from "react";
import { useEffect } from "react";
import MapViewPresenter from "./MapViewPresenter";

interface Props {
  google: GoogleAPI;
}

const MapViewContainer: React.FunctionComponent<Props> = ({
  google,
}: Props) => {
  const center = {
    lat: 37.5,
    lng: 126.9,
  };
  const zoom = 13;
  useEffect(() => {
    console.log(google);
  });

  return <MapViewPresenter google={google} />;
};

export default MapViewContainer;
