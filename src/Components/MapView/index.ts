import { GoogleApiWrapper } from "google-maps-react";
import Loader from "../Loader";
import MapViewContainer from "./MapViewContainer";

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAPS_KEY || "",
  LoadingContainer: Loader,
})(MapViewContainer);
