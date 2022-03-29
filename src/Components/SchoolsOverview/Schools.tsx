import React, {useState, useEffect} from 'react'
import "./schoolOverview.css"

//Components
import SchoolTable from "./SchoolTable"
import GeoLocation from './GeoLocation';

export interface SchoolData {
    ADM_RATE: string;
    CCSIZSET: string;
    CITY: string;
    HIGHDEG: string;
    INSTNM: string;
    INSTURL: string;
    LATITUDE: string;
    LOCALE: string;
    LONGITUDE: string;
    PROGRAMS: string[];
    SAT_AVG: string;
    STABBR: string;
    ZIP: string;
    distance?: number[]; //Geolocation distance
    distanceFromLocation?: number;
}

export default function Schools():JSX.Element {
    
    const [schoolData, setSchoolData] = useState<SchoolData[]>([]);
    const [geoLocation, setGeoLocation] = useState<number[]>([]);

    const [geoLocationAgreement, setGeoLocationAgreement] = useState<boolean>(true);

    const getGeoLocation = ():void => {
        navigator.geolocation.getCurrentPosition((position):void =>  {
           setGeoLocation([position.coords.latitude, position.coords.longitude])    
        })   
    }

    const calculateLocationDifferences = (location2:number[]):number => {

        let location1:number[] = [...geoLocation];

        //Calculated from the Haversine Formula
        const toRad = (x:number):number => {
            return x * Math.PI / 180;
          }
           
        let longitude1:number = location1[1];
        let latitude1:number = location1[0];

        let longitude2:number = location2[1];
        let latitude2:number = location2[0];

        //This is an approximation representing the midpoint between the max and min of Earths radius since it is constantly changing.
        // the Earths radius varies from 6356.752 km at the poles to 6378.137 km at the equator
        let radius:number = 6378.137; 
      
        let x1:number = latitude2-latitude1;
        let degreeLatitude:number = toRad(x1);  
        let x2:number = longitude2-longitude1;
        let degreeLongitude:number = toRad(x2);  

        let a:number = Math.sin(degreeLatitude/2) * Math.sin(degreeLatitude/2) + 
                        Math.cos(toRad(latitude1)) * Math.cos(toRad(latitude2)) * 
                        Math.sin(degreeLongitude/2) * Math.sin(degreeLongitude/2);  

        let centralAngle:number = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        let distance:number = radius * centralAngle; 

        return distance;
    }


    //Mock GET Request to a simulated backend
    useEffect(() => {
        fetch("./Data/ma_schools.json", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            let i:number = 0;
            for(i=0;i<data.length;i++)
            {

                data[i].distance = [parseFloat(data[i].LATITUDE),parseFloat(data[i].LONGITUDE)]
                data[i].distanceFromLocation = 0;
            }
            setSchoolData(data)
        })
        .catch(() => {
            alert("Error Retrieving Data")
        })
    },[])    

    const updateFilter = (filter:string,category:string,type:string) => {

        let filteredSchoolData:any = [...schoolData];

        if(filter === "sortNum")
        {
            filteredSchoolData = sortByNumber(filteredSchoolData,category,type);
        }
        else if(filter === "sortText")
        {
            filteredSchoolData = sortByText(filteredSchoolData,category,type);
        }
        else if(filter === "Location")
        {
            let i:number = 0;
            for(i=0;i<filteredSchoolData.length;i++)
            {
                filteredSchoolData[i].distanceFromLocation = calculateLocationDifferences(filteredSchoolData[i].distance)
            }
            sortByLocation(filteredSchoolData,category)
        }    

        setSchoolData(filteredSchoolData)
    }

    const sortByLocation = (filteredSchoolData:any,category:string) => {
        filteredSchoolData.sort((a:any,b:any):number => {
           
            if (a === b) {
                return 0;
            }
            else if (isNaN(a[category]) === true) {
                return 1;
            }
            else if (isNaN(a[category]) === true) {

                return -1;
            }
            else 
            {
                return b[category] > a[category] ? -1 : 1; 
            }
        })
        return filteredSchoolData;
    }


    //Sorts the school Data for numeric values (high to low, low to high)
    const sortByNumber = (filteredSchoolData:SchoolData[],category:string,type:string):any => {
            filteredSchoolData.sort((a:any,b:any):number => {
            if (a === b) {
                return 0;
            }
            else if (a[category] === 'NULL') {
                return 1;
            }
            else if (b[category] === 'NULL') {

                return -1;
            }
            else if(type === "Ascending")
            {
                return parseFloat(b[category]) < parseFloat(a[category]) ? -1 : 1; 
            }
            else
            {
                return parseFloat(b[category]) > parseFloat(a[category]) ? -1 : 1; 
            }
        })
        return filteredSchoolData;
    }


    //Sorts the school data by text (A-Z, Z-A)
    const sortByText = (filteredSchoolData:SchoolData[],category:string,type:string):any => {
        filteredSchoolData.sort((a:any,b:any):number => {
            if (a === b) {
                return 0;
            }
            else if (a[category] === 'NULL') {
                return 1;
            }
            else if (b[category] === 'NULL') {

                return -1;
            }
            else if(type === "Ascending")
            {
                return b[category] < a[category] ? -1 : 1; 
            }
            else
            {
                return b[category] > a[category] ? -1 : 1; 
            };
        })
        return filteredSchoolData;
    }

return (
    <div className="schoolDiv">
        <div className="schoolsTopDiv">
            <h2>School Search:</h2>
            <p>Select the arrows below to sort the school info</p>
            <p>You can also click on a row in the table to navigate to a detailed view</p>
        </div>
        <div>
            <GeoLocation 
                geoLocationAgreement={geoLocationAgreement} 
                setGeoLocationAgreement={setGeoLocationAgreement} 
                updateFilter={updateFilter}
                getGeoLocation={getGeoLocation}
                geoLocation={geoLocation}
                />
        </div>
        
        <SchoolTable schoolData={schoolData} updateFilter={updateFilter} />
    </div>
  )
}