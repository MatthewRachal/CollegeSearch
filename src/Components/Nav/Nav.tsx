import React from 'react'
import {Link} from 'react-router-dom'
import "./Nav.css"

export default function Nav() {
  return (
    <div>
        <ul className="navUl">
            <Link to="/schools"><li className="navLi">School Search</li></Link>
        </ul>
    </div>
  )
}