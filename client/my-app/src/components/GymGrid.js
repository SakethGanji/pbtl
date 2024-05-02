import React from 'react';
import { makeStyles } from '@mui/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Pagination, Link as MuiLink, Tooltip } from '@mui/material';
import Link from 'next/link';
import typeColors from '@/utils/typeColors';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    linkBox: {
        border: '1px solid #ccc',
        padding: '4px 8px',
        borderRadius: '4px',
        display: 'inline-block',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#f0f0f0',
        },
    },
    container: {
        marginTop: '20px',
    },
    typeBox: {
        padding: '4px 8px',
        borderRadius: '4px',
        display: 'inline-block',
        fontWeight: 'bold',
        color: 'white',
    },
    badgeBox: {
        fontWeight: 'bold',
    }
});

function GymGrid({ gyms, page, setPage, total }) {
    const classes = useStyles();

    const handleChange = (event, value) => {
        setPage(value);
    };

    const getTypeColor = (typeId) => {
        return typeColors[typeId] || typeColors.None;
    };

    return (
        <div className={classes.container}>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><h3>Gym Name</h3></TableCell>
                            <TableCell align="right"><h3>Location</h3></TableCell>
                            <TableCell align="right"><h3>Trainer Name</h3></TableCell>
                            <TableCell align="right"><h3>Type</h3></TableCell>
                            <TableCell align="right"><h3>Badge</h3></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gyms.map((gym) => (
                            <TableRow key={gym.gym_id}>
                                <TableCell component="th" scope="row">
                                    {gym.gym_name}
                                </TableCell>
                                <TableCell align="right">{gym.gym_location}</TableCell>
                                <TableCell align="right">
                                    <Link href={`/trainers/${gym.trainer_id}`} passHref>
                                        <MuiLink className={classes.linkBox}>
                                            {gym.trainer_name}
                                        </MuiLink>
                                    </Link>
                                </TableCell>
                                <TableCell align="right">
                                    <span className={classes.typeBox} style={{ backgroundColor: getTypeColor(gym.type_id) }}>
                                        {gym.type_name}
                                    </span>
                                </TableCell>
                                <TableCell align="right">
                                    <Tooltip title={gym.badge_description || 'No description'}>
                                        <span className={classes.badgeBox}>
                                            {gym.badge_name || 'No Badge'}
                                        </span>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination count={Math.ceil(total / 33)} page={page} onChange={handleChange} sx={{ marginTop: 2 }} />
        </div>
    );
}

export default GymGrid;
