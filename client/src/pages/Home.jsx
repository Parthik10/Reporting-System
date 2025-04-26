import React from 'react'
import Map from '../components/Map'
import EmergencyButton from '../components/EmergencyButtom'
import ContextProvider from '../context/ContextProvider'

function Home() {
  return (
    <ContextProvider>
        <Map/>   
        <EmergencyButton/>
    </ContextProvider>
  )
}

export default Home
