import React from 'react'
import {Link} from 'react-router-dom'
import "./Nav.css"

type Props = {}

export default function Nav(props: Props) {
  return (
    <div>
        <ul className="navUl">
            <Link to="/schools"><li className="navLi">School Search</li></Link>
        </ul>
    </div>
  )
}