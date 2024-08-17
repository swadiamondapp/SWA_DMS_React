import React, { useState } from 'react'
import "./ScanModule.css"
import Sidebar from '../../Componets/Sidebar/Sidebar'
import Header from '../../Componets/Header/Header'
import ScanWarehouse from '../../Componets/ScanWarehouse/ScanWarehouse'

const ScanModule = () => {

    const [sidebarExpanded, setSidebarExpanded] = useState(true);


  return (
    <div className='Parent_RendersCard'>
      <Sidebar  sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded}/>
      <Header sidebarExpanded={sidebarExpanded}/>
      <ScanWarehouse   sidebarExpanded={sidebarExpanded}/>
    </div>
  )
}

export default ScanModule
