
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
    "Path_Floor" : {"rgb":[193,188,172],"hex":"#c112ad"},//paleSilver
    "Built-up_Area" : {"rgb":[151,155,141],"hex":"#979b8d"}, //artichoke
    "people" : {"rgb":[255,56,242],"hex":"#ff38f2"},
    "people_static" :{"rgb":[143,33,207],"hex":"#8f21cf"},
    "people_active" : {"rgb":[207,33,88], "hex":"#cf2158"},
    "carpark_lots_100m" : {"rgb":[122,136,255], "hex":"#7a87ff"},
    "carpark_lots_200m" : {"rgb":[68,87,252],"hex":"#4457fc"},
    "facilities_25m" : {"rgb":[114,165,247],"hex":"#72a5f7"},
    "facilities_50m" : {"rgb":[68,139,252],"hex":"#450dfc"},
    "residence_25m_gfa" : {"rgb":[200,181,255],"hex":"#c8b5ff"},   
    "residence_50m_gfa" : {"rgb":[154,120,255],"hex":"#9a0cff"},   
    "residence_100m_gfa" : {"rgb":[119,74,255],"hex":"#774aff"}, 
}

export const layerTypes: Object = {
    "Activity":"parkActivities",
    "Feature" : "parkFeatures"
}
