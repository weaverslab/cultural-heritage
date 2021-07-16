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
  justify-content: center;
  align-items: center;
  ${(props) => props.selected && "border: 4px solid pink"};
`;

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
              {guide.title}
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
