import React from 'react'
import Map from '../components/Map'
import ContextProvider from '../context/ContextProvider'

function Home() {
  return (
    <ContextProvider>
        <Map/>   
    </ContextProvider>
  )
}

export default Home
