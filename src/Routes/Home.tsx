import "firebase/firestore";
import * as geofire from "geofire-common";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MapView from "../Components/MapView";
import useFirebase from "../Hooks/useFirebase";

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
`;
const MobileSizeView = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
`;

const Home: React.FunctionComponent = () => {
  const [center, setCenter] = useState<[number, number]>([37.5, 126.9]);

  useEffect(() => {
    const getData = async () => {
      const firebase = useFirebase();
      const radiusInM = 8 * 1000; // 1KM
      const db = firebase.firestore();
      // Get All Documents
      // const snapshot = await db.collection("heritage").get();
      // snapshot.forEach((doc) => {
      //   console.log(doc.id, "=>", doc.data());
      // });
      const bounds = geofire.geohashQueryBounds(center, radiusInM);
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
              const distanceInKm = geofire.distanceBetween([lat, lng], center);
              const distanceInM = distanceInKm * 1000;
              if (distanceInM <= radiusInM) {
                matchingDocs.push(doc);
              }
            }
          }
          return matchingDocs;
        })
        .then((matchingDocs) => {
          matchingDocs.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
          });
        });
    };

    // getData();
  }, []);

  return (
    <Wrapper>
      <MobileSizeView>
        <MapView />
      </MobileSizeView>
    </Wrapper>
  );
};
export default Home;
