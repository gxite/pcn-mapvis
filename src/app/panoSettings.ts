export interface NameAlias { var_name: string; var_alias: string;}
export interface ColorPair { rgb: number[]; hex: string;}
export interface NameColor { var_name: string; var_color: ColorPair;}

export class HeartlandSettings {
    layerTypes: NameAlias[] = [
        {var_name:"parkActivities",var_alias:"Activity"},
        {var_name:"parkFeatures",var_alias:"Feature"}];
    locations: NameAlias[] = [
        {var_name:"ecp1",var_alias:"East Coast Park 1"},
        {var_name:"ecp2",var_alias:"East Coast Park 2"},
        {var_name:"wcp",var_alias:"West Coast Park"},
        {var_name:"mbs1",var_alias:"Marina Bay Sands"},
        {var_name:"gardens",var_alias:"Gardens by the Bay"},
        {var_name:"alexandra",var_alias:"Alexandra Canal"},
        {var_name:"punggol",var_alias:"Punggol Canal"}];
    features: NameAlias[] = [
        {var_name:"Tree_Palm",var_alias:"Tree & Palm"},
        {var_name:"Grass_Field",var_alias:"Grassfields"},
        {var_name:"Plants_Flower",var_alias:"Plants & Hedges"},
        {var_name:"Sky",var_alias:"Sky"},
        {var_name:"Path_Floor",var_alias:"Path & Open Spaces"},
        {var_name:"Built-up_Area",var_alias:"Built-up Area"},
        {var_name:"carpark_lots_100m",var_alias:"Carpark lots within 100m"},
        {var_name:"carpark_lots_200m",var_alias:"Carpark lots within 200m"},
        {var_name:"facilities_25m",var_alias:"Facilities within 25m"},
        {var_name:"facilities_50m",var_alias:"Facilities within 50m"}];
    activities: NameAlias[] = [
        {var_name:"people",var_alias:"People"},
        {var_name:"people_active",var_alias:"People Active"},
        {var_name:"people_static",var_alias:"People Static"}];
    color: NameColor[] = [
        {var_name:"Tree_Palm",var_color: {"rgb":[9, 232, 94], "hex":"#09e85e"}},
        {var_name:"Grass_Field",var_color: {"rgb":[42, 252, 152],"hex":"#2aff98"}},
        {var_name:"Plants_Flower",var_color: {"rgb":[22, 193, 114],"hex":"#16c171"}},
        {var_name:"Sky",var_color: {"rgb":[45,225,252], "hex":"#2de0fc"}},
        {var_name:"Path_Floor",var_color: {"rgb":[193,188,172],"hex":"#C1BCAC"}},
        {var_name:"Built-up_Area",var_color: {"rgb":[151,155,141],"hex":"#979b8d"}},
        {var_name:"carpark_lots_100m",var_color: {"rgb":[122,136,255], "hex":"#7a87ff"}},
        {var_name:"carpark_lots_200m",var_color: {"rgb":[68,87,252],"hex":"#4457fc"}},
        {var_name:"facilities_25m",var_color: {"rgb":[114,165,247],"hex":"#72a5f7"}},
        {var_name:"acilities_50m",var_color: {"rgb":[68,139,252],"hex":"#450dfc"}},
        {var_name:"people",var_color: {"rgb":[255,56,242],"hex":"#ff38f2"}},
        {var_name:"people_active",var_color: {"rgb":[207,33,88], "hex":"#cf2158"}},
        {var_name:"people_static",var_color: {"rgb":[143,33,207],"hex":"#8f21cf"}}];
    timeOfWeek: string[] = ["Weekday","Weekend"];
    timeOfDay: string[] = ["Morning","Evening"];
    timeslot1 = {
        "Morning" : ["0700-0745","0745-0830","0830-0915","0915-1000","1000-1045"],
        "Evening" : ["1530-1620","1620-1710","1710-1800","1800-1850","1850-1940","1940-2030"]}; 
    timeslot2 = { //for punggol & alexandra
        "Morning" : ["0700-0800","0800-0900","0900-1000","1000-1100",],
        "Evening" : ["1530-1630","1630-1730","1730-1830","1830-1930",]};
}

export class islandSettings{
    layerTypes: NameAlias[] = [
        {var_name:"parkActivities",var_alias:"Activity"},
        {var_name:"parkFeatures",var_alias:"Feature"}];
    locations: NameAlias[] = [
        {var_name:"central_urban",var_alias:"Central Urban Loop"},
        {var_name:"eastern_coastal",var_alias:"Eastern Coastal Loop"},
        {var_name:"northern_explorer",var_alias:"Northern Explorer Loop"},
        {var_name:"northEastern_riverine",var_alias:"North Eastern Riverine Loop"},
        {var_name:"southern_ridges",var_alias:"Southerb Ridges Loop"},
        {var_name:"western_adventure",var_alias:"Western Adventure Loop"}];
    features: NameAlias[] = [
        {var_name:"Tree_Palm",var_alias:"Tree & Palm"},
        {var_name:"Grass_Field",var_alias:"Grassfields"},
        {var_name:"Plants_Flower",var_alias:"Plants & Hedges"},
        {var_name:"Sky",var_alias:"Sky"},
        {var_name:"Path_Floor",var_alias:"Path & Open Spaces"},
        {var_name:"Built-up_Area",var_alias:"Built-up Area"}];
    activities: NameAlias[] = [
        {var_name:"people",var_alias:"People"},
        {var_name:"bicycles",var_alias:"Bicycles"},
        {var_name:"vehicles",var_alias:"Vehicles"}];  
    color: NameColor[] = [
        {var_name:"Tree_Palm",var_color: {"rgb":[9, 232, 94], "hex":"#09e85e"}},
        {var_name:"Grass_Field",var_color: {"rgb":[42, 252, 152],"hex":"#2aff98"}},
        {var_name:"Plants_Flower",var_color: {"rgb":[22, 193, 114],"hex":"#16c171"}},
        {var_name:"Sky",var_color: {"rgb":[45,225,252], "hex":"#2de0fc"}},
        {var_name:"Path_Floor",var_color: {"rgb":[193,188,172],"hex":"#C1BCAC"}},
        {var_name:"Built-up_Area",var_color: {"rgb":[151,155,141],"hex":"#979b8d"}},
        {var_name:"people",var_color: {"rgb":[255,56,242],"hex":"#ff38f2"}},
        {var_name:"bicycles",var_color: {"rgb":[207,33,88], "hex":"#cf2158"}},
        {var_name:"vehicles",var_color: {"rgb":[143,33,207],"hex":"#8f21cf"}}];
}


//legacy code for old implementation. retained to facilitate transition.
export const locations :string[] = [
    "ecp1",
    "ecp2",
    "wcp",
    "mbs1",
    "gardens",
    "alexandra",
    "punggol"
]

export const timeOfWeek :Object = [
    "Weekday",
    "Weekend"
]

export const timeOfDay :Object = [
    "Morning",
    "Evening"
]

export const features :string[] = [
    "Tree_Palm",
    "Grass_Field",
    "Plants_Flower",
    "Sky",
    "Path_Floor",
    "Built-up_Area",
    "carpark_lots_100m",
    "carpark_lots_200m",
    "facilities_25m",
    "facilities_50m",
]

export const activities :string[] = [
    "people",
    "people_active",
    "people_static"
]

export const timeslot1 :Object= {
    "Morning" : [
        "0700-0745",
        "0745-0830",
        "0830-0915",
        "0915-1000",
        "1000-1045"
    ],
    "Evening" : [
        "1530-1620",
        "1620-1710",
        "1710-1800",
        "1800-1850",
        "1850-1940",
        "1940-2030"
    ]
} 

//for punggol & alexandra
export const timeslot2 :Object = {
    "Morning" : [
        "0700-0800",
        "0800-0900",
        "0900-1000",
        "1000-1100",
    ],
    "Evening" : [
        "1530-1630",
        "1630-1730",
        "1730-1830",
        "1830-1930",
    ]
}

export const colors :Object = {
    "panoGreen": [3, 252, 119], 
    "panoRed"  : [224, 59, 47],
    "panoBlue"  : [76, 229, 237],
    "Grass_Field": {"rgb":[42, 252, 152],"hex":"#2aff98"}, //mediumSpringGreen
    "Tree_Palm"  : {"rgb":[9, 232, 94], "hex":"#09e85e"}, //malachite
    "Plants_Flower"  : {"rgb":[22, 193, 114],"hex":"#16c171"}, //emerald
    "Sky" : {"rgb":[45,225,252], "hex":"#2de0fc"}, //skyBlueCrayola
    "Path_Floor" : {"rgb":[193,188,172],"hex":"#C1BCAC"},//paleSilver
    "Built-up_Area" : {"rgb":[151,155,141],"hex":"#979b8d"}, //artichoke
    "people" : {"rgb":[255,56,242],"hex":"#ff38f2"},
    "people_static" :{"rgb":[143,33,207],"hex":"#8f21cf"},
    "people_active" : {"rgb":[207,33,88], "hex":"#cf2158"},
    "carpark_lots_100m" : {"rgb":[122,136,255], "hex":"#7a87ff"},
    "carpark_lots_200m" : {"rgb":[68,87,252],"hex":"#4457fc"},
    "facilities_25m" : {"rgb":[114,165,247],"hex":"#72a5f7"},
    "facilities_50m" : {"rgb":[68,139,252],"hex":"#450dfc"},
}

export const layerTypes = {
    "Activity":"parkActivities",
    "Feature" : "parkFeatures"
}
