import React from 'react';
import { Grid, Card, CardContent, Typography, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';

const useStyles = makeStyles({
    card: {
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
    },
    rankNumber: {
        fontWeight: 'bold',
        marginRight: '8px',
    },
    containerGrid: {
        padding: '16px',
    },
});

function TopBattlersGrid({ battlers }) {
    const classes = useStyles();

    return (
        <Container>
            <Grid container spacing={2} className={classes.containerGrid}>
                {battlers.map((battler, index) => (
                    <Grid item xs={12} key={index}>
                        <Link href={`/trainers/${battler.trainer_id}`} passHref>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography variant="h6" component="div">
                                        <span className={classes.rankNumber}>{index + 1}.</span>
                                        {battler.username}
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Wins: {battler.win_count}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default TopBattlersGrid;