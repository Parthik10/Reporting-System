import React from 'react'
import Map from '../components/Map'
import EmergencyButton from '../components/EmergencyButtom'
import ContextProvider from '../context/ContextProvider'
import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import logo from '../assets/Website_logo.png';

const heroVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const contentVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.6 } }
};

function Home() {
  return (
    <ContextProvider>
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8ffae 0%, #43c6ac 100%)', pb: 4 }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }}>
          <Map />
          <Box display="flex" justifyContent="center">
            <EmergencyButton />
          </Box>
        </motion.div>
        <Container maxWidth="md" sx={{ pt: 8, pb: 4 }}>
          <motion.div initial="hidden" animate="visible" variants={heroVariants}>
            <Box display="flex" flexDirection="column" alignItems="center" mb={4}>
              <Typography variant="h2" align="center" fontWeight={700} gutterBottom sx={{ color: '#234e52', textShadow: '0 2px 8px #fff8' }}>
                Welcome to the Reporting System
              </Typography>
              <Typography variant="h6" align="center" color="text.secondary" mb={2}>
                Empowering communities to report emergencies and incidents in real-time. Stay safe, stay connected.
              </Typography>
              <Button variant="contained" color="success" size="large" href="/add-report" sx={{ mt: 2, borderRadius: 8, fontWeight: 600, boxShadow: 3 }}>
                Report Now
              </Button>
            </Box>
          </motion.div>
        </Container>
        <Container maxWidth="md" sx={{ mt: 6 }}>
          <motion.div initial="hidden" animate="visible" variants={contentVariants}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h4" align="center" fontWeight={600} gutterBottom sx={{ color: '#234e52' }}>
                Why Choose Us?
              </Typography>
              <Typography variant="body1" align="center" color="text.secondary" mb={3}>
                Our platform provides real-time reporting, instant notifications, and a user-friendly interface to ensure your community stays safe and informed.
              </Typography>
              <Button variant="outlined" color="primary" size="large" href="/about" sx={{ mt: 2, borderRadius: 8, fontWeight: 600 }}>
                Learn More
              </Button>
            </Box>
          </motion.div>
        </Container>
      </Box>
    </ContextProvider>
  )
}

export default Home
