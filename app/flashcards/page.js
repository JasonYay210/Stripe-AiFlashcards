"use client";

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/clerk-react'
import { doc, collection, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { Container, Grid, Card, CardActionArea, CardContent, Typography, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()
  
    useEffect(() => {
        async function getFlashcards() {
          if (!user) return
          const docRef = doc(collection(db, 'users'), user.id)
          const docSnap = await getDoc(docRef)
          if (docSnap.exists()) {
            const collections = docSnap.data().flashcards || []
            setFlashcards(collections)
          } else {
            await setDoc(docRef, { flashcards: [] })
          }
        }
        getFlashcards()
      }, [user])
    
    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
    }
    
    const handleDeleteCard = async (index) => {
        const updatedFlashcards = flashcards.filter((_, i) => i !== index)
        setFlashcards(updatedFlashcards)
        
        if (user) {
            const docRef = doc(collection(db, 'users'), user.id)
            await updateDoc(docRef, { flashcards: updatedFlashcards })
        }
    }
    
    return (
        <Container maxWidth="md">
            <Grid container spacing={3} sx={{ mt: 4}}>
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardActionArea onClick={() => handleCardClick(flashcard.name)}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {flashcard.name}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <IconButton
                                aria-label="delete"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteCard(index);
                                }}
                                sx={{ position: 'absolute', top: 5, right: 5 }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}
