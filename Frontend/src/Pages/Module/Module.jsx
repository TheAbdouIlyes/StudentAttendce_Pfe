import React from 'react'
import "./Module.css"

export default function Module({ModuleName}) {
  return (
    <div className='ModuleCard'>
        <h3>{ModuleName}</h3>
    </div>
  )
}
