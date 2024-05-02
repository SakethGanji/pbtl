import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import typeColors from '@/utils/typeColors';

function GymList({ gyms }) {
    const getTypeColor = (typeName) => {
        const typeId = Object.keys(typeColors).find(key => typeColors[key].name === typeName);
        return typeColors[typeId]?.color || '#ddd';
    };

    return (
        <Box>
            {gyms.map((gym) => (
                <Box key={gym.gym_id} display="flex" alignItems="center" marginBottom={2}>
                    <Box flexGrow={1}>
                        <Typography variant="h6">{gym.gym_name}</Typography>
                        <Typography>Location: {gym.gym_location}</Typography>
                        <Typography>Trainer: {gym.trainer_name}</Typography>
                    </Box>
                    <Paper
                        style={{
                            backgroundColor: getTypeColor(gym.type_name),
                            padding: '4px 8px',
                            borderRadius: '4px',
                        }}
                    >
                        <Typography variant="body2" style={{ color: 'white', fontWeight: 'bold' }}>
                            {gym.type_name}
                        </Typography>
                    </Paper>
                </Box>
            ))}
        </Box>
    );
}

export async function getServerSideProps() {
    try {
        const res = await fetch('http://localhost:8080/gyms?page=1');
        if (!res.ok) {
            throw new Error('Failed to fetch gyms');
        }
        const data = await res.json();

        return {
            props: {
                gyms: data.gyms,
                total: data.total,
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

export default GymList;