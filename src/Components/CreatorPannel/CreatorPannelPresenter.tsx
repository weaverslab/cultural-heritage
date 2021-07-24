import React from "react";
import styled from "styled-components";
import MicImg from "../../Images/mic.png";
import PauseImg from "../../Images/pause.png";
import ResumeImg from "../../Images/resume.png";
import StopImg from "../../Images/stop.png";

interface StyledProps {
  focus?: boolean;
  saveDataReady?: boolean;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
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

const Create = styled.div`
  width: 100%;
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Save = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.colors.black[40]};
  border-radius: ${(props) => props.theme.borderRadius};
  ${(props) => props.theme.fonts.content};
  color: black;
  background-color: white;
  div {
    margin: 16px;
  }
  svg {
    margin-right: 8px;
  }
`;

const Complete = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.colors.black[40]};
  border-radius: ${(props) => props.theme.borderRadius};
  ${(props) => props.theme.fonts.content};
  color: black;
  background-color: white;
  svg {
    margin-right: 8px;
  }
`;

const Label = styled.div`
  width: 100%;
  ${(props) => props.theme.fonts.content};
  margin-bottom: 4px;
`;

const Verify = styled.div`
  width: 100%;
  color: ${(props) => props.theme.colors.redBrown[100]};
  ${(props) => props.theme.fonts.content};
  display: flex;
  justify-content: flex-end;
  align-items: center;
  svg {
    margin-right: 8px;
  }
`;

const LabelWrapper = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 72px;
  padding: 0px 16px;
  margin: 8px 0px;
  border: 1px solid ${(props) => props.theme.colors.grey[100]};
  border-radius: ${(props) => props.theme.borderRadius};
  ${(props) => props.theme.fonts.content};
  ::placeholder {
    color: ${(props) => props.theme.colors.black[40]};
  }
  &:focus {
    border: 1px solid ${(props) => props.theme.colors.yellow[80]};
  }
`;

const DetailArea = styled.textarea`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  padding: 16px;
  resize: none;
  margin: 8px 0px;
  border: 1px solid ${(props) => props.theme.colors.grey[100]};
  border-radius: ${(props) => props.theme.borderRadius};
  ${(props) => props.theme.fonts.content};
  ::placeholder {
    color: ${(props) => props.theme.colors.black[40]};
  }
  &:focus {
    border: 1px solid ${(props) => props.theme.colors.yellow[80]};
  }
`;

const AudioRecordWrapper = styled.div<StyledProps>`
  width: 100%;
  height: 256px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 8px 0px;
  background-color: white;
  border: 1px solid
    ${(props) =>
      props.focus
        ? props.theme.colors.yellow[80]
        : props.theme.colors.grey[100]};
  border-radius: ${(props) => props.theme.borderRadius};
`;

const AudioCheck = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  audio {
    width: 300px;
    height: 54px;
    margin: 8px 0px;
  }
`;

const RecordingTime = styled.div`
  font-size: 60px;
`;

const ControlButtons = styled.div`
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StartButton = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.redBrown[100]};
  margin: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.theme.shadows};
  &:hover {
    cursor: pointer;
  }
`;

const StopButton = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.redBrown[100]};
  margin: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.theme.shadows};
  &:hover {
    cursor: pointer;
  }
`;

const PauseButton = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.yellow[100]};
  margin: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.theme.shadows};
  &:hover {
    cursor: pointer;
  }
`;

const ClearButton = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.darkGreen[100]};
  margin: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.theme.shadows};
  &:hover {
    cursor: pointer;
  }
`;

const SaveButton = styled.div<StyledProps>`
  width: 100%;
  height: 64px;
  background-color: ${(props) =>
    props.saveDataReady
      ? props.theme.colors.darkGreen[100]
      : props.theme.colors.darkGreen[20]};
  color: white;
  ${(props) => props.theme.fonts.title};
  border-radius: ${(props) => props.theme.borderRadius};
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 0px 24px 0px;
  &:hover {
    cursor: ${(props) => (props.saveDataReady ? "pointer" : "not-allowed")};
  }
`;

interface Props {
  title: any;
  detail: any;
  status: "create" | "save" | "complete";
  recording: boolean;
  recordingTime: string;
  pause: boolean;
  audioURL: string;
  handleRecordingStart: () => any;
  handleRecordingStop: () => any;
  handleRecordingPause: () => any;
  handleRecordingResume: () => any;
  handleRecordingClear: () => any;
  handleSave: () => any;
  saveDataReady: boolean;
}

const CreatorPannelPresenter: React.FunctionComponent<Props> = ({
  title,
  detail,
  status,
  recording,
  recordingTime,
  pause,
  audioURL,
  handleRecordingStart,
  handleRecordingStop,
  handleRecordingPause,
  handleRecordingResume,
  handleRecordingClear,
  handleSave,
  saveDataReady,
}: Props) => {
  return (
    <Wrapper>
      {status === "create" && (
        <>
          <Intro>제가 여행길을 만들어 볼래요!</Intro>
          <OverflowWrapper>
            <Create>
              <LabelWrapper>
                <Label>여행길 제목</Label>
                <TitleInput
                  value={title.value}
                  onChange={title.onChange}
                  placeholder={"제목을 작성해 주세요."}
                />
                {title.value.length > 20 && (
                  <Verify>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 0C12.42 0 16 3.58 16 8C16 12.42 12.42 16 8 16C3.58 16 0 12.42 0 8C0 3.58 3.58 0 8 0ZM9.13 9.38L9.48 2.92H6.52L6.87 9.38H9.13ZM9.04 12.74C9.28 12.51 9.41 12.19 9.41 11.78C9.41 11.36 9.29 11.04 9.05 10.81C8.81 10.58 8.46 10.46 7.99 10.46C7.52 10.46 7.17 10.58 6.92 10.81C6.67 11.04 6.55 11.36 6.55 11.78C6.55 12.19 6.68 12.51 6.93 12.74C7.19 12.97 7.54 13.08 7.99 13.08C8.44 13.08 8.79 12.97 9.04 12.74V12.74Z"
                        fill="#BA3737"
                      />
                    </svg>
                    제목이 너무 깁니다.
                  </Verify>
                )}
              </LabelWrapper>
              <LabelWrapper>
                <Label>여행길 설명</Label>
                <DetailArea
                  value={detail.value}
                  onChange={detail.onChange}
                  placeholder={"간단한 설명을 작성해 주세요."}
                />
                {detail.value.length > 80 && (
                  <Verify>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 0C12.42 0 16 3.58 16 8C16 12.42 12.42 16 8 16C3.58 16 0 12.42 0 8C0 3.58 3.58 0 8 0ZM9.13 9.38L9.48 2.92H6.52L6.87 9.38H9.13ZM9.04 12.74C9.28 12.51 9.41 12.19 9.41 11.78C9.41 11.36 9.29 11.04 9.05 10.81C8.81 10.58 8.46 10.46 7.99 10.46C7.52 10.46 7.17 10.58 6.92 10.81C6.67 11.04 6.55 11.36 6.55 11.78C6.55 12.19 6.68 12.51 6.93 12.74C7.19 12.97 7.54 13.08 7.99 13.08C8.44 13.08 8.79 12.97 9.04 12.74V12.74Z"
                        fill="#BA3737"
                      />
                    </svg>
                    설명이 너무 깁니다.
                  </Verify>
                )}
              </LabelWrapper>
              <LabelWrapper>
                <Label>가이드 녹음</Label>
                <AudioRecordWrapper focus={recording}>
                  {audioURL ? (
                    <AudioCheck>
                      <audio controls>
                        <source src={audioURL} type="audio/mp4" />
                      </audio>
                      <ClearButton onClick={handleRecordingClear}>
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M0.9395 0.939622C1.22079 0.658415 1.60225 0.500442 2 0.500442C2.39775 0.500442 2.77921 0.658415 3.0605 0.939622L11 8.87912L18.9395 0.939622C19.0779 0.796356 19.2434 0.682083 19.4264 0.60347C19.6094 0.524856 19.8062 0.483477 20.0054 0.481746C20.2046 0.480015 20.4021 0.517968 20.5864 0.593389C20.7708 0.668811 20.9383 0.78019 21.0791 0.921029C21.2199 1.06187 21.3313 1.22935 21.4067 1.41369C21.4822 1.59804 21.5201 1.79555 21.5184 1.99472C21.5166 2.19389 21.4753 2.39072 21.3967 2.57373C21.318 2.75673 21.2038 2.92225 21.0605 3.06062L13.121 11.0001L21.0605 18.9396C21.3337 19.2225 21.4849 19.6014 21.4815 19.9947C21.4781 20.388 21.3203 20.7642 21.0422 21.0423C20.7641 21.3205 20.3879 21.4782 19.9946 21.4816C19.6013 21.4851 19.2224 21.3339 18.9395 21.0606L11 13.1211L3.0605 21.0606C2.7776 21.3339 2.39869 21.4851 2.0054 21.4816C1.6121 21.4782 1.23588 21.3205 0.957772 21.0423C0.67966 20.7642 0.521907 20.388 0.518489 19.9947C0.515072 19.6014 0.666263 19.2225 0.9395 18.9396L8.879 11.0001L0.9395 3.06062C0.658294 2.77933 0.50032 2.39787 0.50032 2.00012C0.50032 1.60238 0.658294 1.22091 0.9395 0.939622Z"
                            fill="white"
                          />
                        </svg>
                      </ClearButton>
                    </AudioCheck>
                  ) : (
                    <>
                      <RecordingTime>{recordingTime}</RecordingTime>
                      <ControlButtons>
                        {recording ? (
                          <>
                            <StopButton onClick={handleRecordingStop}>
                              <img
                                src={StopImg}
                                width="30"
                                height="30"
                                alt="Microphone icons"
                              />
                            </StopButton>
                            <PauseButton
                              onClick={
                                pause
                                  ? handleRecordingResume
                                  : handleRecordingPause
                              }
                            >
                              {pause ? (
                                <img
                                  src={ResumeImg}
                                  width="30"
                                  height="30"
                                  alt="Microphone icons"
                                />
                              ) : (
                                <img
                                  src={PauseImg}
                                  width="30"
                                  height="30"
                                  alt="Microphone icons"
                                />
                              )}
                            </PauseButton>
                          </>
                        ) : (
                          <StartButton onClick={handleRecordingStart}>
                            <img
                              src={MicImg}
                              width="30"
                              height="30"
                              alt="Microphone icons"
                            />
                          </StartButton>
                        )}
                      </ControlButtons>
                    </>
                  )}
                </AudioRecordWrapper>
              </LabelWrapper>
              <LabelWrapper>
                {!saveDataReady && (
                  <Verify>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 0C12.42 0 16 3.58 16 8C16 12.42 12.42 16 8 16C3.58 16 0 12.42 0 8C0 3.58 3.58 0 8 0ZM9.13 9.38L9.48 2.92H6.52L6.87 9.38H9.13ZM9.04 12.74C9.28 12.51 9.41 12.19 9.41 11.78C9.41 11.36 9.29 11.04 9.05 10.81C8.81 10.58 8.46 10.46 7.99 10.46C7.52 10.46 7.17 10.58 6.92 10.81C6.67 11.04 6.55 11.36 6.55 11.78C6.55 12.19 6.68 12.51 6.93 12.74C7.19 12.97 7.54 13.08 7.99 13.08C8.44 13.08 8.79 12.97 9.04 12.74V12.74Z"
                        fill="#BA3737"
                      />
                    </svg>
                    모든 입력을 다시 확인해 주세요.
                  </Verify>
                )}
                <SaveButton onClick={handleSave} saveDataReady={saveDataReady}>
                  등록하기
                </SaveButton>
              </LabelWrapper>
            </Create>
          </OverflowWrapper>
        </>
      )}
      {status === "save" && (
        <Save>
          <div>여행길을 등록중입니다.</div>
          <div>
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.66 0C2.98 0 0 2.98667 0 6.66667C0 10.3467 2.98 13.3333 6.66 13.3333C10.3467 13.3333 13.3333 10.3467 13.3333 6.66667C13.3333 2.98667 10.3467 0 6.66 0ZM9.33333 9.33333C9.27166 9.39514 9.1984 9.44417 9.11775 9.47762C9.0371 9.51108 8.95065 9.5283 8.86333 9.5283C8.77602 9.5283 8.68957 9.51108 8.60892 9.47762C8.52827 9.44417 8.45501 9.39514 8.39333 9.33333L6.2 7.14C6.13701 7.07826 6.08689 7.00463 6.05256 6.92338C6.01823 6.84213 6.00037 6.75487 6 6.66667V4C6 3.63333 6.3 3.33333 6.66667 3.33333C7.03333 3.33333 7.33333 3.63333 7.33333 4V6.39333L9.33333 8.39333C9.59333 8.65333 9.59333 9.07333 9.33333 9.33333Z"
                fill="#FCBF30"
              />
            </svg>
            잠시만 기다려 주세요.
          </div>
        </Save>
      )}
      {status === "complete" && (
        <Complete>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM12.03 4.97C11.9586 4.89882 11.8735 4.84277 11.7799 4.80522C11.6863 4.76766 11.5861 4.74936 11.4853 4.75141C11.3845 4.75347 11.2851 4.77583 11.1932 4.81717C11.1012 4.85851 11.0185 4.91797 10.95 4.992L7.477 9.417L5.384 7.323C5.24183 7.19052 5.05378 7.1184 4.85948 7.12183C4.66518 7.12525 4.47979 7.20397 4.34238 7.34138C4.20497 7.47879 4.12625 7.66418 4.12283 7.85848C4.1194 8.05278 4.19152 8.24083 4.324 8.383L6.97 11.03C7.04128 11.1012 7.12616 11.1572 7.21958 11.1949C7.313 11.2325 7.41305 11.2509 7.51375 11.2491C7.61444 11.2472 7.71374 11.2251 7.8057 11.184C7.89766 11.1429 7.9804 11.0837 8.049 11.01L12.041 6.02C12.1771 5.8785 12.2523 5.68928 12.2504 5.49296C12.2485 5.29664 12.1698 5.10888 12.031 4.97H12.03Z"
              fill="#0F3F49"
            />
          </svg>
          <div>여행길이 등록되었습니다.</div>
        </Complete>
      )}
    </Wrapper>
  );
};

export default CreatorPannelPresenter;
