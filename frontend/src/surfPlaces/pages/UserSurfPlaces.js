import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import ErrorM from '../../shared/components/UI/ErrorM';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import {useHttpClient} from '../../shared/hooks/http-hook';
import SurfPlaceList from '../components/SurfPlaceList.js';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import {Container} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

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


    return (
        <>
            <ErrorM error={error} onClear={clearError}/>
            {isLoading && (
                <div className="center">
                    <LoadingSpinner/>
                </div>
            )}

            <Container>

                <Grid container spacing={2}>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            sx={{mb: 3}}
                            label={"Search"}
                            inputValue={textFilter}
                            onChange={(e) => setTextFilter(e.target.value)}
                            fullWidth={true}/>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <Autocomplete
                            sx={{mb: 3}}
                            fullWidth={true}
                            multiple
                            options={availableTags()}
                            onChange={(_, newPet) => {
                                setSelectedTags(newPet);
                            }}
                            inputValue={tagFilterInput}
                            onInputChange={(_, newPetInputValue) => {
                                setTagFilterInput(newPetInputValue);
                            }}
                            renderInput={(params) => {
                                return <TextField label='Tags' {...params} />;
                            }}
                        ></Autocomplete>
                    </Grid>

                </Grid>

                {!isLoading && loadedPlaces &&
                    <SurfPlaceList items={filteredPlaces} onDeletePlace={surfPlaceDeletedHandler}/>}

            </Container>

        </>
    );
};

export default Usersurfplaces;