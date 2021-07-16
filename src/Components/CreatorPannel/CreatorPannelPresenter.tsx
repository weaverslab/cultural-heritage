import React from "react";
import styled from "styled-components";
import MicImg from "../../Images/mic.png";
import PauseImg from "../../Images/pause.png";
import ResumeImg from "../../Images/resume.png";
import StopImg from "../../Images/stop.png";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding: 16px 16px;
  overflow: hidden;
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

const TitleInput = styled.input`
  width: 100%;
  height: 50px;
  font-size: 24px;
  margin: 8px 0px;
`;

const DetailArea = styled.textarea`
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  padding: 8px;
  resize: none;
  margin: 8px 0px;
`;

const AudioRecordWrapper = styled.div`
  width: 100%;
  height: 256px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 8px 0px;
  background-color: white;
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
  background-color: #f50057;
  margin: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const StopButton = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #c63a3a;
  margin: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const PauseButton = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #d7be5b;
  margin: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const ClearButton = styled.div`
  width: 128px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  background-color: #dfdfdf;
  font-size: 24px;
  &:hover {
    cursor: pointer;
  }
  &:after {
    content: "Clear";
  }
`;

const SaveButton = styled.div`
  width: 100%;
  height: 64px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 32px;
  &:hover {
    cursor: pointer;
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
}: Props) => {
  return (
    <Wrapper>
      {status === "create" && (
        <OverflowWrapper>
          <Create>
            <div>CreatorPannelPresenter</div>
            <TitleInput
              value={title.value}
              onChange={title.onChange}
              placeholder={"제목을 입력해주세요."}
            />
            <DetailArea
              value={detail.value}
              onChange={detail.onChange}
              placeholder={"내용을 입력해주세요."}
            />
            <AudioRecordWrapper>
              {audioURL ? (
                <AudioCheck>
                  <audio controls>
                    <source src={audioURL} type="audio/ogg" />
                    <source src={audioURL} type="audio/mpeg" />
                  </audio>
                  <ClearButton onClick={handleRecordingClear} />
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
                            pause ? handleRecordingResume : handleRecordingPause
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
            <SaveButton onClick={handleSave}>save</SaveButton>
          </Create>
        </OverflowWrapper>
      )}
      {status === "save" && <Save>저장중</Save>}
      {status === "complete" && <Complete>저장이 완료되었습니다.</Complete>}
    </Wrapper>
  );
};

export default CreatorPannelPresenter;
