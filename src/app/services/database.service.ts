/* Description: Contains methods that handles backend access and communications */

import { Injectable } from '@angular/core'

import * as firebase from "firebase/app"; // Firebase App (the core Firebase SDK) is always required and must be listed first
import "firebase/database";

import { environment } from '../../environments/environment';
import { FeatureCollection, Line } from "../panoFeatureCollection";

/*The types are defined based on the labels and hierarchy used in the firebase realtime database */
export type panoCategory = "panoAction" | "panoObject";
export type panoType = "parkActivities" | "parkFeatures";

interface cacheId {category: panoCategory;type: panoType;location: string}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  firebase: any;
  fc: FeatureCollection;

  cache= {
    panoAction:{parkActivities:{},parkFeatures:{}},
    panoObject:{parkActivities:{},parkFeatures:{}}};

  constructor() {
    firebase.initializeApp(environment.firebaseConfig);
    this.firebase = firebase.database();
    this.fc = new FeatureCollection;
  }
  
  public fetchData(category: panoCategory, type: panoType, location: string): Promise<Line[]> {
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
    this.cache[id.category][id.type][id.location] = this.firebaseFetch(id).then(d=>this.fc.transformToLine(d));
  }

  private getCache(id: cacheId) {
    return this.cache[id.category][id.type][id.location];
  }

  private firebaseFetch(id: cacheId): Promise<FeatureCollection> {
    return new Promise<FeatureCollection>((resolve,reject) => {
      this.firebase.ref(this.getDatabaseAddress(id)).on('value',(snapshot)=> {
        resolve(snapshot.val());
      })
    });
  }

  private getDatabaseAddress(id: cacheId): string {
    return id.category+"/"+id.type+"/"+id.location;
  }

  private generateCacheId(category: panoCategory, type: panoType, location: string): cacheId{
    return {category,type,location};
  }
}