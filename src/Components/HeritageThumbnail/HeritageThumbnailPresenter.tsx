import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { httpToHttps } from "../../util";

const Wrapper = styled.div`
  position: absolute;
  bottom: 80px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Card = styled.div`
  max-width: 352px;
  width: 80%;
  height: 95px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.theme.shadows};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const Pattern = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("/images/patterns.png");
  background-size: cover;
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: ${(props) => props.theme.borderRadius};
  svg {
    position: absolute;
    right: 16px;
  }
`;

const Desc = styled.div`
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 16px;
  color: ${(props) => props.theme.colors.darkGreen[100]};
`;

const Title = styled.div`
  width: 100%;
  overflow: hidden;
  font-size: 1.5rem;
  font-family: ${(props) => props.theme.fonts.daumSemibold};
  font-size: 20px;
  margin-bottom: 8px;
`;

const Category = styled.div`
  width: 100%;
  font-size: 1rem;
  ${(props) => props.theme.fonts.content}
`;

const Photo = styled.div`
  width: 72px;
  height: 72px;
  border-radius: ${(props) => props.theme.borderRadius};
  overflow: hidden;
`;

const Img = styled.img`
  width: 72px;
  height: 72px;
  object-fit: cover;
`;

interface Props {
  title: string;
  category: string;
  img: string;
  id: string;
}

const HeritageThumbnailPresenter: React.FunctionComponent<Props> = ({
  title,
  category,
  img,
  id,
}: Props) => {
  return (
    <Link to={{ pathname: "/detail", state: { id } }}>
      <Wrapper>
        <Card>
          <Pattern>
            <Photo>
              <Img src={httpToHttps(img)} />
            </Photo>
            <Desc>
              <Title>{title}</Title>
              <Category>{category}</Category>
            </Desc>
            <svg
              width="13"
              height="23"
              viewBox="0 0 13 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 21.0564L1.57104 22.6274L12.8848 11.3137L1.57104 0L0 1.57104L9.74267 11.3137L0 21.0564Z"
                fill="#0F3F49"
              />
            </svg>
          </Pattern>
        </Card>
      </Wrapper>
    </Link>
  );
};

export default HeritageThumbnailPresenter;
