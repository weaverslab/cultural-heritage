import * as geofire from "geofire-common";
import React, { useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import useFirebase from "../../Hooks/useFirebase";
import useGeoPosition from "../../Hooks/useGeoPosition";
import GlobalStyle from "../../Styles/global-styles";
import theme from "../../Styles/theme";
import Context from "../Context";
import Loader from "../Loader";
import AppPresenter from "./AppPresenter";

const AppContainer: React.FunctionComponent = () => {
  const firebase = useFirebase();
  const { lat, lng } = useGeoPosition();
  const [radiusInM, setRadiusInM] = useState<number>(3 * 1000);
  const [data, setData] = useState<Array<Heritage>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [landing, setLanding] = useState<boolean>(true);

  useEffect(() => {
    if (loading) {
      if (!!lat && !!lng) {
        setLoading(false);
        getData();
      }
    }
  }, [lat, lng]);

  useEffect(() => {
    if (landing) {
      setTimeout(() => {
        setLanding(false);
      }, 2000);
    }
  }, [landing]);

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

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Context.Provider
          value={{
            data: data,
            setData: setData,
            lat: lat,
            lng: lng,
            loading: loading,
          }}
        >
          {landing ? <Loader message="어디메뇨" /> : <AppPresenter />}
        </Context.Provider>
      </ThemeProvider>
    </>
  );
};

export default AppContainer;
