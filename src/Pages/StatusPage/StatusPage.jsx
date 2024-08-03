import React, { useState } from 'react'
import Sidebar from '../../Componets/Sidebar/Sidebar'
import Header from '../../Componets/Header/Header'
import StatusSection from '../../Componets/StatusSection/StatusSection'

const StatusPage = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [designListData, setDesignListData] = useState([]);
    const [sidebarExpanded, setSidebarExpanded] = useState(true);
  

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
      />
    </div>
  )
}

export default StatusPage
