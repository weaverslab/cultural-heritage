import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface StyledProps {
  selected?: boolean;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 16px 16px;
  overflow: hidden;
`;

const OverflowWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

const Card = styled.div<StyledProps>`
  width: 100%;
  height: 100px;
  margin-bottom: 16px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${(props) => props.selected && "border: 4px solid pink"};
  &:hover {
    cursor: pointer;
  }
`;

const CardTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const CardDetail = styled.div``;

const CardAudio = styled.div``;

interface Props {
  guideData: Array<Guide>;
  selctedGuide?: Guide;
  setSelectedGuide: any;
}

const PlayerPannel: React.FunctionComponent<Props> = ({
  guideData,
  selctedGuide,
  setSelectedGuide,
}: Props) => {
  return (
    <Wrapper>
      <OverflowWrapper>
        {guideData.map((guide: Guide) => {
          return (
            <Card
              key={guide.id}
              selected={selctedGuide?.id === guide.id}
              onClick={() => {
                setSelectedGuide(guide);
              }}
            >
              {selctedGuide?.id !== guide.id ? (
                <>
                  <CardTitle>{guide.title}</CardTitle>
                  <CardDetail>{guide.detail}</CardDetail>
                </>
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
        <Link to={{ pathname: "/" }}>
          <Card>뒤로가기</Card>
        </Link>
      </OverflowWrapper>
    </Wrapper>
  );
};

export default PlayerPannel;
