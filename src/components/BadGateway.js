import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from "./Navbar";

export default function BadGateway() {
  return (
    <div className='text-center justify-content'>
      <Navbar/>
        <h2>
            Bad Gateway,  Error 404
        </h2>
        <Link to="/"> Click here to goto back home </Link>
    </div>
  )
}
