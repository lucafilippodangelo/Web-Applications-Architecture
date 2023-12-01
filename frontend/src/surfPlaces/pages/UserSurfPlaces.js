import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ErrorM from '../../shared/components/UI/ErrorM';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import {useHttpClient} from '../../shared/hooks/http-hook';
import SurfPlaceList from '../components/SurfPlaceList.js';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {Box, Container} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import UserSurfPlacesList from "../components/UserSurfPlacesList";
import UserSurfPlaceMap from "../components/UserSurfPlaceMap";

const Usersurfplaces = () => {

    const [loadedPlaces, setLoadedPlaces] = useState([]);
    const {isLoading, error, sendRequest, clearError} = useHttpClient();

    const [selectedTags, setSelectedTags] = useState([]);
    const [tagFilterInput, setTagFilterInput] = useState("");

    const [textFilter, setTextFilter] = useState("");

    const filteredPlaces = loadedPlaces
        .filter(p => {

            for (let tag of selectedTags) {

                if (!p.tags.includes(tag)) return false;

            }

            return true;

        })
        .filter(p => {

            if (p.name.toLowerCase().includes(textFilter.trim().toLocaleLowerCase())) return true;
            if (p.address.toLowerCase().includes(textFilter.trim().toLocaleLowerCase())) return true;
            if (p.description.toLowerCase().includes(textFilter.trim().toLocaleLowerCase())) return true;

            return false;

        });

    const availableTags = () => {

        const set = [];

        for (let place of loadedPlaces) {

            for (let tag of place.tags) {

                if (set.includes(tag)) continue;
                set.push(tag);

            }

        }

        return set;

    }

    //LD "useParams" gives access to dynamic URL content like IDs. Called "Dynamic Segments"
    const userId = useParams().userId;

    useEffect(() => {
        const fetchPlaces = async () => {
            try {

                const responseData = await sendRequest(
                    "http://localhost:3001/api/places?creatorId=" + userId
                );

                setLoadedPlaces(responseData);

            } catch (err) {
            }
        };
        fetchPlaces();
    }, [sendRequest, userId]); //user has to be added because external dependency


    //LD this function will be called bottom up from "confirmDeleteHandler" in "SurfPlaceItem.js"
    // "deletedPlaceId" will need to be passed in
    const surfPlaceDeletedHandler = deletedPlaceId => {
        setLoadedPlaces(prevPlaces =>
            prevPlaces.filter(place => place.id !== deletedPlaceId)
        );
    };

    if(isLoading) return (
        <div className="center">
            <LoadingSpinner/>
        </div>
    );

    return (
        <Box>
            <ErrorM error={error} onClear={clearError}/>

            <Grid container spacing={0}>

                <Grid item md={4} xs={12} sx={{height: {sm: '50%'}, padding: "20px", margin: "0px" }}>
                    <UserSurfPlacesList
                        setSelectedTags={setSelectedTags}
                        setTextFilter={setTextFilter}
                        setTagFilterInput={setTagFilterInput}
                        tags={availableTags()}
                        tagFilterInput={tagFilterInput}
                        textFilter={textFilter}
                        places={filteredPlaces}
                    />
                </Grid>

                <Grid item sx={{display: {xs: 'none', md: 'block'}}} md={8}>
                    <UserSurfPlaceMap
                        places={filteredPlaces}
                    />
                </Grid>

            </Grid>

        </Box>
    );
};

export default Usersurfplaces;