import React from 'react';
import './UserItem.css';

// LD this will use DOM before that any routing or action in "App.js" is performed
import {Button, Card, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const UserItem = props => {
    return (

        <Card>
            <CardMedia
                component={"img"}
                image={props.image}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Lizard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {`${props.placeCount} Surf Place${props.placeCount === 1 ? '' : 's'}`}
                </Typography>
            </CardContent>
            <CardActions>
                <Button component={Link} to={`/${props.id}/surfplacesx`}>View</Button>
            </CardActions>
        </Card>

    );
};

export default UserItem; 