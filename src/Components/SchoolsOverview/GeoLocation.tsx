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
                <label>By selecting this checkbox, I agree to allow access to my location to be used to determine distances to the schools listed below. You can change your preferences in your browsers settings panel.</label>
            </div>
            <div>
                <input onChange={e=>{props.setGeoLocationAgreement(!props.geoLocationAgreement)}} className="geoLocationInput" type="checkbox"/>I Agree
            </div>
            <div className="geoLocationButtonContainer">
                <button disabled={props.geoLocationAgreement } onClick={e=>{e.preventDefault(); props.getGeoLocation()}} className="geoLocationButton">Get Location</button>
                <button disabled={props.geoLocationAgreement===true || props.geoLocation.length <= 0} style={{marginLeft: "10px"}} onClick={e=>{e.preventDefault(); props.updateFilter("Location","distanceFromLocation","")}} className="geoLocationButton">Filter by Location</button>
            </div>
        </form>
    </div>
  )
}