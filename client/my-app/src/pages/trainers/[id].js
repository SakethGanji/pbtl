import React from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Container, Typography, Box, Card, CardContent, CardMedia, Grid, Paper } from '@mui/material';
import typeColors from '@/utils/typeColors';
import Navbar from "@/components/Navbar";

function TrainerDetailsPage() {
    const router = useRouter();
    const { id } = router.query;
    const [trainer, setTrainer] = React.useState(null);

    React.useEffect(() => {
        if (!id) return;
        const fetchTrainerDetails = async () => {
            const response = await axios.get(`http://localhost:8080/trainers/${id}`);
            console.log(response.data);
            setTrainer(response.data);
        };

        fetchTrainerDetails();
    }, [id]);

    if (!trainer) return <p>Loading...</p>;

    const handleImageError = (event) => {
        event.target.src = '/pokemon_sprites/pokeball.png';
    };

    return (
        <>
            <Navbar></Navbar>
            <Container>
                <Box sx={{ textAlign: 'center', marginTop: 4, marginBottom: 4, padding: 3, backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                    <Typography variant="h4">{trainer?.trainer?.first_name}</Typography>
                    <Typography variant="body1">Email: {trainer?.trainer?.email}</Typography>
                    <Typography variant="body1">Phone: {trainer?.trainer?.phone_number}</Typography>
                </Box>
                <Grid container spacing={2} justifyContent="center">
                    {trainer?.pokemons?.map(pokemon => (
                        <Grid item xs={12} sm={6} md={4} lg={2} key={pokemon.pokemon_id}>
                            <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '4px' }}>
                                    {pokemon.type2_id ? (
                                        <>
                                            <Paper sx={{ padding: '2px', backgroundColor: typeColors[pokemon.type1_id], margin: '2px', minWidth: '60px', textAlign: 'center' }}>
                                                {pokemon.type1_name}
                                            </Paper>
                                            <Paper sx={{ padding: '2px', backgroundColor: typeColors[pokemon.type2_id], margin: '2px', minWidth: '60px', textAlign: 'center' }}>
                                                {pokemon.type2_name}
                                            </Paper>
                                        </>
                                    ) : (
                                        <Paper sx={{ padding: '2px', backgroundColor: typeColors[pokemon.type1_id], margin: '2px', minWidth: '60px', textAlign: 'center' }}>
                                            {pokemon.type1_name}
                                        </Paper>
                                    )}
                                </Box>
                                <CardMedia
                                    component="img"
                                    style={{ width: '100%', height: 'auto', objectFit: 'contain' }}
                                    image={`/pokemon_sprites/${pokemon.pokemon_name.toLowerCase()}.png`}
                                    alt={`Image of ${pokemon.pokemon_name}`}
                                    onError={handleImageError}
                                />
                                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <Typography variant="body1">Level: {pokemon.level}</Typography>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: '4px' }}>{pokemon.pokemon_name}</Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '4px' }}>
                                        {pokemon.moves && pokemon.moves.map(move => (
                                            <Paper
                                                key={move.move_id}
                                                sx={{
                                                    padding: '2px',
                                                    backgroundColor: typeColors[move.type_id] || typeColors.None,
                                                    margin: '2px',
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    textAlign: 'center',
                                                    minWidth: '80px',
                                                }}
                                            >
                                                <Typography variant="body2"><b>{move.move_name}</b></Typography>
                                                <Typography variant="caption">Power: {move.power || 0}</Typography>
                                                <Typography variant="caption">Accuracy: {move.accuracy || 0}</Typography>
                                            </Paper>
                                        ))}
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box sx={{ marginTop: 4 }}>
                    <Typography variant="h5">Items</Typography>
                    <Grid container spacing={2}>
                        {trainer?.items?.map(item => (
                            <Grid item key={item.item_id}>
                                <Paper sx={{ padding: 1 }}>
                                    <Typography variant="body1">{item.item_name}</Typography>
                                    <Typography variant="body2">Type: {item.item_type}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box sx={{ marginTop: 4 }}>
                    <Typography variant="h5">Events</Typography>
                    <Grid container spacing={2}>
                        {trainer?.events?.map(event => (
                            <Grid item key={event.event_id}>
                                <Paper sx={{ padding: 1 }}>
                                    <Typography variant="body1">{event.event_name}</Typography>
                                    <Typography variant="body2">Start Date: {event.start_date}</Typography>
                                    <Typography variant="body2">{event.event_description}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
                <Box sx={{ marginTop: 4 }}>
                    <Typography variant="h5">Badges</Typography>
                    <Grid container spacing={2}>
                        {trainer?.badges?.map(badge => (
                            <Grid item key={badge.badge_id}>
                                <Paper sx={{ padding: 1 }}>
                                    <Typography variant="body1">{badge.badge_name}</Typography>
                                    <Typography variant="body2">{badge.badge_description}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </>
    );
}

export default TrainerDetailsPage;