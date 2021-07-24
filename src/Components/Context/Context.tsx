import { createContext } from "react";

interface CustomContext {
  data: Array<Heritage>;
  setData: any;
  getData: any;
  lat: number;
  lng: number;
  loading: boolean;
}

const Context = createContext<CustomContext>({
  data: [],
  setData: () => null,
  getData: () => null,
  lat: 0,
  lng: 0,
  loading: true,
});

export default Context;
