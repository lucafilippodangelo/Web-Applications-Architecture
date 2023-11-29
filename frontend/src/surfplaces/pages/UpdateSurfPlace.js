import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormComponents/Input';
import UserBox from '../../shared/components/UI/UserBox'
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import ErrorM from '../../shared/components/UI/ErrorM';

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_SEPARATED_BY_COMA
} from '../../shared/useful/validators';

import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { authenticationContext } from '../../shared/reactContext/authenticationContext';

import './NewSurfPlace.css';
import {Button} from "@mui/material"; //LD reusing



const UpdateSurfPlace = () => {

  const auth = useContext(authenticationContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedPlace, setLoadedPlace] = useState();
  const placeId = useParams().placeId; //LD extrapolating parm from URL
  const history = useHistory();


  //LD (STEP ONE)
  // just calling "useForm" with initial parms
  // NOTE -> see comments in "NewSurfPlace.js" and "form-hook.js" to see how similar to this "UpdatePlace.js" the logic is
  const [formState, inputHandler, setFormData] = useForm( 
    {
      name: {
        value: '', 
        isValid: false 
      },
      description: {
        value: '', 
        isValid: false 
      },
      tags: {
        value: '', 
        isValid: false 
      }
    },
    false
  );

  //LD GET PLACE ID ----------------------------------------------------------------------
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        console.log(" --> LD UpdateSurfPlace FETCH place ID ");
        const responseData = await sendRequest(
          "http://localhost:3001/api/places/" + placeId
        );
        console.log(" --> LD UpdateSurfPlace DATA WILL BE SENT TO HTTP HOOK -> ");
        console.log(responseData);

        setLoadedPlace(responseData);

        setFormData(
          {
            name: {
              value: responseData.name,
              isValid: true //LD current saved data is supposed to be true
            },
            description: {
              value: responseData.description,
              isValid: true //LD current saved data is supposed to be true
            },
            tags: {
              value: responseData.tags.join(","),
              isValid: true //LD current saved data is supposed to be true
            }
          },
          true
        );

      } catch (err) {
        console.log(" --> LD UpdateSurfPlace FETCH ERROR !!! ");
      }
    };
    fetchPlace();
  }, [sendRequest, placeId, setFormData ]);



  //LD submitting updated data -----------------------------------------------------------
  const placeUpdateSubmitHandler = async event => {
    event.preventDefault();
    
    console.log("LD in UpdateSurfPlace ->USED URL -> ");
    console.log("http://localhost:3001/api/places/" + placeId);


    try {
      //console.log("LD in UpdateSurfPlace ->TRY TO SUBMIT UPDATED DATA");
      var testReturnedStuff = await sendRequest(
        "http://localhost:3001/api/places/" + placeId,
        "PUT",
        JSON.stringify({
          name: formState.inputs.name.value,
          description: formState.inputs.description.value,
          address: loadedPlace.address, //LD just passing same value back 
          tags: formState.inputs.tags.value.split(",")
        }),
        {
          'Content-Type': 'application/json',
          'Authorization' : auth.token
        }
      );


      console.log("LD RETURNED UPDATED -> ");
      console.log(testReturnedStuff);

      history.push('/' + auth.userId + '/surfplacesx');
    } catch (err) {

      console.log("LD in UpdateSurfPlace -> update place ID ERROR");
      console.log(err);
    }
  };


  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <UserBox>
          <h2>Could not find place!</h2>
        </UserBox>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorM error={error} onClear={clearError} />
      {!isLoading && loadedPlace && (
         <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
         <Input
           id="name"
           element="input"
           type="text"
           label="name"
           validators={[VALIDATOR_REQUIRE()]} //LD executing this validator on this input
           errorText="Please enter a valid name."
           onInput={inputHandler}
           initialValue={loadedPlace.name}//{formState.inputs.name.value}
           initialValid={true}
         />
         
         <Input
           id="description"
           element="textarea"
           label="Description"
           validators={[VALIDATOR_MINLENGTH(5)]}
           errorText="Please enter a valid description (min. 5 characters)."
           onInput={inputHandler}
           initialValue={loadedPlace.description}//{formState.inputs.description.value}
           initialValid={true}
         />

          <Input
           id="tags"
           element="input"
           label="Tags"
           validators={[VALIDATOR_SEPARATED_BY_COMA(),VALIDATOR_REQUIRE()]}
           errorText="Tags need to: be letters or number with no spaces separated by coma"
           onInput={inputHandler}
           initialValue={loadedPlace.tags.join(",")}
           initialValid={true}
         />

         <Button variant={"contained"} type="submit" disabled={!formState.isValid}>
           UPDATE SURF PLACE
         </Button>
       </form>
        )}
    </React.Fragment>
   
  );
};

export default UpdateSurfPlace;