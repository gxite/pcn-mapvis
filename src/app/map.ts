//geojson formating constraints 
export interface IGeometry {
  type: string;
  coordinates: number[];
}

export interface IGeoJson {
  type: string;
  geometry: IGeometry;
  properties?: any;
  $key?: string;
}

export class GeoJson implements IGeoJson {
  type = 'Feature';
  geometry: IGeometry;

  constructor(coordinates, public properties?) {
    this.geometry = {
      type: 'Point',
      coordinates: coordinates
    }
  }
}

//deck.gl related constraints and data transformation methods.
export class FeatureCollection {
  type = 'FeatureCollection';
  features: GeoJson[]
  
  constructor() {}

  public transformToLine(fc :FeatureCollection) :Line[] {
    const features = fc.features;
    let extract = features.map((f)=>{
      return {"start":[f.geometry.coordinates[0],f.geometry.coordinates[1],0],
              "properties" : f.properties,
              "period" : f.properties.period,
              "timeslot" : f.properties.timeslot
      }
    });
    return extract;
  } 
}

export class Line {
  start: number[]; //the start coordinates of a line [x,y,z] 
  properties: any[];
  period: string;
  timeslot: string;
}

