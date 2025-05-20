import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 3, bgcolor: '#31572c', color: 'white' }}>
      <Container maxWidth="lg">
        <motion.div initial="hidden" animate="visible" variants={footerVariants}>
          <Typography variant="body1" align="center">
            Developed with ❤️ by <strong>Parthik Mangal</strong>
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            © {new Date().getFullYear()} Reporting System. All rights reserved.
          </Typography>
        </motion.div>
      </Container>
    </Box>
  );
} 