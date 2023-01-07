import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core';

const CardList = () => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {clubs.map((item) => (
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Card sx={{ maxWidth: 500 }} style={{
                        padding: "5px"
                    }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image="http://localhost:8085/club/2"
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                <h1>{item.nom}</h1>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate reptiles, with over 6,000
                                species, ranging across all continents except Antarctica
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default CardList;
