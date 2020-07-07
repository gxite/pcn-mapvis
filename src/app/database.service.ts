import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';
import { FeatureCollection } from "./panoFeatureCollection";
import { NameAlias } from "./panoSettings";

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  firebase: any;

  cache= {
    panoAction:{parkActivities:{},parkFeatures:{}},
    panoObject:{parkActivities:{},parkFeatures:{}}};

  constructor() {
    firebase.initializeApp(environment.firebaseConfig);
    this.firebase = firebase.database();
  }
  
  public fetchData(category: panoCategory, type: panoType, location: string): Promise<FeatureCollection> {
    if (!this.cache[category][type][location]) {
      return this.cache[category][type][location] = new Promise<FeatureCollection>((resolve,reject) => {
        this.firebase.ref(category+"/"+type+"/"+location).on('value',(snapshot)=> {
          resolve(snapshot.val());
          console.log("Fetched Successful.");
        })
      });
    }
    return this.cache[category][type][location];
}

  //legacy code for old implementation. retained to facilitate transition.
  public getLocationData(locationSelection: string, layerType: string): Promise<FeatureCollection> {
      return new Promise((resolve,reject) => {
        this.firebase.ref("panoAction/" + layerType + "/"+ locationSelection).on('value',(snapshot)=> {
          resolve(snapshot.val());
          console.log("Fetched Successful.");
        })
      });
  }
}

export type panoCategory = "panoAction" | "panoObject";
export type panoType = "parkActivities" | "parkFeatures";