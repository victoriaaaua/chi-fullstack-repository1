import React, { useState, useEffect, useContext } from 'react';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useParams, useNavigate } from 'react-router-dom';
import { ThemeContext } from './ThemeContext';

const ModalCharacter = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [character, setCharacter] = useState(null);
    const { themeContext } = useContext(ThemeContext);

    useEffect(() => {
        const fetchCharacterById = async () => {
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setCharacter(data);
                }
            } catch(error) {
                console.error('Error:', error.message);
            } 
        };

        if (id) {
            fetchCharacterById();
        }

    }, [id]);

    const handleClose = () => navigate('/heroes');

    return (
        <Drawer anchor="right" open={Boolean(id)} onClose={handleClose}>
            <Box sx={{ width: 350, padding: 2, pt: 10, height:'100vh', backgroundColor: themeContext.palette.hoverColor.main }}>
                { character ? (
                    <>
                        <Typography variant="h6" sx={{
                            color: themeContext.palette.text.primary,
                            fontSize: '1.5rem',
                            textAlign: 'center',
                            mt: 2,
                            mb: 4,
                            fontWeight: 'bold'
                        }}>
                            {character.name}
                        </Typography>
                        <Card>
                            <CardMedia
                                component="img"
                                alt={character.name}
                                image={character.image}
                                sx={{ borderRadius: '12px' }}
                            />
                        </Card>
                        <Typography variant="body1" sx={{
                            color: themeContext.palette.text.primary,
                            fontSize: '20px',
                            textAlign: 'center',
                            mt: 4,
                            mb: 4,
                        }}>
                            {character.status}
                        </Typography>
                        <Box style={{ display: 'flex', justifyContent: 'center'}}>
                            <Button onClick={handleClose} variant="contained" sx={{
                            color: themeContext.palette.text.paragraph, backgroundColor: themeContext.palette.primary.main}}>
                                Close
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Typography variant="body1">Character has not found</Typography>
                )}
            </Box>
        </Drawer>
    );
};

export default ModalCharacter;
