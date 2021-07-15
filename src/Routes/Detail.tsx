import "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router-dom";
import styled from "styled-components";
import CreatorPannel from "../Components/CreatorPannel";
import Forbidden from "../Components/Forbidden";
import HalfMapView from "../Components/HalfMapView";
import PlayerPannel from "../Components/PlayerPannel";
import useFirebase from "../Hooks/useFirebase";

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
      const firebase = useFirebase();
      const db = firebase.firestore();

      const heritageDoc = await db.collection("heritage").doc(id).get();
      if (heritageDoc.exists) {
        const newHeritageData = heritageDoc.data();
        if (newHeritageData) {
          newHeritageData.id = heritageDoc.id;
        }
        setHeritageData(newHeritageData);
      }
    }
    if (id) {
      getHeritageData();
    }
  }, [id]);

  useEffect(() => {
    async function getGuideData() {
      try {
        const firebase = useFirebase();
        const db = firebase.firestore();
        const newGuideData: any = [];
        if (heritageData.guides && heritageData.guides.length > 0) {
          const guides = await db
            .collection("guide")
            .where("__name__", "in", heritageData.guides)
            .get();

          if (!guides.empty) {
            guides.forEach((guide) => {
              const newGuideDataObject = guide.data();
              newGuideDataObject.id = guide.id;
              newGuideData.push(newGuideDataObject);
            });
          }
        }
        setGuideData(newGuideData);
      } catch (e) {
        console.error(e);
      }
    }

    if (heritageData) {
      getGuideData();
    }
  }, [heritageData]);

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
