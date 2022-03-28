import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router'
import "./detailedSchoolcss.css"

//Cleaned Data
import localeData from "./Data/localeData";
import degreeData from './Data/degreeData';
import carnegieData from './Data/carnegieData';

//Typescript Interfaces
import { SchoolData } from '../SchoolsOverview/Schools'

export default function DetailedSchool() {
  
  const [specificSchoolData, setSpecificSchoolData] = useState<SchoolData|undefined|any>(undefined)
  const [programs, setPrograms] = useState<string[]>([]);

  const params = useParams<string>()
  const name:string|undefined = params.name;

    //Mock GET Request to a simulated backend
    //NOTE: The logic for providing the specific programs per a selected school would be best done
    //On the backend that is then sent to the frontend.
    //Since there is only a frontend, this logic is done here..
    useEffect(() => {
        fetch("../Data/ma_schools.json", {
            headers: {
                'Content-Type': 'application/jsodn',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
          let i:number = 0;
          for(i=0;i<data.length;i++)
          {
            if(data[i].INSTNM === name)
            {
              let entry:SchoolData = data[i]
              setSpecificSchoolData(data[i])
              fetch("../Data/programs.json", {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
              .then(response => response.json())
              .then(data => {
                  let programsToAdd:string[] = [];
                  let i:number = 0;
                  for(i=0;i<entry.PROGRAMS.length;i++)
                  {
                    if(data.hasOwnProperty(entry.PROGRAMS[i]))
                    {
                      programsToAdd.push(data[entry.PROGRAMS[i]])
                    }
                  }
                  setPrograms(programsToAdd)
              })
              .catch(() => {
                alert("Sorry there was an error retrieving the data!")
              })
                break; //Only need to run this loop until we have found the specific entry
            }
          }
        })
        .catch(() => {
          alert("Sorry there was an error retrieving the data!")
        })
       
      },[name])

      const generatePrograms = ():JSX.Element[]|JSX.Element => {
        if(programs.length > 0)
        {
          return programs.map((item:string,index:number):JSX.Element => {
                return (
                <div className="programDiv" key={index}>
                  <h5>{item}</h5> 
                </div>
            )     
          }) 
        }
        else
        {
          return (
            <h5>No Data Available</h5>
          )
        }
      }

  return (
    <div>
      {specificSchoolData !== undefined ?
      <div className="specificViewContainer">
        <h5 className="schoolHeader">{specificSchoolData.INSTNM}</h5>
        <h5><strong>City</strong>: {specificSchoolData.CITY}</h5>
        <h5><strong>State</strong>: {specificSchoolData.STABBR}</h5>
        <h5><strong>Institution Location:</strong> {specificSchoolData.LOCALE !== "NULL" ? localeData[specificSchoolData.LOCALE] : "No Data Available" }</h5>
        <h5><strong>Website:</strong> {specificSchoolData.INSTURL}</h5>
        <h5><strong>Highest Degree Awarded:</strong> {specificSchoolData.HIGHDEG !== "NULL" ? degreeData[specificSchoolData.HIGHDEG] : "No Data Available" }</h5>
        <h5><strong>Carnegie Classification:</strong> {specificSchoolData.CCSIZSET !== "NULL" ? carnegieData[specificSchoolData.CCSIZSET] : "No Data Available" }</h5>
        <h5><strong>Average SAT Score:</strong> {specificSchoolData.SAT_AVG !== "NULL" ? parseFloat(specificSchoolData.SAT_AVG).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "No Data Available" }</h5>
        <h5><strong>Average Admission Rate:</strong> {specificSchoolData.ADM_RATE !== "NULL" ? `${(parseFloat(specificSchoolData.ADM_RATE)*100).toFixed(1)}%` : "No Data Available" }</h5>
        <h5><strong>Programs:</strong></h5>
        <div>
          {generatePrograms()}
        </div>
      </div>
      : null}
  </div>
  )
}