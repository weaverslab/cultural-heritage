import "firebase/firestore";
import * as geofire from "geofire-common";
import { GoogleAPI } from "google-maps-react";
import React, { useEffect, useState } from "react";
import useFirebase from "../../Hooks/useFirebase";
import MapViewPresenter from "./MapViewPresenter";

interface Props {
  google: GoogleAPI;
}

const MapViewContainer: React.FunctionComponent<Props> = ({
  google,
}: Props) => {
  const [centerLat, setCenterLat] = useState<number>(37.579863556926874);
  const [centerLng, setCenterLng] = useState<number>(126.97700881185297);
  const [radiusInM, setRadiusInM] = useState<number>(8 * 1000);
  const [zoom, setZoom] = useState<number>(15);
  const [data, setData] = useState<Array<Heritage>>([]);

  useEffect(() => {
    getGeoPosition();
    // getData();
  }, []);

  function getGeoPosition() {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
      setCenterLat(position.coords.latitude);
      setCenterLng(position.coords.longitude);
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
          // console.log(doc);
          newData.push(doc.data());
          // console.log(doc.id, "=>", doc.data());
        });
        setData(newData);
      });
  }

  return (
    <MapViewPresenter
      google={google}
      data={data}
      centerLat={centerLat}
      centerLng={centerLng}
      zoom={zoom}
    />
  );
};

export default MapViewContainer;
