import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Roccalumera',
    description: 'Where we spend family summer',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsPmRyqwpfiaLoAQUZQ64jXvATeFnAV8eh1Cqd1EmlU6ajX96IziP1ZBIe4DDmZyLASGw&usqp=CAU',
    address: '98027 Metropolitan City of Messina Italy',
    location: {
      lat: 37.9746286,
      lng: 15.3733789
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Galway',
    description: 'Galway, a harbour city on Ireland’s west coast, sits where the River Corrib meets the Atlantic Ocean.',
    imageUrl: 'https://images.ireland.com/media/Images/galway-day-trips/b73254c641a44e77806a03b897f43cf2.jpg',
    address: 'Galway Gaillimh',
    location: {
      lat: 53.2837979,
      lng: -9.2135519
    },
    creator: 'u2'
  }
];

const UserSurfPlaces = () => {
  //LD "useParams" gives access to dynamic URL content like IDs. Called "Dynamic Segments"
  const userId = useParams().userId;
  //LD filter from the input list by ID
  const loadedPlaces= DUMMY_PLACES.filter(place => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};

export default UserSurfPlaces;