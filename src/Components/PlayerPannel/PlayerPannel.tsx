import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface StyledProps {
  bgColor: "redBrown" | "brown" | "darkGreen";
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 32px 32px;
  overflow: hidden;
`;

const Intro = styled.div`
  width: 100%;
  height: 32px;
  ${(props) => props.theme.fonts.title};
  margin-bottom: 16px;
`;

const OverflowWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

const Card = styled.div<StyledProps>`
  width: 100%;
  height: 214px;
  margin-bottom: 32px;
  background-color: ${(props) => props.theme.colors[props.bgColor][100]};
  border-radius: ${(props) => props.theme.borderRadius};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 0px 32px;
  &:hover {
    cursor: pointer;
  }
`;

const BlankCard = styled.div`
  width: 100%;
  height: 214px;
  margin-bottom: 16px;
  background-color: white;
  border-radius: ${(props) => props.theme.borderRadius};
  border: 1px solid ${(props) => props.theme.colors.black[40]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: black;
  &:hover {
    cursor: pointer;
  }
`;

const CardTitle = styled.div`
  ${(props) => props.theme.fonts.title};
  margin-bottom: 16px;
`;

const CardDetail = styled.div`
  ${(props) => props.theme.fonts.content};
  line-height: 1.5em;
`;

const CardAudio = styled.div``;

interface Props {
  guideData: Array<Guide>;
  selctedGuide?: Guide;
  setSelectedGuide: any;
  handleMode: any;
}

const PlayerPannel: React.FunctionComponent<Props> = ({
  guideData,
  selctedGuide,
  setSelectedGuide,
  handleMode,
}: Props) => {
  const [colors, setColors] = useState<
    Array<"redBrown" | "brown" | "darkGreen">
  >(["redBrown", "brown", "darkGreen"]);
  useEffect(() => {
    const tColors: Array<"redBrown" | "brown" | "darkGreen"> = colors;
    tColors.sort(() => {
      return Math.random() - 0.5;
    });
    setColors(tColors);
  }, []);

  return (
    <Wrapper>
      <Intro>마음에 드는 여행길을 골라보세요!</Intro>
      <OverflowWrapper>
        {guideData.map((guide: Guide, idx) => {
          return (
            <Card
              key={guide.id}
              bgColor={colors[idx % colors.length]}
              onClick={() => {
                setSelectedGuide(guide);
              }}
            >
              <CardTitle>{guide.title}</CardTitle>
              {selctedGuide?.id !== guide.id ? (
                <CardDetail>{guide.detail}</CardDetail>
              ) : (
                <CardAudio>
                  {guide.audio && (
                    <audio controls>
                      <source src={guide.audio} type="audio/mp4" />
                      This browser does not support
                    </audio>
                  )}
                </CardAudio>
              )}
            </Card>
          );
        })}
        {guideData.length === 0 && (
          <BlankCard onClick={handleMode}>
            <CardDetail>이 문화재의 첫 여행길을 만들어보세요.</CardDetail>
          </BlankCard>
        )}
      </OverflowWrapper>
    </Wrapper>
  );
};

export default PlayerPannel;
