import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { FeatureCollection } from "./map";

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  firebase: any;

  constructor() {
    //assigning the accessToken stored in environments to mapboxgl
    mapboxgl.accessToken = environment.mapboxConfig.accessToken;
    
    firebase.initializeApp(environment.firebaseConfig);
    this.firebase = firebase.database();

   }

  public getLocationData(locationSelection: string, layerType: string) :Promise<FeatureCollection> {
      return new Promise((resolve,reject) => {
        this.firebase.ref("panoAction/" + layerType + "/"+ locationSelection).on('value',(snapshot)=> {
          resolve(snapshot.val());
          console.log("Fetched Successful.");
        })
      });
  }
}
