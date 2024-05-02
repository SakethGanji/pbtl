import React from 'react';
import { Grid, Card, CardContent, Typography, Pagination, CardMedia } from '@mui/material';
import Link from 'next/link';
import typeColors from '@/utils/typeColors';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    card: {
        cursor: 'pointer',
        '&:hover': {
            textDecoration: 'none',
        },
    },
});

function PokemonGrid({ pokemon, page, setPage, total }) {
    const classes = useStyles();

    const handleChange = (event, value) => {
        setPage(value);
    };

    const getColor = (type1_id, type2_id) => {
        const color1 = typeColors[type1_id] || typeColors['None'];
        const color2 = type2_id ? (typeColors[type2_id] || typeColors['None']) : color1;
        return `linear-gradient(45deg, ${color1}, ${color2})`;
    };

    const handleImageError = (event) => {
        event.target.src = '/pokemon_sprites/pokeball.png';
    };

    return (
        <div>
            <Grid container spacing={2}>
                {pokemon.map((p) => (
                    <Grid item xs={12} sm={6} md={4} key={p.pokemon_id}>
                        <Link href={`/pokemon/[id]`} as={`/pokemon/${p.pokemon_id}`} passHref>
                            <Card
                                className={classes.card}
                                style={{ backgroundImage: getColor(p.type1_id, p.type2_id) }}
                            >
                                <CardMedia
                                    component="img"
                                    style={{ width: '80%', height: '80%', objectFit: 'contain' }}
                                    image={`/pokemon_sprites/${p.pokemon_name}.png`}
                                    alt={`Image of ${p.pokemon_name}`}
                                    onError={handleImageError}
                                />
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {p.pokemon_name}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Types: {p.type1_name}{p.type2_name ? ', ' + p.type2_name : ''}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
            <Pagination count={Math.ceil(total / 10)} page={page} onChange={handleChange} />
        </div>
    );
}

export default PokemonGrid;
