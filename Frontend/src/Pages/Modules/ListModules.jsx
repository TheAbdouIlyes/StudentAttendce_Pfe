import React, { useState } from 'react'
import "./ListModules.css"
import ModelTable from '../Comps/ModuleTable'
import EditButtons from '../Comps/EditButtons'
import { Button, Menu, MenuItem } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Modulestest from './ModulesTest2'



export default function ListModels() {


  return (
    <div className='Modules_container'>

      <button>1</button><Modulestest SpecialityAndYear={"Info-L2"}/>
      <button>2</button> <Modulestest SpecialityAndYear={"Info-L3"}/>
      
     
    </div>
  )
}