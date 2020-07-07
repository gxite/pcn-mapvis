import {INNER_WIDTH_THRESHOLD} from "../app/panoSettings"

export const environment = {
  production: true,
  mapboxConfig: {
    accessToken: "pk.eyJ1IjoiZ3hpdGUiLCJhIjoiY2s1bmt2aXkxMG15NDNka2V0MnY4b3F2OSJ9.5QGgH6zF6kth58wWvWbe-g",
    style: 'mapbox://styles/gxite/ck7t2v2d810oy1irrp09ni5ss',
  },
  viewState: {
    latitude: 1.3580576343735706,
    longitude: 103.80844116210938,
    zoom: window.innerWidth < INNER_WIDTH_THRESHOLD ? 9 : 11,
    bearing: 0,
    pitch: 30
  },
  firebaseConfig: {
    apiKey: "AIzaSyCszwy5ieqgj370oJbtGUQVorIFdaQGHe0",
    authDomain: "pcn-web.firebaseapp.com",
    databaseURL: "https://pcn-web.firebaseio.com/",
    storageBucket: "gs://pcn-web.appspot.com",
    appId: "1:194597727779:web:1bed585aaf7aa68d618b96",
    projectId: "pcn-web"
  }
};
