import React from 'react';
import TopBattlersGrid from '../../components/TopBattlersGrid';
import {Typography, Box, Container} from '@mui/material';
import Navbar from "@/components/Navbar";

function Leaderboard({ battlers }) {
    return (
        <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', marginTop: 4 }}>
                <Navbar></Navbar>
                <Typography variant="h4" component="h1" gutterBottom>
                    Battles Leaderboard: Top 100
                </Typography>
                <TopBattlersGrid battlers={battlers} />
            </Box>
        </Container>
    );
}

export async function getServerSideProps() {
    const res = await fetch('http://localhost:8080/top-battlers');
    const battlers = await res.json();
    return { props: { battlers } };
}

export default Leaderboard;