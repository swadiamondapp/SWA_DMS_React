import React,{useState} from 'react'
import './ScanPage.css'
import Sidebar from '../../Sidebar/Sidebar'
import Header from '../../Header/Header'
import ScanTable from '../ScanTable/ScanTable'

const ScanPage = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  return (
    <div className='ScanPage'>
      <Sidebar sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded} />
      <Header sidebarExpanded={sidebarExpanded}/> 
      <ScanTable sidebarExpanded={sidebarExpanded}/>
    </div>
  )
}

export default ScanPage
