import React from 'react'
import loading from './Spinner.gif'

export default function Spinner() {
  return (
    <div>
      <div className="text-center mt-5">
        <img src={loading} alt="loading" />
      </div>
    </div>
  )
}

