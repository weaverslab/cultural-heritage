import React, {
  useContext,
  useEffect,
  useRef,
  useState
  } from "react";
import Context from "../Context";
import HalfMapViewPresenter from "./HalfMapViewPresenter";

interface Props {
  data: Heritage;
  guide?: Guide;
  mode: "player" | "creator";
  createdPath: Array<Geo>;
  setCreatedPath: any;
}

const HalfMapViewContainer: React.FunctionComponent<Props> = ({
  data,
  guide,
  mode,
  createdPath,
  setCreatedPath,
}: Props) => {
  const { lat, lng, loading } = useContext(Context);
  const [customMapCenter, setCustomMapCenter] = useState<any>({
    lat: 0,
    lng: 0,
  });
  const [zoom, setZoom] = useState<number>(16);

  const mapRef = useRef<any>();
  const mapsRef = useRef<any>();
  const routeRef = useRef<any>();
  const routeMarkerRef = useRef<any>([]);

  useEffect(() => {
    if (data) {
      const newLat = data.location._lat;
      const newLng = data.location._long;

      setCustomMapCenter({
        lat: newLat,
        lng: newLng,
      });
    }
  }, [data]);

  useEffect(() => {
    if (mapsRef.current && mapRef.current) {
      if (guide) {
        drawLine(guide.route, "#0F3F49");
      } else {
        clearLine();
      }
    }
  }, [guide]);

  useEffect(() => {
    if (mode === "creator" && createdPath.length > 0) {
      drawLine(createdPath, "#0F3F49");
    } else if (mode === "player") {
      clearLine();
    }
  }, [mode, createdPath]);

  function convertLatLng(coordinate: Geo) {
    return { lat: coordinate._lat, lng: coordinate._long };
  }

  function drawLine(coordinates: Array<any>, color: string): void {
    clearLine();
    routeMarkerRef.current = [];
    routeRef.current = new mapsRef.current.Polyline({
      path: coordinates.map(convertLatLng),
      geodesic: true,
      strokeColor: color,
      strokeOpacity: 1.0,
      strokeWeight: 6,
      map: mapRef.current,
    });

    for (let i = 0; i < routeRef.current.getPath().getLength(); i++) {
      const marker = new mapsRef.current.Marker({
        icon: {
          url: "/Images/dot.png",
          size: new google.maps.Size(8, 8),
          anchor: new google.maps.Point(4, 4),
        },
        position: routeRef.current.getPath().getAt(i),
        map: mapRef.current,
      });
      routeMarkerRef.current.push(marker);
    }
  }

  function clearLine() {
    if (routeRef.current) {
      routeRef.current.setMap(null);
    }
    routeMarkerRef.current.forEach((marker: any) => {
      marker.setMap(null);
    });
  }

  function handlePlus() {
    if (mapRef.current) {
      const lat = mapRef.current.center.lat();
      const lng = mapRef.current.center.lng();
      setCreatedPath([...createdPath, { _lat: lat, _long: lng }]);
    }
    // setThumbnailData(data[Number(key)]);
  }

  function handleReset() {
    clearLine();
    setCreatedPath([]);
  }

  function handleApiLoaded({ map, maps }: any) {
    mapRef.current = map;
    mapsRef.current = maps;
  }

  return (
    <HalfMapViewPresenter
      lat={lat}
      lng={lng}
      zoom={zoom}
      data={data}
      guide={guide}
      mode={mode}
      loading={loading}
      customMapCenter={customMapCenter}
      handleApiLoaded={handleApiLoaded}
      handlePlus={handlePlus}
      handleReset={handleReset}
    />
  );
};

export default HalfMapViewContainer;
