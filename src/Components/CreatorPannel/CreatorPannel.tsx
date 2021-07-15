import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useFirebase from "../../Hooks/useFirebase";
import useInput from "../../Hooks/useInput";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 24px 16px;
`;

const Create = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Save = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Complete = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const TitleInput = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SaveButton = styled.div`
  width: 100px;
  height: 30px;
  background-color: white;
  border: 2px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

interface Props {
  createdPath: Array<Geo>;
  heritageData?: Heritage;
}

const CreatorPannel: React.FunctionComponent<Props> = ({
  createdPath,
  heritageData,
}: Props) => {
  const title = useInput("");
  const [status, setStatus] = useState<"create" | "save" | "complete">(
    "create"
  );

  useEffect(() => {
    if (status === "complete") {
      setTimeout(() => {
        title.setValue("");
        setStatus("create");
      }, 3000);
    }
  }, [status]);

  async function handleSave() {
    if (title.value !== "" && createdPath.length > 1 && heritageData) {
      setStatus("save");
      try {
        const firebase = useFirebase();
        const db = firebase.firestore();
        const guideCollection = db.collection("guide");
        const newGuide = {
          title: title.value,
          route: createdPath,
        };

        // 가이드 저장
        const savedGuide = await guideCollection.add(newGuide);

        // 문화재 데이터 업데이트
        const guides = heritageData.guides || [];
        const heritageCollection = db.collection("heritage");
        await heritageCollection.doc(heritageData.id).update({
          guides: [...guides, savedGuide.id],
        });
        setStatus("complete");
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
    <Wrapper>
      {status === "create" && (
        <Create>
          <div>CreatorPannel</div>
          <TitleInput>
            title : <input value={title.value} onChange={title.onChange} />
          </TitleInput>
          <SaveButton onClick={handleSave}>save</SaveButton>
        </Create>
      )}
      {status === "save" && <Save>저장중</Save>}
      {status === "complete" && <Complete>저장이 완료되었습니다.</Complete>}
    </Wrapper>
  );
};

export default CreatorPannel;
