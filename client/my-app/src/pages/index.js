import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonGrid from '@/components/PokemonGrid';
import { Container } from '@mui/material';
import Navbar from '../components/Navbar';

function HomePage() {
    const [pokemon, setPokemon] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8080/pokemon?page=${page}`);
                setPokemon(data.pokemon);
                setTotal(data.total);
            } catch (error) {
                console.error('Failed to fetch pokemon:', error);
            }
        };

        fetchPokemon();
    }, [page]);

    return (
        <Container maxWidth="lg">
            <Navbar></Navbar>
            <h1></h1>
            <PokemonGrid pokemon={pokemon} page={page} setPage={setPage} total={total} />
        </Container>
    );
}

export default HomePage;
