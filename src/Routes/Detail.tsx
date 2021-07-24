import firebase from "firebase/app";
import React, { useEffect, useState } from "react";
import { Link, useLocation, withRouter } from "react-router-dom";
import styled from "styled-components";
import Button from "../Components/Button";
import CreatorPannel from "../Components/CreatorPannel";
import Forbidden from "../Components/Forbidden";
import HalfMapView from "../Components/HalfMapView";
import Hr from "../Components/Hr";
import PlayerPannel from "../Components/PlayerPannel";

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const BackButton = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;

  &:hover {
    cursor: pointer;
  }
`;

const ChangeModeButton = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;

  &:hover {
    cursor: pointer;
  }
`;

const ControlPannel = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.grey[20]};
  justify-content: flex-start;
  align-items: center;
`;

const Pattern = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("/images/patterns.png");
  background-repeat: repeat;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

interface LocationState {
  id: string;
}

const Detail: React.FunctionComponent = () => {
  const [id, setId] = useState<string>("");
  const [heritageData, setHeritageData] = useState<Heritage | any>(undefined);
  const [guideData, setGuideData] = useState<Array<Guide | any>>([]);
  const [selectedGuide, setSelectedGuide] = useState<Guide | undefined>(
    undefined
  );
  const [mode, setMode] = useState<"player" | "creator">("player");
  const [createdPath, setCreatedPath] = useState<Array<Geo>>([]);
  const location = useLocation<LocationState>();

  useEffect(() => {
    if (location.state && location.state.id) {
      setId(location.state.id);
    }
  }, [location]);

  useEffect(() => {
    async function getHeritageData() {
      try {
        const db = firebase.firestore();

        const heritageDoc = await db.collection("heritage").doc(id).get();
        if (heritageDoc.exists) {
          const newHeritageData = heritageDoc.data();
          setHeritageData(newHeritageData);
        }
      } catch (e) {
        console.error(e);
      }
    }
    async function getGuideData() {
      try {
        const db = firebase.firestore();

        const guides = await db
          .collection("heritage")
          .doc(id)
          .collection("guide")
          .orderBy("createdAt", "desc")
          .get();

        if (!guides.empty) {
          const newGuideData: Array<Guide | any> = [];
          guides.forEach((guide) => {
            const newGuideDataObject = guide.data();
            newGuideDataObject.id = guide.id;
            newGuideData.push(newGuideDataObject);
          });
          setGuideData(newGuideData);
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (id) {
      getHeritageData();
      getGuideData();
    }
  }, [id]);

  useEffect(() => {
    if (mode === "creator") {
      setSelectedGuide(undefined);
    }
  }, [mode]);

  function handleMode() {
    if (mode === "player") {
      setMode("creator");
    } else {
      setMode("player");
    }
  }

  return id === "" ? (
    <Forbidden />
  ) : (
    <ContentWrapper>
      <HalfMapView
        data={heritageData}
        guide={selectedGuide}
        mode={mode}
        createdPath={createdPath}
        setCreatedPath={setCreatedPath}
      />
      <ControlPannel>
        <Pattern>
          <Hr />
          {mode === "player" && (
            <PlayerPannel
              guideData={guideData}
              selctedGuide={selectedGuide}
              setSelectedGuide={setSelectedGuide}
              handleMode={handleMode}
            />
          )}
          {mode === "creator" && (
            <CreatorPannel
              createdPath={createdPath}
              heritageData={heritageData}
              setGuideData={setGuideData}
              setCreatedPath={setCreatedPath}
              handleMode={handleMode}
            />
          )}
        </Pattern>
      </ControlPannel>
      <Link to={{ pathname: "/" }}>
        <BackButton>
          <Button type="back" />
        </BackButton>
      </Link>
      <ChangeModeButton onClick={handleMode}>
        {mode === "player" ? (
          <Button type="toGuide" />
        ) : (
          <Button type="toPlay" />
        )}
      </ChangeModeButton>
    </ContentWrapper>
  );
};
export default withRouter(Detail);
