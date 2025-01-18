import React from 'react'
import Layout from '../components/Weater/components/layout/Layout'
import AppProvider from '../components/Weater/context/AppContext'
import Container from '@mui/material/Container';

function Weater() {
  return (
    <div>
      <Container maxWidth="lg">

      <AppProvider>
      <Layout/>

      </AppProvider>
      </Container>
    </div>
  )
}

export default Weater
