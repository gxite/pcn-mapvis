# PCN Mapvis
*Updated on 17-11-2020*

This is a custom data visualization tool that was developed to aid in the spatial analysis of the data collected for the research project [Measuring the physical profile and use of Park Connector Network in Singapore using deep learning and big data analytics.](https://www.researchgate.net/publication/329909265_Measuring_the_physical_profile_and_use_of_Park_Connector_Network_in_Singapore_using_deep_learning_and_big_data_analytics)

___

## Main Features:

- Visualizes the distribution of spatial data in a 3D map environment.
- Values are shown as extruded lines along the z-axis.
- Current configuration allows *Feature data* to be overlayed against *Activity data*.


## Current work in progress:
1. Bounding box selections
1. Interactive descriptive statistics panel.

___

## Current Tech stack:
- Angular
- Firebase Realtime Database 
- Mapbox
- deck.gl
- Material Design
___

## Navigating the repo

The main development code is located at `pcn-mapvis/src/app/`. The compiled distribution is not included in the repo.

### Components Overview

The following diagram shows how the existing components are related. The diagram will be updated as new features are added.

<img src="https://docs.google.com/drawings/d/e/2PACX-1vQjwSLfwUdBAutafIp83B1M-R1T0Zp-y_4_LUZ26UevZaeYQAX2JlWLRUI2IwZ-GY5QI0-gVstUzXD-/pub?w=480&amph=360">

### Services Overview

The following are the current services available for injection.

- DatabaseService
    
    Handles all database related processes. Currently contains methods to read from database and a rudimentary cache implemented with objects.  

- MapService

    Handles map creation, graphics and navigation. Provides methods that interfaces with Mapbox JS and deck.gl APIs. 

- SelectionService 
    
    Keeps track of the current menu selection. Contains methods to access and set selection states. (ie location+feature, location+activity).

- ExploreStateService

    Maintains an observable that keeps track of the current explore state. 

### Other Support Classes

- panoSettings.ts
    
    Contains all the configuration settings for the 2 explore states.

- panoFeatureCollection.ts

    Contains the classes and methods to modify research data. 
