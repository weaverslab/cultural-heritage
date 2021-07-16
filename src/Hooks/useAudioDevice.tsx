import React, { useEffect, useRef } from "react";

interface recordInfo {
  chunks: React.MutableRefObject<Array<Blob>>;
  mediaRecorder: React.MutableRefObject<MediaRecorder>;
  getAudioDevice: () => any;
}

export default (): recordInfo => {
  const chunks = useRef<any>();
  const mediaRecorder = useRef<any>();

  useEffect(() => {
    chunks.current = [];
  }, []);

  async function getAudioDevice() {
    if (navigator.mediaDevices) {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (e: BlobEvent) => {
        if (e.data && e.data.size > 0) {
          chunks.current.push(e.data);
        }
      };
      return true;
    } else {
      console.log("Media Decives Not Work");
      return false;
    }
  }

  return {
    chunks,
    mediaRecorder,
    getAudioDevice: getAudioDevice,
  };
};
