import firebase from "firebase/app";
import React, { useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router-dom";
import styled from "styled-components";
import CreatorPannel from "../Components/CreatorPannel";
import Forbidden from "../Components/Forbidden";
import HalfMapView from "../Components/HalfMapView";
import PlayerPannel from "../Components/PlayerPannel";

interface StyledProps {
  selected?: boolean;
}

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
  display: flex;
  flex-direction: column;
  background-color: #3364a0;
  justify-content: flex-start;
  align-items: center;
`;

const Navigation = styled.div`
  width: 100%;
  height: 50px;
  background-color: #5284c3;
  display: flex;
`;

const NavItem = styled.div<StyledProps>`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => (props.selected ? "#3364a0" : "#5284c3")};
  &:hover {
    cursor: pointer;
  }
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
  const [mode, setMode] = useState<string>("player");
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
          .orderBy("createdAt")
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

  function handleOnClick(e: any) {
    setMode(e.target.dataset.mode);
  }

  return (
    <Wrapper>
      <MobileSizeView>
        {id === "" ? (
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
              <Navigation>
                <NavItem
                  selected={mode === "player"}
                  onClick={handleOnClick}
                  data-mode="player"
                >
                  감상하기
                </NavItem>
                <NavItem
                  selected={mode === "creator"}
                  onClick={handleOnClick}
                  data-mode="creator"
                >
                  가이드하기
                </NavItem>
              </Navigation>
              {mode === "player" && (
                <PlayerPannel
                  guideData={guideData}
                  selctedGuide={selectedGuide}
                  setSelectedGuide={setSelectedGuide}
                />
              )}
              {mode === "creator" && (
                <CreatorPannel
                  createdPath={createdPath}
                  heritageData={heritageData}
                  setGuideData={setGuideData}
                />
              )}
            </ControlPannel>
          </ContentWrapper>
        )}
      </MobileSizeView>
    </Wrapper>
  );
};
export default withRouter(Detail);
