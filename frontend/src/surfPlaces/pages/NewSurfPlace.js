import React, {useContext} from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../shared/components/FormComponents/Input';
import ErrorModal from '../../shared/components/UI/ErrorM';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_SEPARATED_BY_COMA
} from '../../shared/useful/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { authenticationContext } from '../../shared/reactContext/authenticationContext';
import './NewSurfPlace.css';
import {Button, Divider, Typography} from "@mui/material";
  
  const NewSurfPlace = () => {
    
  const auth = useContext(authenticationContext);
  const {error, sendRequest, clearError } = useHttpClient();
  

  // NOTE -> following "LD (STEP THREE)" in "form-hook.js" I can now call 
  //the hook "useForm" passing initial validities for inputs and form
  // NOTE -> following "LD (STEP FIVE)" in "form-hook.js" I can now call 
  //"inputHandler" than will then trigger "useForm".
  const [formState, InputHandler] = useForm( 
    {
      name: {
        value: '',
        isValid: false //LD initial input validity
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      }
    },
    false //LD initial form validity is false
  );
  
  const history = useHistory();

  const placeSubmitHandler = async event => {
    event.preventDefault();
    
    console.log("LD what will be SENT TO BE -> "); 
    console.log(formState.inputs); // send this to the backend!

    console.log("CURRENT CONTEXT LOGGED IN USER -> " + auth.userId); 
    console.log("CURRENT CONTEXT TOKEN -> " + auth.token); 

    try {
      await sendRequest(
        'http://localhost:3001/api/places',
        'POST',
        JSON.stringify({
          name: formState.inputs.name.value,
          //description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          description: formState.inputs.description.value, //TO BE REMOVED
          imageUrl: "images/2.jpg",
          tags: formState.inputs.tags.value.split(",")
        }),
        { 'Content-Type': 'application/json',
          'Authorization' : auth.token
        }
      );
      history.push('/' + auth.userId + '/surfplacesx');
    } catch (err) {}
  };
  

  
    return (
      <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {/* //LD going to call personalised "Input.js" */}

          <Typography sx={{mb: 2}} variant={"h4"} component={"h1"} fontWeight={"bold"}>Surf Place</Typography>

          <Divider sx={{mb: 3}} />

        <Input 
          id= "name"
          element="input" 
          type="text" 
          label="Name"
          validators={[VALIDATOR_REQUIRE()]} //LD check input not empty
          errorText="Please enter a valid name."
          onInput={InputHandler} //LD when nested "Input" triggers "onInput" pass back "id, value, isValid" that in this case will be passed as input to "InputHandler"
          /> 
  
        {/* let's create a second input */}
        <Input 
          id= "description"
          element="textarea" 
          label="Description" 
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={InputHandler}  //LD see above
          /> 
  
          <Input 
            id= "address"
            element="input" 
            type="text" 
            label="Address" 
            validators={[VALIDATOR_REQUIRE()]} 
            errorText="Please enter a valid Address."
            onInput={InputHandler} //LD see above
          /> 
  
           <Input 
            id= "tags"
            element="input" 
            type="text" 
            label="Tags" 
            validators={[VALIDATOR_SEPARATED_BY_COMA(),VALIDATOR_REQUIRE()]}
            errorText="Tags need to: be letters or number with no spaces separated by coma"
            onInput={InputHandler} //LD see above
          /> 

        <Button variant={"contained"} type="submit" disabled={!formState.isValid}>
          ADD SURF PLACE
        </Button>
  
      </form>
      </React.Fragment>
    );
  };
  

export default NewSurfPlace;