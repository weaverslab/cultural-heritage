import firebase from "firebase/app";
import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useAudioDevice from "../../Hooks/useAudioDevice";
import useInput from "../../Hooks/useInput";
import { secondsToTime } from "../../util";
import CreatorPannelPresenter from "./CreatorPannelPresenter";

interface Props {
  createdPath: Array<Geo>;
  heritageData?: Heritage;
  setGuideData: any;
}

const CreatorPannelContainer: React.FunctionComponent<Props> = ({
  createdPath,
  heritageData,
  setGuideData,
}: Props) => {
  const title = useInput("");
  const detail = useInput("");
  const { chunks, mediaRecorder, getAudioDevice } = useAudioDevice();
  const [status, setStatus] = useState<"create" | "save" | "complete">(
    "create"
  );
  const [recording, setRecording] = useState<boolean>(false);
  const [pause, setPause] = useState<boolean>(false);
  const [second, setSecond] = useState<number>(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioURL, setAudioURL] = useState<string>("");
  const timerRef = useRef<any>();

  function startTimer() {
    function countDown() {
      setSecond((v) => v + 1);
    }
    timerRef.current = setInterval(countDown, 1000);
  }

  async function handleRecordingStart() {
    let isRecordingAvailabe = true;
    if (!mediaRecorder.current) {
      isRecordingAvailabe = await getAudioDevice();
    }
    if (isRecordingAvailabe) {
      mediaRecorder.current.start(10);
      startTimer();
      setRecording(true);
    }
  }

  function handleRecordingStop() {
    clearInterval(timerRef.current);
    // stop the recorder
    mediaRecorder.current.stop();
    setSecond(0);
    setRecording(false);
    saveAudio();

    function saveAudio() {
      const newBlob = new Blob(chunks.current, { type: "audio/mp3" });
      const newAudioURL = window.URL.createObjectURL(newBlob);
      setAudioURL(newAudioURL);
      setAudioBlob(newBlob);
    }
  }

  function handleRecordingPause() {
    clearInterval(timerRef.current);
    mediaRecorder.current.pause();
    setPause(true);
  }

  function handleRecordingResume() {
    startTimer();
    mediaRecorder.current.resume();
    setPause(false);
  }

  function handleRecordingClear() {
    setAudioURL("");
    setAudioBlob(null);
  }

  function isValidateData() {
    if (
      title.value === "" ||
      detail.value === "" ||
      createdPath.length < 2 ||
      !audioBlob
    ) {
      return false;
    } else {
      return true;
    }
  }

  async function handleSave() {
    if (isValidateData() && heritageData && audioBlob) {
      setStatus("save");
      try {
        const db = firebase.firestore();
        const storage = firebase.storage();

        // 가이드 음성 파일 저장
        const filename = uuidv4() + ".mp3";
        const filepath = "audios/" + filename;
        const storageRef = storage.ref();
        const fileRef = storageRef.child(filepath);
        const savedFile = await fileRef.put(audioBlob, {
          contentType: "audio/mp3",
        });
        const fileURL = await savedFile.ref.getDownloadURL();

        // 가이드 저장
        const heritageDoc = db.collection("heritage").doc(heritageData.id);
        const guideDoc = heritageDoc.collection("guide").doc();
        const newGuide: Guide = {
          id: guideDoc.id,
          title: title.value,
          detail: detail.value,
          route: createdPath,
          audio: fileURL,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        };
        await guideDoc.set(newGuide);

        setGuideData((v: any) => {
          return [newGuide, ...v];
        });
        setStatus("complete");
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
    <CreatorPannelPresenter
      title={title}
      detail={detail}
      status={status}
      recording={recording}
      recordingTime={secondsToTime(second)}
      pause={pause}
      audioURL={audioURL}
      handleRecordingStart={handleRecordingStart}
      handleRecordingStop={handleRecordingStop}
      handleRecordingPause={handleRecordingPause}
      handleRecordingResume={handleRecordingResume}
      handleRecordingClear={handleRecordingClear}
      handleSave={handleSave}
    />
  );
};

export default CreatorPannelContainer;
