import React, { useEffect, useState}  from 'react';
import { useParams } from 'react-router-dom';

import ErrorM from '../../shared/components/UI/ErrorM';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

import Surfplacelist from '../components/Surfplacelist.js';




const Usersurfplaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();


  //LD "useParams" gives access to dynamic URL content like IDs. Called "Dynamic Segments"
  const userId = useParams().userId;


        useEffect(() => {
          const fetchPlaces = async () => {
            try {
              console.log("- LD UserSurfPlaces.js CALLING WITH USER ID -> " + userId);
              const responseData = await sendRequest(
                "http://localhost:3001/api/places?creatorId="+ userId
              );
              setLoadedPlaces(responseData);
            } catch (err) {}
          };
          fetchPlaces();
        }, [sendRequest, userId]); //user has to be added because external dependency

        return (
          <React.Fragment>
            <ErrorM error={error} onClear={clearError} />
            {isLoading && (
              <div className="center">
                <LoadingSpinner />
              </div>
            )}
            {!isLoading && loadedPlaces && <Surfplacelist items={loadedPlaces} />}
          </React.Fragment>
        );
};

export default Usersurfplaces;