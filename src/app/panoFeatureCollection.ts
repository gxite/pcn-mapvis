
export class FeatureCollection {

  type: string= 'FeatureCollection';
  features: GeoJson[];

  public transformToLine(fc :FeatureCollection) :Line[] {
    const features = fc.features;
    return features.map((data)=>{
      let out = {
        "start":[data.geometry.coordinates[0],data.geometry.coordinates[1],0],
        "id": data.geometry.coordinates[0].toString() + data.geometry.coordinates[1].toString(),
        "properties" : data.properties,
        "period" : data.properties.period,
        "timeslot" : data.properties.timeslot};
      delete data.properties.timeslot;
      delete data.properties.period;
      return out;
    });
  } 
  public timeslot(line :Line[],timeOfWeek:string,timeOfDay:string,timeslot:string) : Line[]{
    return line.filter(l=>(
      (l["period"] === this.getPeriod(timeOfDay,timeOfWeek)) &&
      (l["timeslot"] === timeslot)
    ))
  }
  public period(line: Line[], timeOfWeek: string, timeOfDay: string): Line[]{
    let period = this.getPeriod(timeOfDay,timeOfWeek);
    let filtered = line.filter(l=>l["period"] === period);
    return this.peopleSum(filtered,period,null);
  }
  public week(line: Line[],timeOfWeek: string): Line[]{
    let filtered = line.filter(l=>
      l["period"] === this.getPeriod("Morning",timeOfWeek) || l["period"] === this.getPeriod("Evening",timeOfWeek));
      return this.peopleSum(filtered,null,null)
  }
  public day(line: Line[],timeOfDay: string): Line[]{
    let filtered = line.filter(l=>
      l["period"] === this.getPeriod(timeOfDay,"Weekday") || l["period"] === this.getPeriod(timeOfDay,"Weekend"));
      return this.peopleSum(filtered,null,null)
  }
  public extractPropertiesArray (line: Line[],selectedProperty: string) {
    let arrayOut = []
    line.forEach(data=>{arrayOut.push(data.properties[selectedProperty])});
    return arrayOut;
  }
  private peopleSum(line: Line[], period: string, timeslot: string): Line[] {
    let aggregate = {}; //id:[start,properties,period,timeslot]
    line.forEach(data=> {
      if (!aggregate[data.id]) {
        aggregate[data.id] = {
        "start": data.start,
        "properties": data.properties, 
        "period": period,
        "timeslot": timeslot};
      }
      else {
        aggregate[data.id].properties.people += data.properties.people;
        aggregate[data.id].properties.people_static += data.properties.people_static;
        aggregate[data.id].properties.people_active += data.properties.people_active;
      }});
    return Object.values(aggregate);
  }
  private getPeriod(panoTimeOfDay :string, panoTimeOfWeek :string) :string{
    if (panoTimeOfWeek == "Weekday" && panoTimeOfDay == "Morning") {
      return "wdm";
    }
    else if (panoTimeOfWeek == "Weekday" && panoTimeOfDay == "Evening") {
      return "wde";
    }
    else if (panoTimeOfWeek == "Weekend" && panoTimeOfDay == "Morning") {
      return "wem";
    }
    else if (panoTimeOfWeek == "Weekend" && panoTimeOfDay == "Evening") {
      return "wee";
    }
  }
}

export interface Line {
  start: number[]; //the start coordinates of a line [x,y,z] 
  id: string;
  properties: any;
  period: string;
  timeslot: string;
}

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

