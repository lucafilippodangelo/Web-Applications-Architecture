import React, { useEffect, useState}  from 'react';
import { useParams } from 'react-router-dom';

import Surfplacelist from '../components/Surfplacelist.js';

// const DUMMY_PLACES = [
//   {
//     id: 'p1',
//     name: 'Roccalumera',
//     description: 'Where we spend family summer',
//     imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsPmRyqwpfiaLoAQUZQ64jXvATeFnAV8eh1Cqd1EmlU6ajX96IziP1ZBIe4DDmZyLASGw&usqp=CAU',
//     address: '98027 Metropolitan City of Messina Italy',
//     location: {
//       lat: 37.9746286,
//       lng: 15.3733789
//     },
//     creator: 'u1'
//   },
//   {
//     id: 'p3',
//     name: 'Roccalumera 3',
//     description: 'Where we spend family summer 3',
//     imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsPmRyqwpfiaLoAQUZQ64jXvATeFnAV8eh1Cqd1EmlU6ajX96IziP1ZBIe4DDmZyLASGw&usqp=CAU',
//     address: '98027 Metropolitan City of Messina Italy 3',
//     location: {
//       lat: 37.9746286,
//       lng: 15.3733789
//     },
//     creator: 'u1'
//   },
//   {
//     id: 'p2',
//     name: 'Galway',
//     description: 'Galway, a harbour city on Ireland’s west coast, sits where the River Corrib meets the Atlantic Ocean.',
//     imageUrl: 'https://images.ireland.com/media/Images/galway-day-trips/b73254c641a44e77806a03b897f43cf2.jpg',
//     address: 'Galway Gaillimh',
//     location: {
//       lat: 53.2837979,
//       lng: -9.2135519
//     },
//     creator: 'u2'
//   }
// ];



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