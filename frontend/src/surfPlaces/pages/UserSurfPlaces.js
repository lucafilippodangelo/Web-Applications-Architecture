import React, { useEffect, useState}  from 'react';
import { useParams } from 'react-router-dom';

import Surfplacelist from '../components/Surfplacelist.js';




const Usersurfplaces = () => {
  //LD "useParams" gives access to dynamic URL content like IDs. Called "Dynamic Segments"
  const userId = useParams().userId;

  const [data, setData] = useState([]);

  useEffect(() => {
  //https://blog.logrocket.com/modern-api-data-fetching-methods-react/
      console.log("---> BRUTAL LOADING OF PLACES FROM DB x");   
          const fetchPlaces = async () => {
            try {
              const xx = await fetch('http://localhost:3001/api/places', {
                mode:'cors',
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization' : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgwYTFlNTlmLTYwZGMtNGJmNS05MDA2LTUxOGFkOTFiY2U3ZSIsImlhdCI6MTY5NzU3MTE2NH0.FUS78Q0e_DMPAPsLUKWmNec0BNKYeJPwWhuc6snnxzs'
                }
              });
              console.log("- LD 000 q-");

              const responseData = await xx.json();

              console.log("- LD 001 log response data -");
              console.log(responseData);

              console.log("- LD 000 TWO -");

              // RESOURCE https://marketsplash.com/tutorials/react-js/how-to-fetch-data-from-json-file-in-react-js/

              let ss= responseData.filter(place => place.id === "baf08bd6-33ed-4712-a746-d0aaff0bcb3d");
              console.log("- LD 007-");
              console.log(ss);

              setData(ss);

            } 
            catch (err) {
              console.log("- LD ERROR -");
                  console.log(err);
            }
          };
          fetchPlaces();
        }, [userId]); //user has to be added because external dependency

  //LD filter from the input list by ID
  //const loadedPlaces= DUMMY_PLACES.filter(place => place.creator === userId);
  //return <Surfplacelist items={loadedPlaces} />;

  return <Surfplacelist items={data} />;
};

export default Usersurfplaces;