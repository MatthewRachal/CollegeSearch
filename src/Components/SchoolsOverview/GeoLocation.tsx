import React from 'react'

type Props = {
    geoLocationAgreement: boolean,
    setGeoLocationAgreement: (geoLocationAgreement:boolean) => void,
    updateFilter: (filter:string,category:string,type:string) => void,
    getGeoLocation: () => void,
    geoLocation: number[],
}

export default function GeoLocation(props: Props):JSX.Element {
  return (
    <div>
        <form className="geoLocationForm">
            <div>
                <label>By Selecting this, I agree to allow access to my location / Geolocation for the application to determine distances to the schools listed below.</label>
            </div>
            <div>
                <input onChange={e=>{props.setGeoLocationAgreement(!props.geoLocationAgreement)}}className="geoLocationInput" type="checkbox"/>I Agree
            </div>
            <div>
                <button disabled={props.geoLocationAgreement } onClick={e=>{e.preventDefault(); props.getGeoLocation()}} className="geoLocationButton">Get GeoLocation</button>
                <button disabled={props.geoLocationAgreement===true || props.geoLocation.length <= 0} style={{marginLeft: "10px"}} onClick={e=>{e.preventDefault(); props.updateFilter("Location","distanceFromLocation","")}} className="geoLocationButton">Filter by Location</button>
            </div>
        </form>
    </div>
  )
}