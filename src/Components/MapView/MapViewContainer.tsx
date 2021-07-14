import "firebase/firestore";
import * as geofire from "geofire-common";
import React, { useEffect, useState } from "react";
import useFirebase from "../../Hooks/useFirebase";
import Loader from "../Loader";
import MapViewPresenter from "./MapViewPresenter";

const MapViewContainer: React.FunctionComponent = () => {
  const [centerLat, setCenterLat] = useState<number>(37.579863556926874);
  const [centerLng, setCenterLng] = useState<number>(126.97700881185297);
  const [loading, setLoading] = useState<boolean>(true);
  const [zoom, setZoom] = useState<number>(16);
  const [radiusInM, setRadiusInM] = useState<number>(1 * 1000);
  const [data, setData] = useState<Array<Heritage>>([]);

  useEffect(() => {
    getGeoPosition();
    const t = setInterval(getGeoPosition, 1000);
    return () => {
      clearInterval(t);
    };
  }, []);

  function getGeoPosition() {
    navigator.geolocation.getCurrentPosition(function (position) {
      // console.log("Latitude is :", position.coords.latitude);
      // console.log("Longitude is :", position.coords.longitude);
      setCenterLat(position.coords.latitude);
      setCenterLng(position.coords.longitude);
      if (loading) {
        setLoading(false);
      }
    });
  }

  async function getData() {
    const firebase = useFirebase();
    const db = firebase.firestore();
    // Get All Documents
    // const snapshot = await db.collection("heritage").get();
    // snapshot.forEach((doc) => {
    //   console.log(doc.id, "=>", doc.data());
    // });
    const bounds = geofire.geohashQueryBounds(
      [centerLat, centerLng],
      radiusInM
    );
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
            const lat = location._lat;
            const lng = location._long;
            const distanceInKm = geofire.distanceBetween(
              [lat, lng],
              [centerLat, centerLng]
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
          newDataObject.id = doc.id;
          newData.push(newDataObject);
          // console.log(doc.id, "=>", doc.data());
        });
        setData(newData);
      });
  }

  return loading ? (
    <Loader />
  ) : (
    <MapViewPresenter
      data={data}
      lat={centerLat}
      lng={centerLng}
      zoom={zoom}
      getData={getData}
    />
  );
};

export default MapViewContainer;
