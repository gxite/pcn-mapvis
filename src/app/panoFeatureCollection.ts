
export class FeatureCollection {

  type: string= 'FeatureCollection';
  features: GeoJson[];

  public transformToLine(fc :FeatureCollection) :Line[] {
    if (fc == null) return;
  
    return fc.features.map((data)=>{
      let out = {
        "start":[data.geometry.coordinates[0],data.geometry.coordinates[1],0],
        "id": data.geometry.coordinates[0].toString() + data.geometry.coordinates[1].toString(),
        "properties" : data.properties,
        "period" : data.properties.period,
        "timeslot" : data.properties.timeslot};
      return out;
    });
  } 

  public filterByActivity(data: Line[]): Line[] {
    return this.peopleSum(data,null,null) ;
  }

  public filterByWeek(data: Line[], week: Week): Line[] {
    let filtered = data.filter(d=>(d["period"]===week+"m") || (d["period"]===week+"e"));
    return this.peopleSum(filtered,null,null);
  }

  public filterByDay(data: Line[], day: Day): Line[] {
    let filtered = data.filter(d=>(d["period"]==="wd"+day) || (d["period"]==="we"+day));
    return this.peopleSum(filtered,null,null);    
  }
 
  public filterByPeriod(data: Line[], period: Period): Line[] {
    let filtered = data.filter(d=>d["period"]===period);
    return this.peopleSum(filtered,period,null);
  }

  public filterByTimeslot(data: Line[], period: Period, timeslot: string): Line[] {
    let filtered = data.filter(d=>d["period"]===period && d["timeslot"]===timeslot);
    return this.peopleSum(filtered,period,timeslot);
  }s

  public filterByTimeslotAndTimeOfDay(data: Line[],day: Day,timeslot: string): Line[] {
    let filtered = data.filter(d=>((d["period"]==="wd"+day) || (d["period"]==="we"+day)) && d["timeslot"]===timeslot);
    return this.peopleSum(filtered,null,timeslot);
  }
  
  private peopleSum(line: Line[], period: string, timeslot: string): Line[] {

    let aggregate = new Object; //id:[start,properties,period,timeslot,count]
    line.forEach(data=> {
      if (!aggregate[data.id]) {
        aggregate[data.id] = {
        "start": data.start,
        "properties": this.returnNewObject(data.properties),
        "period": period,
        "timeslot": timeslot,
        "count": 1 };
      }
      else {
        aggregate[data.id].properties.people += data.properties.people;
        aggregate[data.id].properties.people_static += data.properties.people_static;
        aggregate[data.id].properties.people_active += data.properties.people_active;
        aggregate[data.id].count += 1;
      }});

    //take average
    Object.values(aggregate).forEach(l=> {
      l.properties.people /=  l.count;
      l.properties.people_static /= l.count;
      l.properties.people_active /= l.count;
      delete l.count; //ensure Line[] is returned
    });

    return Object.values(aggregate);
  }

  private returnNewObject(obj: Object): Object {
    let out = {};
    Object.keys(obj).forEach(key=>out[key]=obj[key]);
    return out;
  }
}

export type Period = "wde" | "wdm" | "wem" | "wee";
export type Week = "wd" | "we";
export type Day = "m" | "e";

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

