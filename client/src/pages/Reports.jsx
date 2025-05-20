import React from 'react';
import ContextProvider from '../context/ContextProvider';
import DetailCard from '../components/DetailCard';
import { Grid, Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, delay: 0.2 } }
};

function Reports() {
  return (
    <ContextProvider>
      <Box sx={{ minHeight: '80vh', background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)', py: 6 }}>
        <Container>
          <motion.div initial="hidden" animate="visible" variants={titleVariants}>
            <Typography variant="h3" align="center" fontWeight={700} gutterBottom sx={{ color: '#234e52', mb: 4 }}>
              Community Reports
            </Typography>
          </motion.div>
          <Box>
            <Grid container justifyContent="center">
              <Grid item xs={12} md={10}>
                <motion.div initial="hidden" animate="visible" variants={cardVariants}>
                  <DetailCard />
                </motion.div>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </ContextProvider>
  );
}

export default Reports;
