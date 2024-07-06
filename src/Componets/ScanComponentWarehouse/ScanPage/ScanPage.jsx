import React from 'react'
import './ScanPage.css'
import Sidebar from '../../Sidebar/Sidebar'
import Header from '../../Header/Header'
import ScanTable from '../ScanTable/ScanTable'

const ScanPage = () => {
  return (
    <div className='ScanPage'>
      <Sidebar/>
      <Header/> 
      <ScanTable/>
    </div>
  )
}

export default ScanPage
