export const INNER_WIDTH_THRESHOLD = 420;
export interface NameAlias { name: string; alias: string;}
export interface ColorPair { rgb: number[]; hex: string;}

export class MasterSettings {
    layerTypes: NameAlias[] = [
        {name:"parkActivities",alias:"Activity"},
        {name:"parkFeatures",alias:"Feature"}];
    static exploreStates: NameAlias[] = [
        {name:"island",alias:"Island"},
        {name:"heartland",alias:"Heartland"}];
    timeOfWeek: NameAlias[] = [
        {name:"wd",alias:"Weekday"},
        {name:"we",alias:"Weekend"}];
    timeOfDay: NameAlias[] = [
        {name:"m",alias:"Morning"},
        {name:"e",alias:"Evening"},];
}

export class HeartlandSettings extends MasterSettings{
    locations: NameAlias[] = [
        {name:"ecp1",alias:"East Coast Park 1"},
        {name:"ecp2",alias:"East Coast Park 2"},
        {name:"wcp",alias:"West Coast Park"},
        {name:"mbs1",alias:"Marina Bay Sands"},
        {name:"gardens",alias:"Gardens by the Bay"},
        {name:"alexandra",alias:"Alexandra Canal"},
        {name:"punggol",alias:"Punggol Canal"}
    ];
    features: NameAlias[] = [
        {name:"Tree_Palm",alias:"Tree & Palm"},
        {name:"Grass_Field",alias:"Grassfields"},
        {name:"Plants_Flower",alias:"Plants & Hedges"},
        {name:"Sky",alias:"Sky"},
        {name:"Path_Floor",alias:"Path & Open Spaces"},
        {name:"Built-up_Area",alias:"Built-up Area"},
        {name:"carpark_lots_100m",alias:"Carpark lots within 100m"},
        {name:"carpark_lots_200m",alias:"Carpark lots within 200m"},
        {name:"facilities_25m",alias:"Facilities within 25m"},
        {name:"facilities_50m",alias:"Facilities within 50m"}
    ];
    activities: NameAlias[] = [
        {name:"people",alias:"People"},
        {name:"people_active",alias:"People Active"},
        {name:"people_static",alias:"People Static"}
    ];
    color = {
        "Tree_Palm": {"rgb":[9, 232, 94], "hex":"#09e85e"},
        "Grass_Field": {"rgb":[42, 252, 152],"hex":"#2aff98"},
        "Plants_Flower": {"rgb":[22, 193, 114],"hex":"#16c171"},
        "Sky": {"rgb":[45,225,252], "hex":"#2de0fc"},
        "Path_Floor": {"rgb":[193,188,172],"hex":"#C1BCAC"},
        "Built-up_Area": {"rgb":[151,155,141],"hex":"#979b8d"},
        "carpark_lots_100m": {"rgb":[122,136,255], "hex":"#7a87ff"},
        "carpark_lots_200m": {"rgb":[68,87,252],"hex":"#4457fc"},
        "facilities_25m": {"rgb":[114,165,247],"hex":"#72a5f7"},
        "facilities_50m": {"rgb":[68,139,252],"hex":"#450dfc"},
        "people": {"rgb":[255,56,242],"hex":"#ff38f2"},
        "people_active": {"rgb":[207,33,88], "hex":"#cf2158"},
        "people_static": {"rgb":[143,33,207],"hex":"#8f21cf"}
    };
    activityFormFields: NameAlias[] = [
        {name:"activities",alias:"Activity"},
        {name:"timeOfWeek",alias:"Time of Week"},
        {name:"timeOfDay",alias:"Time of Day"},
        {name:"timeslot",alias:"Timeslot"}  
    ];
    featureFormFields: NameAlias[] = [
        {name:"features",alias:"Features"}
    ];
    timeslot: NameAlias[] = [
        {name:"0700-0745",alias:"0700-0745"},
        {name:"0745-0830",alias:"0745-0830"},
        {name:"0830-0915",alias:"0830-0915"},
        {name:"0915-1000",alias:"0915-1000"},
        {name:"1000-1045",alias:"1000-1045"},
        {name:"1530-1620",alias:"1530-1620"},
        {name:"1620-1710",alias:"1620-1710"},
        {name:"1710-1800",alias:"1710-1800"},
        {name:"1800-1850",alias:"1800-1850"},
        {name:"1850-1940",alias:"1850-1940"},
        {name:"1940-2030",alias:"1940-2030"},
        {name:"0700-0800",alias:"0700-0800"},
        {name:"0800-0900",alias:"0800-0900"},
        {name:"0900-1000",alias:"0900-1000"},
        {name:"1000-1100",alias:"1000-1100"},
        {name:"1530-1630",alias:"1530-1630"},
        {name:"1630-1730",alias:"1630-1730"},
        {name:"1730-1830",alias:"1730-1830"},
        {name:"1830-1930",alias:"1830-1930"},
    ];
    timeslot1 = {
        "Morning" : ["0700-0745","0745-0830","0830-0915","0915-1000","1000-1045"],
        "Evening" : ["1530-1620","1620-1710","1710-1800","1800-1850","1850-1940","1940-2030"]
    }; 
    timeslot2 = { //for punggol & alexandra
        "Morning" : ["0700-0800","0800-0900","0900-1000","1000-1100",],
        "Evening" : ["1530-1630","1630-1730","1730-1830","1830-1930",]
    };  
}

export class IslandSettings extends MasterSettings{
    locations: NameAlias[] = [
        {name:"central_urban",alias:"Central Urban"},
        {name:"eastern_coastal",alias:"Eastern Coastal"},
        {name:"northern_explorer",alias:"Northern Explorer"},
        {name:"north_eastern_riverine",alias:"N.Eastern Riverine"},
        {name:"southern_ridges",alias:"Southern Ridges"},
        {name:"western_adventure",alias:"Western Adventure"},
        {name:"downtown",alias:"Downtown"}
    ];
    features: NameAlias[] = [
        {name:"Tree_Palm",alias:"Tree & Palm"},
        {name:"Grass_Field",alias:"Grassfields"},
        {name:"Plants_Flower",alias:"Plants & Hedges"},
        {name:"Sky",alias:"Sky"},
        {name:"Path_Floor",alias:"Path & Open Spaces"},
        {name:"Built-up_Area",alias:"Built-up Area"}
    ];
    activities: NameAlias[] = [
        {name:"people",alias:"People"},
        {name:"bicycles",alias:"Bicycles"},
        {name:"vehicles",alias:"Vehicles"}
    ];  
    color = {
        "Tree_Palm": {"rgb":[9, 232, 94], "hex":"#09e85e"},
        "Grass_Field": {"rgb":[42, 252, 152],"hex":"#2aff98"},
        "Plants_Flower": {"rgb":[22, 193, 114],"hex":"#16c171"},
        "Sky": {"rgb":[45,225,252], "hex":"#2de0fc"},
        "Path_Floor": {"rgb":[193,188,172],"hex":"#C1BCAC"},
        "Built-up_Area": {"rgb":[151,155,141],"hex":"#979b8d"},
        "people": {"rgb":[255,56,242],"hex":"#ff38f2"},
        "bicycles": {"rgb":[207,33,88], "hex":"#cf2158"},
        "vehicles": {"rgb":[143,33,207],"hex":"#8f21cf"}
    };
    activityFormFields: NameAlias[] = [
        {name:"activities",alias:"Activity"},
        {name:"timeOfWeek",alias:"Time of Week"},
        {name:"timeOfDay",alias:"Time of Day"},
    ];
    featureFormFields: NameAlias[] = [
        {name:"features",alias:"Features"}
    ];      
}

