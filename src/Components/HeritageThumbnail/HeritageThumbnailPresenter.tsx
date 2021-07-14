import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  bottom: 80px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  width: 90%;
  height: 150px;
  background-color: white;
  border: 1px solid black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 16px 24px;
`;

const Desc = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Title = styled.div`
  width: 100%;
  overflow: hidden;
  font-size: 1.5rem;
`;

const Category = styled.div`
  width: 100%;
  font-size: 1rem;
`;

const GuideInfo = styled.div`
  width: 100%;
  font-size: 1rem;
`;

const Photo = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid grey;
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
  }
`;

interface Props {
  title: string;
  category: string;
  img: string;
}

const HeritageThumbnailPresenter: React.FunctionComponent<Props> = ({
  title,
  category,
  img,
}: Props) => {
  return (
    <Wrapper>
      <Card>
        <Desc>
          <Title>{title}</Title>
          <Category>문화재 분류 : {category}</Category>
          <GuideInfo>재생 가능한 가이드 : 0 개</GuideInfo>
        </Desc>
        <Photo>
          <img src={img} />
        </Photo>
      </Card>
    </Wrapper>
  );
};

export default HeritageThumbnailPresenter;
