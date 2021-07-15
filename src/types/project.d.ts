import {} from "express";

declare global {
  export interface Heritage {
    id: string;
    city: string;
    title: string;
    geohash: string;
    code: string;
    location: Geo;
    img: string;
    guides?: Array<string>;
  }

  export interface Guide {
    id: string;
    route: Array<Geo>;
    title: string;
  }

  export interface Geo {
    _lat: number;
    _long: number;
  }
}
