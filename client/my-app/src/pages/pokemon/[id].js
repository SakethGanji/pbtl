import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    CardMedia,
    Grid,
    Paper,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import typeColors from '@/utils/typeColors';
import Navbar from '../../components/Navbar';

function PokemonDetail({ pokemon }) {
    const getTypeColor = (typeId) => {
        return typeColors[typeId] || '#ddd';
    };

    const handleImageError = (event) => {
        event.target.src = '/pokemon_sprites/pokeball.png';
    };

    if (!pokemon) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar></Navbar>
            <Box>
                <Paper elevation={3} style={{ padding: '20px', margin: '20px', display: 'flex', alignItems: 'center' }}>
                    <CardMedia
                        component="img"
                        image={`/pokemon_sprites/${pokemon.pokemon_name.toLowerCase()}.png`}
                        alt={`Image of ${pokemon.pokemon_name}`}
                        onError={handleImageError}
                        style={{ maxWidth: '400px', maxHeight: '400px', objectFit: 'contain' }}
                    />
                    <CardContent style={{ flexGrow: 1 }}>
                        <Typography variant="h4" component="div" style={{ textTransform: 'capitalize' }}>
                            {pokemon.pokemon_name}
                        </Typography>
                        <Box display="flex">
                            <Paper
                                style={{
                                    backgroundColor: getTypeColor(pokemon.type1_id),
                                    padding: '4px 8px',
                                    marginRight: '8px',
                                    borderRadius: '4px',
                                }}
                            >
                                <Typography variant="body2" style={{ color: 'white', fontWeight: 'bold' }}>
                                    Type 1: {pokemon.type1_name}
                                </Typography>
                            </Paper>
                            {pokemon.type2_id && (
                                <Paper
                                    style={{
                                        backgroundColor: getTypeColor(pokemon.type2_id),
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                    }}
                                >
                                    <Typography variant="body2" style={{ color: 'white', fontWeight: 'bold' }}>
                                        Type 2: {pokemon.type2_name}
                                    </Typography>
                                </Paper>
                            )}
                        </Box>
                    </CardContent>
                </Paper>

                <Grid container spacing={2} style={{ padding: '20px' }}>
                    {pokemon.moves.map((move, index) => (
                        <Grid item xs={12} key={index}>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ backgroundColor: getTypeColor(move.type_id) }}>
                                    <Typography>{move.move_name}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant="body2">Power: {move.power}</Typography>
                                    <Typography variant="body2">Accuracy: {move.accuracy}</Typography>
                                    <Typography variant="body2">Move Type: {move.move_type}</Typography>
                                    <Typography variant="body2">Description: {move.move_description}</Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
}

export async function getServerSideProps(context) {
    const { params } = context;
    const { id } = params;

    try {
        const res = await fetch(`http://localhost:8080/pokemon/${id}`);
        if (!res.ok) {
            throw new Error('Failed to fetch Pokemon');
        }
        const data = await res.json();

        return {
            props: {
                pokemon: data.pokemon,
            },
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            props: {
                error: error.message,
            },
        };
    }
}

export default PokemonDetail;