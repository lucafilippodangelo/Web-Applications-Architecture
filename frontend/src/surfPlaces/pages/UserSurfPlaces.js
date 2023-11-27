import React, { useEffect, useState}  from 'react';
import { useParams } from 'react-router-dom';

import ErrorM from '../../shared/components/UI/ErrorM';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

import SurfPlaceList from '../components/SurfPlaceList.js';


import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';


const Usersurfplaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();


  const [selectedPets, setSelectedPets] = useState([]);
  const [petInputValue, setPetInputValue] = useState("");

  const [filteredPlaces, setFilteredPlaces] = useState([]); // Add state for filtered places


  //LD "useParams" gives access to dynamic URL content like IDs. Called "Dynamic Segments"
  const userId = useParams().userId;


        useEffect(() => {
          const fetchPlaces = async () => {
            try {
              //console.log("- LD UserSurfPlaces.js CALLING WITH USER ID -> " + userId);
              const responseData = await sendRequest(
                "http://localhost:3001/api/places?creatorId="+ userId
              );

              //const uniqueAddressesSet = new Set(responseData?.map(item => item.address));

              setLoadedPlaces(responseData);
              setFilteredPlaces(responseData); // Initialize filtered places with all places
          
              
            } catch (err) {}
          };
          fetchPlaces();
        }, [sendRequest, userId]); //user has to be added because external dependency



        /* The useEffect hook is used to update filteredPlaces whenever the selectedPets or loadedPlaces change*/
        useEffect(() => {
          // Filter places based on selected addresses
          if (loadedPlaces && selectedPets.length > 0) {
            const filtered = loadedPlaces.filter(place =>
              selectedPets.includes(place.address)
            );
            setFilteredPlaces(filtered);
            console.log ("show filtered");
            console.log (selectedPets.length);
          } else {
            // If no addresses are selected, show all places (set filteredPlaces to loadedPlaces)
            setFilteredPlaces(loadedPlaces || []);
            console.log (loadedPlaces);
          }
        }, [selectedPets, loadedPlaces]);


          //LD this function will be called bottom up from "confirmDeleteHandler" in "SurfPlaceItem.js"
          // "deletedPlaceId" will need to be passed in
          const surfPlaceDeletedHandler = deletedPlaceId => {
            setLoadedPlaces(prevPlaces =>
              prevPlaces.filter(place => place.id !== deletedPlaceId)
            );
          };


        return (
          <React.Fragment>
            <ErrorM error={error} onClear={clearError} />
            {isLoading && (
              <div className="center">
                <LoadingSpinner />
              </div>
            )}

            {/* //------------------------------------------------------------------------------- */}
              <h5 style={{ marginBottom: "1rem", textAlign: "left" }}>
              You selected:{" "}
              <span style={{ color: "dodgerblue", fontWeight: "800" }}>
                {selectedPets
                  .map((pet, i, arr) =>
                    arr.length > 1 && arr.length - 1 === i ? ` and ${pet}.` : pet
                  )
                  .join(", ") || "Nothing yet"}
              </span>

            </h5>
            <Autocomplete
              multiple
              //defaultValue={selectedPets}
              style={{ width: "40%" }}
              options={loadedPlaces ? Array.from(new Set(loadedPlaces.map(item => item.address))) : []} //{pets}
              onChange={(event, newPet) => {
                setSelectedPets(newPet);
              }}
              inputValue={petInputValue}
              onInputChange={(event, newPetInputValue) => {
                setPetInputValue(newPetInputValue);
              }}
              renderInput={(params) => {
                return <TextField label='Select surf tags' {...params} />;
              }}
            ></Autocomplete>
            {/* //------------------------------------------------------------------------------- */}

            {!isLoading && loadedPlaces && <SurfPlaceList items={filteredPlaces} onDeletePlace={surfPlaceDeletedHandler} />}
          </React.Fragment>
        );
};

export default Usersurfplaces;