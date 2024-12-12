import React from 'react';
import { Typography, Box, Container, Grid, Paper, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Info as InfoIcon, Group as TeamIcon, ExpandMore as ExpandMoreIcon, Work as WorkIcon } from '@mui/icons-material';

const AboutPage = () => {
  const faqItems = [
    { question: 'How do I register as a user?', answer: 'To register, click on the "Sign Up" button on the homepage, fill in your details, and verify your email using the OTP sent to your registered email address.' },
    { question: 'Can admins manage user bookings?', answer: 'Yes, admins can view, approve, or cancel user bookings directly from the admin dashboard.' },
    { question: 'What are the search options available for users?', answer: 'Users can search for rooms based on dates, keywords, or hotel names, ensuring a customized search experience.' },
    { question: 'Can users cancel their bookings?', answer: 'Yes, users can cancel their bookings before the check-in date through their dashboard.' },
    { question: 'Is email verification mandatory?', answer: 'Yes, email verification is required to ensure a secure and authenticated registration process.' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" gutterBottom sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
          About Us
        </Typography>
        <Typography variant="h5" sx={{ color: '#34495e', maxWidth: '800px', margin: 'auto' }} paragraph>
          Our platform connects users with the best hotel room options and empowers admins to manage bookings and room availability efficiently.
        </Typography>
      </Box>

      <Grid container spacing={6} sx={{ mb: 8 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, height: '100%', backgroundColor: '#ecf0f1', borderRadius: 4, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <InfoIcon sx={{ fontSize: 40, color: '#3498db', mr: 2 }} />
              <Typography variant="h4" component="div" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                Our Mission
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: '#34495e', mb: 3 }} paragraph>
              We aim to provide a seamless hotel booking experience for users and a powerful management tool for hotel admins to streamline their operations.
            </Typography>
            <Button
              variant="contained"
              sx={{ backgroundColor: '#3498db', color: 'white', borderRadius: 50, px: 4, py: 1.5, '&:hover': { backgroundColor: '#2980b9' } }}
              startIcon={<WorkIcon />}
              href="/search-rooms"
            >
              Explore Rooms
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, height: '100%', backgroundColor: '#ecf0f1', borderRadius: 4, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <TeamIcon sx={{ fontSize: 40, color: '#e74c3c', mr: 2 }} />
              <Typography variant="h4" component="div" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>
                Our Team
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ color: '#34495e', mb: 3 }} paragraph>
              Our team of developers, designers, and strategists is dedicated to enhancing user experience and providing cutting-edge booking solutions.
            </Typography>
            <Button
              variant="outlined"
              sx={{ borderColor: '#e74c3c', color: '#e74c3c', borderRadius: 50, px: 4, py: 1.5, '&:hover': { backgroundColor: 'rgba(231, 76, 60, 0.1)' } }}
              startIcon={<TeamIcon />}
              href="/contact"
            >
              Contact Us
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mb: 8 }}>
        <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50', mb: 4 }}>
          Frequently Asked Questions
        </Typography>
        {faqItems.map((item, index) => (
          <Accordion key={index} sx={{ mb: 2, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', '&:before': { display: 'none' } }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#3498db' }} />}
              aria-controls={`panel${index}a-content`}
              id={`panel${index}a-header`}
              sx={{ backgroundColor: '#ecf0f1', borderRadius: 2 }}
            >
              <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 'bold' }}>{item.question}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: '#f8f9fa' }}>
              <Typography sx={{ color: '#34495e' }}>{item.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default AboutPage;