import firebase from "firebase/app";
import * as geofire from "geofire-common";
import React, { useEffect, useState } from "react";
import useGeoPosition from "../../Hooks/useGeoPosition";
import Loader from "../Loader";
import MapViewPresenter from "./MapViewPresenter";

const MapViewContainer: React.FunctionComponent = () => {
  const { lat, lng } = useGeoPosition();
  const [customMapCenter, setCustomMapCenter] = useState<any>({
    lat,
    lng,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [zoom, setZoom] = useState<number>(16);
  const [radiusInM, setRadiusInM] = useState<number>(3 * 1000);
  const [data, setData] = useState<Array<Heritage>>([]);
  const [thumbnailData, setThumbnailData] = useState<Heritage | undefined>(
    undefined
  );

  useEffect(() => {
    if (loading) {
      if (!!lat && !!lng) {
        setLoading(false);
        setCustomMapCenter({ lat, lng });
      }
    }
  }, [lat, lng]);

  async function getData() {
    try {
      const db = firebase.firestore();
      const bounds = geofire.geohashQueryBounds([lat, lng], radiusInM);
      const promises = [];
      for (const b of bounds) {
        const q = db
          .collection("heritage")
          .orderBy("geohash")
          .startAt(b[0])
          .endAt(b[1]);

        promises.push(q.get());
      }

      Promise.all(promises)
        .then((snapshots) => {
          const matchingDocs = [];
          for (const snap of snapshots) {
            for (const doc of snap.docs) {
              const location = doc.get("location");
              const _lat = location._lat;
              const _lng = location._long;
              const distanceInKm = geofire.distanceBetween(
                [_lat, _lng],
                [lat, lng]
              );
              const distanceInM = distanceInKm * 1000;
              if (distanceInM <= radiusInM) {
                matchingDocs.push(doc);
              }
            }
          }
          return matchingDocs;
        })
        .then((matchingDocs) => {
          const newData: Array<Heritage | any> = [];
          matchingDocs.forEach((doc) => {
            const newDataObject = doc.data();
            newData.push(newDataObject);
          });
          setData(newData);
        });
    } catch (e) {
      console.error(e);
    }
  }

  function handleClickMarker(key: string) {
    setThumbnailData(data[Number(key)]);
  }

  function handleClickMap() {
    setThumbnailData(undefined);
  }

  function handleClickSearch() {
    getData();
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
