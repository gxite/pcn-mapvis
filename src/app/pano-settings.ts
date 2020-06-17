
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
}


export const layerTypes: Object = {
    "activities":"parkActivities",
    "features" : "parkFeatures"
}
