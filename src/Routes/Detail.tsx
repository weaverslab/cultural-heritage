import "firebase/firestore";
import * as geofire from "geofire-common";
import React, { useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router-dom";
import styled from "styled-components";
import Forbidden from "../Components/Forbidden";
import HalfMapView from "../Components/HalfMapView";
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

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ControlPannel = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50%;
  background-color: #3364a0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface LocationState {
  id: string;
}

const Detail: React.FunctionComponent = () => {
  const [id, setId] = useState<string>("");
  const [data, setData] = useState<Heritage | any>(undefined);
  const location = useLocation<LocationState>();

  useEffect(() => {
    if (location.state && location.state.id) {
      setId(location.state.id);
    }
  }, [location]);

  useEffect(() => {
    async function getData() {
      const firebase = useFirebase();
      const db = firebase.firestore();
      // Get All Documents
      const doc = await db.collection("heritage").doc(id).get();
      if (doc.exists) {
        const newDataObject = doc.data();
        if (newDataObject) {
          newDataObject.id = doc.id;
        }
        setData(newDataObject);
      }
    }

    if (id) {
      getData();
    }
  }, [id]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Wrapper>
      <MobileSizeView>
        {id === "" ? (
          <Forbidden />
        ) : (
          <ContentWrapper>
            <HalfMapView data={data} />
            <ControlPannel>{data && <div>{data.title}</div>}</ControlPannel>
          </ContentWrapper>
        )}
      </MobileSizeView>
    </Wrapper>
  );
};
export default withRouter(Detail);
