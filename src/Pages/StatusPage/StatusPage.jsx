import React, { useState } from 'react'
import Sidebar from '../../Componets/Sidebar/Sidebar'
import Header from '../../Componets/Header/Header'
import StatusSection from '../../Componets/StatusSection/StatusSection'
import { useLocation } from 'react-router-dom'

const StatusPage = () => {

  const location = useLocation()
  const { code } = location.state || {};

    const [isLoading, setIsLoading] = useState(false);
    const [designListData, setDesignListData] = useState([]);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
    
    console.log(code,"DesignCode")

  return (
    <div className='Parent_AssignmentPage'>
      <Sidebar
       sidebarExpanded={sidebarExpanded}
       setSidebarExpanded={setSidebarExpanded}
      />
      <Header
       sidebarExpanded={sidebarExpanded}
       setSidebarExpanded={setSidebarExpanded}
      />
      <StatusSection
       sidebarExpanded={sidebarExpanded}
       setSidebarExpanded={setSidebarExpanded}
       code={code}
      />
    </div>
  )
}

export default StatusPage
