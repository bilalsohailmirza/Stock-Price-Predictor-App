'use client'

import { useState } from 'react'
import Header from '../ui/dashboard/Header'
import Charts from './(Charts)/page'
import History from './History/page'
const Dashboard = () => {

  const [isChartsSection, setIsChartsSection] = useState(true)
  const [isHistorySection, setIsHistorySection] = useState(false)
  const [isEmptySection, setIsEmptySection] = useState(false)


  return (
    <>

      <Header 
        setChartsState={setIsChartsSection}
        setHistoryState={setIsHistorySection}
      />

      {isChartsSection ? <Charts/> : <></>} 
      {isHistorySection ? <History/> : <></>}

    </>

  )
}

export default Dashboard