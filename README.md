# ArcGIS Experience Builder Developer Edition v1.13

This repository provides widgets and apps that is developed with ArcGIS Experience Builder SDK based on ArcGIS Experience Builder v1.13. Learn more about [ArcGIS Experience Builder SDK](https://developers.arcgis.com/experience-builder/guide/core-concepts/). ArcGIS Experience Builder v1.13 has dependency on:

- ArcGIS Experience Builder v1.13
- JSAPI version 4.28
- Recomended Node.js version 16
- React.js version 18

## Instructions to run this repository

Step 1: Downlaod and install Node js 16

Step 2: Download the developer edition of [Experience Builder v1.13](https://developers.arcgis.com/experience-builder/guide/downloads/) and extract it in local drive

Step 3: Clone the repo into `ArcGISExperienceBuilder/client` and `ArcGISExperienceBuilder/server` folder 

Step 4: Go to the `client` folder and install npm (clean install) `npm ci`
 
```
cd client
npm ci
```

Step 5: Go to the `server` folder and install npm (clean install) `npm ci`
 
```
cd server
npm ci
```

Step 7: Run both `server` and `client` from command prompt `npm start`
```
cd client
npm start
```
```
cd server
npm start
```

## Instructions to get customized view in browser (google chrome)

Step 1: Open `Run` or press `Windows + R` from keyboard and run the following command (if cors enable is a requirement)
 
```
chrome.exe --user-data-dir="C://Chrome dev session" --disable-web-security
```
Step 2: Browse the url [`https://localhost:3001/`](https://localhost:3001/) and `login`

```
https://localhost:3001/
```

## Resources

To extend this widgets here are some valuable resources:

- [ArcGIS Experience Builder](https://developers.arcgis.com/experience-builder/)
- [API Reference](https://developers.arcgis.com/experience-builder/api-reference/)
- [Sample Code](https://developers.arcgis.com/experience-builder/sample-code/)
- [Storybook](https://developers.arcgis.com/experience-builder/storybook/?path=/docs/welcome--docs)
- [ArcGIS Experience Builder SDK](https://github.com/esri/arcgis-experience-builder-sdk-resources)
- [ArcGIS Experience Builder install](https://developers.arcgis.com/experience-builder/guide/install-guide/)
