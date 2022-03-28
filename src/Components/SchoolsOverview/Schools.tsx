import React, {useState, useEffect} from 'react'
import "./schoolOverview.css"

//Components
import SchoolTable from "./SchoolTable"

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
}

export default function Schools():JSX.Element {
    
    const [schoolData, setSchoolData] = useState<SchoolData[]>([]);

    //Mock GET Request to a simulated backend
    useEffect(() => {
        fetch("./Data/ma_schools.json", {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => setSchoolData(data))
        .catch(() => {
            alert("Error Retrieving Data")
        })
    },[])    

    const updateFilter = (filter:string,category:string,type:string) => {
        
        let filteredSchoolData: SchoolData[] = [...schoolData];

        if(filter === "sortNum")
        {
            filteredSchoolData = sortByNumber(filteredSchoolData,category,type);
        }
        else if(filter === "sortText")
        {
            filteredSchoolData = sortByText(filteredSchoolData,category,type);
        }    

        setSchoolData(filteredSchoolData)
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
        <SchoolTable schoolData={schoolData} updateFilter={updateFilter} />
    </div>
  )
}