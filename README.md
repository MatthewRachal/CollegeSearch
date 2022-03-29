# College Search Application

## Read This First!

You can view a demo of the application here:

https://admirable-kulfi-967026.netlify.app

This is my college search application that I created with the available time that I had. The application is purley a frontend application though a backend could have been added if I had more time.

### How to Use

You can view the schools from the provided dataset in the application via the table. Click the up and down arrows to sort based on various categories. Select a row in the table to navigate to a detailed view for the selected school. 

### Fetch Requests and a Note about the Code therin

I created fetch requests to simulate requesting data from a backend. Since this is only a frontend application, the requests are instead made to the files provided for the excerise. Following these requests, there are a few calculations that are performed after the data is fetched which is subsequently placed in state. 

In an ideal world, these calculations would be performed on the backend. Namely, seen in the files Schools.tsx and DetailedSchool.tsx. For example in DetailedSchool.tsx, a calculation is performed to get the program data for a specific school. This could be done way easier by a backend which then would send that finalized data to the frontend. Because this is purely a frontend application, this is not the case and as a result calculations are performed after the data is fetched which results in code that is slightly less than ideal.

Regardless, I thought I should point this out!

### Geolocation

The geolocation is calculated from the haversine formula. To filter by location closest to you, you need to agree to allow access to your location and select the geolocation button. Aftewards, select filter by location to filter the results.

Note the calculation is an approximation. This is due to the earth's radius varying from 6356.752 km to 6378.137 km at the poles. As a result, depending on the number others use, values could be slightly different. After some checks however, my calculations seemed pretty close to results provided from NOAA's latitude / longitude calculator.

## Installation

Clone the repository and navigate to the folder and run npm install to install package dependencies. You can then run the app with npm start

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
