import React, { useEffect, useRef, useState } from "react";

export default (): any => {
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);

  const tRef = useRef<any>();

  useEffect(() => {
    getGeoPosition();
    if (!tRef.current) {
      tRef.current = setInterval(getGeoPosition, 1000);
    }
    return () => {
      clearInterval(tRef.current);
    };
  }, []);

  function getGeoPosition() {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    });
  }

  return { lat, lng };
};
