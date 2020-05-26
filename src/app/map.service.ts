import { Injectable } from '@angular/core';

//mapbox and geojsn related 
import { environment } from '../environments/environment';
import { GeoJson } from "./map";
import * as mapboxgl from 'mapbox-gl';

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

import "firebase/database";
import "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class MapService {

  firebase: any;
  firestore: any;

  constructor() {
    //assigning the accessToken stored in environments to mapboxgl
    mapboxgl.accessToken = environment.mapboxConfig.accessToken;
    
    firebase.initializeApp(environment.firebaseConfig);
    this.firebase = firebase.database();
    this.firestore = firebase.firestore();

   }

   
}
