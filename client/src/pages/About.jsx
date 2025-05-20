import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const team = [
  {
    name: 'Parthik Mangal',
    role: 'Web Developer',
    img: logo,
    desc: 'Passionate about building impactful reporting systems and modern web apps.'
  },
  // Add more team members as needed
];

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.2, duration: 0.8 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } }
};

export default function About() {
  return (
    <Box sx={{ minHeight: '80vh', py: 6, background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)' }}>
      <motion.div initial="hidden" animate="visible" variants={containerVariants}>
        <Typography variant="h3" align="center" gutterBottom component={motion.div} variants={itemVariants}>
          About This Project
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" mb={4} component={motion.div} variants={itemVariants}>
          This Reporting System is designed to help users quickly report and track incidents, emergencies, and issues in real-time. Our mission is to empower communities with technology for a safer, more responsive environment.
        </Typography>
        <Typography variant="h4" align="center" mt={6} mb={2} component={motion.div} variants={itemVariants}>
          Meet the Developers
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {team.map((member, idx) => (
            <Grid item xs={12} sm={6} md={4} key={member.name}>
              <motion.div variants={itemVariants}>
                <Card sx={{ maxWidth: 345, mx: 'auto', boxShadow: 6, borderRadius: 3 }}>
                  <CardContent>
                    <Avatar src={member.img} alt={member.name} sx={{ width: 80, height: 80, mx: 'auto', mb: 2 }} />
                    <Typography variant="h6" align="center">{member.name}</Typography>
                    <Typography variant="subtitle1" align="center" color="text.secondary">{member.role}</Typography>
                    <Typography variant="body2" align="center" mt={1}>{member.desc}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </Box>
  );
} 