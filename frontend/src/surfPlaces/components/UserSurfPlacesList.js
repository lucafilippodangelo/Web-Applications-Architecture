import Grid from "@mui/material/Unstable_Grid2";
import SurfPlaceList from "./SurfPlaceList";
import React from "react";
import TextFilter from "./TextFilter";
import TagFilter from "./TagFilter";
import {Box} from "@mui/material";

const UserSurfPlacesList = props => {

    return (
        <Box>
            <Grid container spacing={2}>

                <Grid item xs={12} sm={6}>
                    <TextFilter
                        textFilter={props.textFilter}
                        setTextFilter={props.setTextFilter}
                    />
                </Grid>

                <Grid item xs={12} sm={6}>
                    <TagFilter
                        tagFilterInput={props.tagFilterInput}
                        setTagFilterInput={props.setTagFilterInput}
                        tags={props.tags}
                        setSelectedTags={props.setSelectedTags}
                    />
                </Grid>

            </Grid>

            <SurfPlaceList items={props.places} selectedPlace={props.selectedPlace}
                           onPlaceSelected={props.onPlaceSelected} onDeletePlace={props.onPlaceDeleted}/>
        </Box>
    );

}

export default UserSurfPlacesList;