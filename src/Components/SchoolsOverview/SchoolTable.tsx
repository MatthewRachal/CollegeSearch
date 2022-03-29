import React from 'react'
import {useNavigate} from 'react-router-dom'

//Types
import { SchoolData } from './Schools'

//Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { faSignature } from '@fortawesome/free-solid-svg-icons'
import { faCity } from '@fortawesome/free-solid-svg-icons'
import { faFlagUsa } from '@fortawesome/free-solid-svg-icons'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faWifi } from '@fortawesome/free-solid-svg-icons'

type Props = {
    schoolData: SchoolData[];
    updateFilter: (filter:string,category:string,type:string) => void;
}

export default function SchoolTable(props: Props):JSX.Element {

    const navigate = useNavigate();
    const changeRoute = (name:string) => {
    navigate(`/schools/${name}`)
    }

    //The table header categories to be displayed
    const categories: string[] = ["INSTNM", "CITY", "STABBR", "ADM_RATE", "SAT_AVG", "INSTURL","distanceFromLocation"]

    const generateTableRows = ():JSX.Element[] => {

        //This function takes the school data and for every school data entry uses the map function to make a a table row element
        //Within that table row element, a map function is again called but on the categories array defined above to create
        //a TD element for each category name whose data is taken from the school data row entry.
        return props.schoolData.map((item:any, index:number):JSX.Element => {
            return (
                <tr onClick={()=>{changeRoute(item.INSTNM)}} className={index % 2 === 1 ? "tableTrColor" : "tableTr"} key={`${item.INSTNM}+${index}`}>
                    {categories.map((category:string,categoryIndex:number):JSX.Element => {
                        return (
                            <td 
                                className="tableTd" 
                                key={`${category}${categoryIndex}`}>
                                    {item[category] === "NULL" ? "" 
                                    : category === "ADM_RATE" ? `${(parseFloat(item[category])*100).toFixed(1)}%` 
                                    : category === "SAT_AVG" ? parseFloat(item[category]).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
                                    : category ===  "distanceFromLocation" && (isNaN(item[category]) === true || item[category] === 0) ? ""
                                    : category === "distanceFromLocation" ? parseFloat(item[category].toFixed(1)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") 
                                    : item[category]}
                            </td>
                        )
                    })
                    }
                </tr>
            )
        })
    }

  return (
    <div className="schoolTableContainer">
        <table className="schoolTable">
            <thead className="schoolTableThead">
                <tr className="tableHeader">
                    <td className="tableHeaderTd">
                        <FontAwesomeIcon style={{margin: "0 5px 0 5px", fontSize: "1.25rem"}} icon={faSignature} />
                        Name 
                        <div>
                            <span className="iconSpan"><FontAwesomeIcon onClick={e=>{e.preventDefault(); props.updateFilter("sortText","INSTNM","Ascending")}} style={{float: "left", fontSize: "1.25rem", marginLeft: "10%"}} icon={faCaretUp} /></span>
                            <span className="iconSpan"><FontAwesomeIcon onClick={e=>{e.preventDefault(); props.updateFilter("sortText","INSTNM","Descending")}} style={{float: "right", fontSize:"1.25rem", marginRight: "10%"}} icon={faCaretDown} /></span>
                        </div>
                    </td>
                    <td className="tableHeaderTd">
                        <FontAwesomeIcon style={{margin: "0 5px 0 5px", fontSize: "1.25rem"}} icon={faCity} />
                        City 
                        <div>
                            <span className="iconSpan"><FontAwesomeIcon onClick={e=>{e.preventDefault(); props.updateFilter("sortText","CITY","Ascending")}} style={{float: "left", fontSize: "1.25rem", marginLeft: "10%"}} icon={faCaretUp} /></span>
                            <span className="iconSpan"><FontAwesomeIcon onClick={e=>{e.preventDefault(); props.updateFilter("sortText","CITY","Descending")}} style={{float: "right", fontSize:"1.25rem", marginRight: "10%"}} icon={faCaretDown} /></span>
                        </div>
                    </td>
                    <td className="tableHeaderTd">
                        <FontAwesomeIcon style={{margin: "0 5px 0 5px", fontSize: "1.25rem"}} icon={faFlagUsa} />
                        State 
                        <div>
                            <span className="iconSpan"><FontAwesomeIcon onClick={e=>{e.preventDefault(); props.updateFilter("sortText","STABBR","Ascending")}} style={{float: "left", fontSize: "1.25rem", marginLeft: "10%"}} icon={faCaretUp} /></span>
                            <span className="iconSpan"><FontAwesomeIcon onClick={e=>{e.preventDefault(); props.updateFilter("sortText","STABBR","Descending")}} style={{float: "right", fontSize:"1.25rem", marginRight: "10%"}} icon={faCaretDown} /></span>
                        </div>
                    </td>
                    <td className="tableHeaderTd">
                        <FontAwesomeIcon style={{margin: "0 5px 0 5px", fontSize: "1.25rem"}} icon={faCheck} />
                        Adm Rate 
                        <div>
                            <span className="iconSpan"><FontAwesomeIcon onClick={e=>{e.preventDefault(); props.updateFilter("sortNum","ADM_RATE","Ascending")}} style={{float: "left", fontSize: "1.25rem", marginLeft: "10%"}} icon={faCaretUp} /></span>
                            <span className="iconSpan"><FontAwesomeIcon onClick={e=>{e.preventDefault(); props.updateFilter("sortNum","ADM_RATE","Descending")}} style={{float: "right", fontSize:"1.25rem", marginRight: "10%"}} icon={faCaretDown} /></span>
                        </div>

                    </td>
                    <td className="tableHeaderTd">
                        <FontAwesomeIcon style={{margin: "0 5px 0 5px", fontSize: "1.25rem"}} icon={faStar} />
                        SAT AVG 
                        <div>
                            <span className="iconSpan"><FontAwesomeIcon onClick={e=>{e.preventDefault(); props.updateFilter("sortNum","SAT_AVG","Ascending")}} style={{float: "left", fontSize: "1.25rem", marginLeft: "10%"}} icon={faCaretUp} /></span>
                            <span className="iconSpan"><FontAwesomeIcon onClick={e=>{e.preventDefault(); props.updateFilter("sortNum","SAT_AVG","Descending")}} style={{float: "right", fontSize:"1.25rem", marginRight: "10%"}} icon={faCaretDown} /></span>
                        </div>
                    </td>
                    <td className="tableHeaderTd">
                    <FontAwesomeIcon style={{margin: "0 5px 0 5px", fontSize: "1.25rem"}} icon={faWifi} />
                        Website 
                        <div>
                            <span className="iconSpan"><FontAwesomeIcon onClick={e=>{e.preventDefault(); props.updateFilter("sortText","INSTURL","Ascending")}} style={{float: "left", fontSize: "1.25rem", marginLeft: "10%"}} icon={faCaretUp} /></span>
                            <span className="iconSpan"><FontAwesomeIcon onClick={e=>{e.preventDefault(); props.updateFilter("sortText","INSTURL","Descending")}} style={{float: "right", fontSize:"1.25rem", marginRight: "10%"}} icon={faCaretDown} /></span>
                        </div>
                    </td>
                    <td className="tableHeaderTd">
                    <FontAwesomeIcon style={{margin: "0 5px 0 5px", fontSize: "1.25rem"}} icon={faWifi} />
                        Distance(km) 
                        <div>
                            <span className="iconSpan"></span>
                            <span className="iconSpan"></span>
                        </div>
                    </td>
                </tr>
            </thead>
            <tbody>
                {generateTableRows()}
            </tbody>
        </table>
    </div>
  )
}