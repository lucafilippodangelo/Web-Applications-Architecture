import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormComponents/Input';
import Button from '../../shared/components/FormComponents/Button';
import UserBox from '../../shared/components/UI/UserBox' 
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/useful/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './NewSurfPlace.css'; //LD reusing

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
        id: 'p3',
        title: 'Roccalumera 3',
        description: 'Where we spend family summer 3',
        imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsPmRyqwpfiaLoAQUZQ64jXvATeFnAV8eh1Cqd1EmlU6ajX96IziP1ZBIe4DDmZyLASGw&usqp=CAU',
        address: '98027 Metropolitan City of Messina Italy 3',
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

const UpdateSurfPlace = () => {
  const [isLoading, setIsLoading] = useState(true);
  const placeId = useParams().placeId; //LD extrapolating parm from URL
  const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);


  //LD (STEP ONE)
  // just calling "useForm" with initial parms
  // NOTE -> see comments in "NewSurfPlace.js" and "form-hook.js" to see how similar to this "UpdatePlace.js" the logic is
  const [formState, inputHandler, setFormData] = useForm( //const [formState, inputHandler] = useForm(
    {
      title: {
        value: '', //value: identifiedPlace.title,
        isValid: false //isValid: true
      },
      description: {
        value: '', //value: identifiedPlace.description,
        isValid: false //isValid: true
      }
    },
    false
  );


  //LD NOTE -> to avoid infinite loops we use "useEffect". Everything inside will be called 
  // only when the dependencies change. So
  // "identifiedPlace" will chenge only when the fetched data will differ.
  // "setFormData" will not always change because in "form-hook.js" wrapped with "useCallback"
  useEffect(() => {
    if (identifiedPlace){
        //LD NOTE -> react works top down. So run "useForm", 
        //then get completed the fetching of the data. See above "identifiedPlace"
        //then set that data in the form by calling "setFormData" in the hook
        setFormData(
          {
            title: {
              value: identifiedPlace.title,
              isValid: true
            },
            description: {
              value: identifiedPlace.description,
              isValid: true
            }
          },
          true
        );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);


  const placeUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);
  };


  // LD BELOW AS IT WAS ----------------------------------------------
  if (!identifiedPlace) {
    return (
      <div className="center">
        <UserBox>
            <h2>Could not find place!</h2>
        </UserBox>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]} //LD executing this validator on this input
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid}>
        UPDATE SURF PLACE
      </Button>
    </form>
  );
};

export default UpdateSurfPlace;