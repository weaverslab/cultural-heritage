import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Hr from "../Hr";

const Wrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.grey[20]};
  display: flex;
  justify-content: center;
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

const Message = styled.div`
  ${(props) => props.theme.fonts.title};
  margin: 32px;
`;

const Button = styled.div`
  width: 196px;
  height: 48px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.black[40]};
  border-radius: ${(props) => props.theme.borderRadius};
  &:hover {
    cursor: pointer;
  }
`;

const Forbidden: React.FunctionComponent = () => {
  return (
    <Wrapper>
      <Pattern>
        <Hr width={"100px"} />
        <Message>잘못된 접근입니다.</Message>
        <Link to={"/"}>
          <Button>홈으로 돌아가기</Button>
        </Link>
      </Pattern>
    </Wrapper>
  );
};

export default Forbidden;
