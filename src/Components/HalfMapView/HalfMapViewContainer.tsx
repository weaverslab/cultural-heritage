import React, { useEffect, useState } from "react";
import useGeoPosition from "../../Hooks/useGeoPosition";
import Loader from "../Loader";
import HalfMapViewPresenter from "./HalfMapViewPresenter";

interface Props {
  data: Heritage;
  guide?: Guide;
  mode: string;
  createdPath: Array<Geo>;
  setCreatedPath: any;
}

const HalfMapViewContainer: React.FunctionComponent<Props> = ({
  data,
  guide,
  mode,
  createdPath,
  setCreatedPath,
}: Props) => {
  const { lat, lng } = useGeoPosition();

  const [loading, setLoading] = useState<boolean>(true);
  const [zoom, setZoom] = useState<number>(16);

  useEffect(() => {
    if (!!lat && !!lng) {
      setLoading(false);
    }
  }, [lat, lng]);

  return loading ? (
    <Loader height={"50%"} />
  ) : (
    <HalfMapViewPresenter
      lat={lat}
      lng={lng}
      zoom={zoom}
      data={data}
      guide={guide}
      mode={mode}
      createdPath={createdPath}
      setCreatedPath={setCreatedPath}
    />
  );
};

export default HalfMapViewContainer;
