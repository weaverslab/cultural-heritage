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
    guides?: Array<any>;
  }

  export interface Guide {
    id: string;
    route: Array<Geo>;
    title: string;
    detail: string;
    audio: string;
    createdAt: any;
  }

  export interface Geo {
    _lat: number;
    _long: number;
  }
}
