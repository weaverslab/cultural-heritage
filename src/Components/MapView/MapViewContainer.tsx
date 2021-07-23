import React, { useContext, useEffect, useState } from "react";
import Context from "../Context";
import Loader from "../Loader";
import MapViewPresenter from "./MapViewPresenter";

const MapViewContainer: React.FunctionComponent = () => {
  const { data, setData, lat, lng, loading } = useContext(Context);
  const [customMapCenter, setCustomMapCenter] = useState<any>({
    lat,
    lng,
  });
  const [zoom, setZoom] = useState<number>(16);
  const [thumbnailData, setThumbnailData] = useState<Heritage | undefined>(
    undefined
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

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

  function handleClickSearch() {
    // getData();
  }

  function handleClickCenter() {
    setCustomMapCenter({ lat, lng });
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
      handleClickSearch={handleClickSearch}
      handleClickCenter={handleClickCenter}
    />
  );
};

export default MapViewContainer;
