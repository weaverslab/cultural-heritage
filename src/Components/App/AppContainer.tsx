import * as geofire from "geofire-common";
import React, { useEffect, useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import useFirebase from "../../Hooks/useFirebase";
import useGeoPosition from "../../Hooks/useGeoPosition";
import GlobalStyle from "../../Styles/global-styles";
import theme from "../../Styles/theme";
import Context from "../Context";
import Loader from "../Loader";
import AppPresenter from "./AppPresenter";

interface StyledProps {
  toasting: boolean;
}

const ToastWrapper = styled.div<StyledProps>`
  position: fixed;
  width: 100%;
  height: 72px;
  display: flex;
  justify-content: center;
  ${(props) =>
    props.toasting ? `top: 20px; opacity: 1;` : `top: -100px; opacity: 0;`};
  transition: top 0.5s ease-in, opacity 0.3s ease-in;
`;

const Toast = styled.div`
  max-width: 352px;
  width: 80%;
  height: 100%;
  background-color: white;
  box-shadow: ${(props) => props.theme.shadows};
  border-radius: ${(props) => props.theme.borderRadius};
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) => props.theme.fonts.content};
`;

const AppContainer: React.FunctionComponent = () => {
  const firebase = useFirebase();
  const { lat, lng } = useGeoPosition();
  const [radiusInM, setRadiusInM] = useState<number>(1.5 * 1000);
  const [data, setData] = useState<Array<Heritage>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [landing, setLanding] = useState<boolean>(true);
  const [toasting, setToasting] = useState<boolean>(false);

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
      }, 1500);
    }
  }, [landing]);

  useEffect(() => {
    if (data.length > 0) {
      if (landing) {
        setTimeout(() => {
          setToasting(true);
        }, 2000);
      } else {
        setToasting(true);
      }
    }
  }, [data]);

  useEffect(() => {
    if (toasting) {
      setTimeout(() => {
        setToasting(false);
      }, 2000);
    }
  }, [toasting]);

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
            getData: getData,
            lat: lat,
            lng: lng,
            loading: loading,
          }}
        >
          {landing ? <Loader message="어디메뇨" /> : <AppPresenter />}
          <ToastWrapper toasting={toasting}>
            <Toast>{`근방에 ${data.length}건의 문화재가 존재합니다`}</Toast>
          </ToastWrapper>
        </Context.Provider>
      </ThemeProvider>
    </>
  );
};

export default AppContainer;
