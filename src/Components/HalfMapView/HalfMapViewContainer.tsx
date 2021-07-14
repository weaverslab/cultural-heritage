import React, { useEffect, useState } from "react";
import useGeoPosition from "../../Hooks/useGeoPosition";
import Loader from "../Loader";
import HalfMapViewPresenter from "./HalfMapViewPresenter";

interface Props {
  data: Heritage;
}

const HalfMapViewContainer: React.FunctionComponent<Props> = ({
  data,
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
    <HalfMapViewPresenter lat={lat} lng={lng} zoom={zoom} data={data} />
  );
};

export default HalfMapViewContainer;
