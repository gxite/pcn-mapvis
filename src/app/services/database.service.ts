import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { FeatureCollection } from "../panoFeatureCollection";

// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/firestore";

export type panoCategory = "panoAction" | "panoObject";
export type panoType = "parkActivities" | "parkFeatures";

interface cacheId {category: panoCategory;type: panoType;location: string}

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
    let id = this.generateCacheId(category,type,location);
    
    if (!this.isCached(id)) {
      this.setCache(id);
      return this.getCache(id);
    }
    return this.getCache(id);
  }

  private isCached(id: cacheId) {
    return this.cache[id.category][id.type][id.location]; 
  }

  private setCache(id: cacheId) {
    this.cache[id.category][id.type][id.location] = this.firebaseFetch(id);
  }

  private getCache(id: cacheId) {
    return this.cache[id.category][id.type][id.location];
  }

  private firebaseFetch(id: cacheId): Promise<FeatureCollection> {
    return new Promise<FeatureCollection>((resolve,reject) => {
      this.firebase.ref(this.getDatabaseAddress(id)).on('value',(snapshot)=> {
        resolve(snapshot.val());
        console.log("Fetched Successful.");
      })
    });
  }

  private getDatabaseAddress(id: cacheId): string {
    return id.category+"/"+id.type+"/"+id.location;
  }

  private generateCacheId(category: panoCategory, type: panoType, location: string): cacheId{
    return {category,type,location};
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