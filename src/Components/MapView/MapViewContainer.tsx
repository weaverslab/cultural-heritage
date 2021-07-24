import React, { useContext, useEffect, useState } from "react";
import Context from "../Context";
import Loader from "../Loader";
import MapViewPresenter from "./MapViewPresenter";

const MapViewContainer: React.FunctionComponent = () => {
  const { data, getData, lat, lng, loading } = useContext(Context);
  const [customMapCenter, setCustomMapCenter] = useState<any>({
    lat,
    lng,
  });
  const [zoom, setZoom] = useState<number>(16);
  const [thumbnailData, setThumbnailData] = useState<Heritage | undefined>(
    undefined
  );

  useEffect(() => {
    if (!loading) {
      setCustomMapCenter({ lat, lng });
    }
  }, [loading]);

  function handleClickMarker(key: string) {
    setThumbnailData(data[Number(key)]);
  }

  function handleClickMap() {
    setThumbnailData(undefined);
  }

  function handleClickCenter() {
    setThumbnailData(undefined);
    setCustomMapCenter({ lat, lng });
    getData();
  }

  return loading ? (
    <Loader />
  ) : (
    <MapViewPresenter
      data={data}
      lat={lat}
      lng={lng}
      zoom={zoom}
      thumbnailData={thumbnailData}
      customMapCenter={customMapCenter}
      handleClickMarker={handleClickMarker}
      handleClickMap={handleClickMap}
      handleClickCenter={handleClickCenter}
    />
  );
};

export default MapViewContainer;
