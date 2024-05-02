import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';

function Navbar() {
    return (
        <AppBar position="static" sx={{ borderRadius: '16px' }}>
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <img src="/pbtl_logo.png" alt="Logo" style={{ height: 40 }} />
                </Typography>
                <Link href="/" passHref>
                    <Button color="inherit" sx={{ color: 'white' }}>Pokémon</Button>
                </Link>
                <Link href="/gyms" passHref>
                    <Button color="inherit" sx={{ color: 'white' }}>Gyms</Button>
                </Link>
                <Link href="/battles" passHref>
                    <Button color="inherit" sx={{ color: 'white' }}>Leaderboard</Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
