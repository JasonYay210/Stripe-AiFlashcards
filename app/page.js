'use client'

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';  
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { motion } from 'framer-motion';

export default function Home() {
  // Add user state or context here
  const user = null; // Replace with actual user state or context

  const handleSubmit = async () => {
    const checkoutSession = await fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: { origin: 'http://localhost:3000' },
    })
    const checkoutSessionJson = await checkoutSession.json()
  
    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    })
  
    if (error) {
      console.warn(error.message)
    }
  }
  return (
    <AppBar position="static" sx={{ backgroundColor: '#98c1d9' }}>
  <Toolbar sx={{ backgroundColor: '#00796b' }}>
    <Typography variant="h6" style={{flexGrow: 1}} >
      AI-FlashCards
    </Typography>
    <SignedOut>
      <Button color="inherit" href="/sign-in">Login</Button>
      <Button color="inherit" href="/sign-up">Sign Up</Button>
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
  </Toolbar>
  <Box sx={{textAlign: 'center', my: 4, color: '#293241'}}>
  <Typography variant="h2" component="h1" gutterBottom>
    Welcome to AI-FlashCards
  </Typography>
  <Typography variant="h5" component="h2" gutterBottom>
    Create AI generated flashcards from your text!
  </Typography>
  <Button 
    variant="contained" 
    sx={{ 
      mt: 2, 
      mr: 2, 
      backgroundColor: '#00796b', 
      '&:hover': { backgroundColor: '#00796b' } // Prevent hover color change
    }} 
    href={user ? "/generate" : "/sign-in"}
  >
    Get Started
  </Button>
</Box>
  <Box sx={{my: 6, textAlign: 'center'}} style={{padding: 15}}>
    <Typography sx={{
      background: '#00796b',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      variant: "h4",
      component: "h2",
      fontSize: '2rem', // Increased font size
    }}> Features</Typography>
    <Box sx={{ mb: 4 }} />
    <Grid container spacing={4}>
      {['Smart & Brief Flashcards', 'Simple to use and learn.', 'Personalized Flashcards'].map((title, index) => (
        <Grid item xs={12} md={4} key={index}>
          <motion.div style={{
            boxShadow: '0 0 10px rgba(0, 121, 107, 1)', // Changed to teal color used for text

          }}>
            <Box sx={{
              p: 3,
              border: '1px solid',
              borderColor: 'grey.300',
              borderRadius: 2,
              minHeight: 150,
            }}>
              <Typography variant="h6" gutterBottom sx={{
                background: '#00796b',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>{title}</Typography>
              <Typography gutterBottom sx={{ color: '#293241' }}>
                {index === 0 ? 'Our AI wisely breaks down your text into concise flashcards, designed for active recall.' :
                 index === 1 ? 'Focus more on studying with less distractions. RecallAI keeps studying to-the-point.' :
                 'Let RecallAI create flashcards for you based on the content you provide.'}
              </Typography>
            </Box>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  </Box>
<Box sx={{my: 6, textAlign: 'center'}} style={{padding: 15}}>
  <Typography variant="h4" gutterBottom sx={{
    background: '#00796b',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  }}> Pricing </Typography>
  <Grid container spacing={4}>
    <Grid item xs={12} md={6}>
      <motion.div 
        whileHover={{
          scale: 0.9,
          boxShadow: '0 0 10px rgba(0, 121, 107, 1)', 
          borderRadius: 12,
          transition: 'box-shadow 0.3s ease-in-out',
        }}
      >
        <Box sx={{
          p: 3,
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: 2,
        }}>
          <Typography variant="h6" gutterBottom sx={{
            background: '#00796b', // Teal 600
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}> Basic </Typography>
          <Typography sx={{ color: '#293241' }} variant="h6" gutterBottom> Free </Typography>
          <Typography sx={{ color: '#293241' }} gutterBottom> 
            Access to basic features and limited storage.
          </Typography>
          <Button 
          variant="contained" 
          sx={{ 
            mt: 2, 
            mr: 2, 
            backgroundColor: '#00796b', 
            '&:hover': { backgroundColor: '#00796b' } // Prevent hover color change
          }} href={user ? "/generate" : "/sign-in"}> Start Now</Button>
        </Box>
      </motion.div>
    </Grid>
    <Grid item xs={12} md={6}>
      <motion.div 
        whileHover={{
          scale: 0.9,
          boxShadow: '0 0 10px rgba(0, 121, 107, 1)', // Changed to teal color used for text
          borderRadius: 12,
          transition: 'box-shadow 0.3s ease-in-out',
        }}
      >
        <Box sx={{
          p: 3,
          border: '1px solid',
          borderColor: 'grey.300',
          borderRadius: 2,
          mb: 2,
        }}>
          <Typography variant="h6" gutterBottom  sx={{
            background: '#00796b', // Teal 600
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}> Pro </Typography>
          <Typography sx={{ color: '#293241' }} variant="h6" gutterBottom> $5 / Month </Typography>
          <Typography sx={{ color: '#293241' }} gutterBottom> 
            Unlimited flashcards and storage, with priority support.
          </Typography>
          <Button
            variant="contained" 
            sx={{ 
              mt: 2, 
              mr: 2, 
              backgroundColor: '#00796b', 
              '&:hover': { backgroundColor: '#00796b' } // Prevent hover color change
            }}
            onClick={handleSubmit}
          > Choose Pro
          </Button>
        </Box>
      </motion.div>
    </Grid>
  </Grid>
</Box>
</AppBar>
  );
}