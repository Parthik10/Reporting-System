import React from 'react';
import ContextProvider from '../context/ContextProvider';
import DetailCard from '../components/DetailCard';
import { Grid, Box, Container } from '@mui/material';

function Reports() {


  return (
    <ContextProvider>
      <Container>
        <Box >
          <Grid>
            <Grid>
              <DetailCard />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ContextProvider>
  );
}

export default Reports;
