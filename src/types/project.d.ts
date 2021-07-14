import {} from "express";

declare global {
  export interface Heritage {
    id: string;
    city: string;
    title: string;
    geohash: string;
    code: string;
    location: { _lat: number; _long: number };
  }
}
