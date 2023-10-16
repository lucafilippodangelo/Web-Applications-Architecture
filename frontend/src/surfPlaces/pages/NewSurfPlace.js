import React from 'react';

import Input from '../../shared/components/FormComponents/Input';
import Button from '../../shared/components/FormComponents/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/useful/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './NewSurfPlace.css';
  
  const NewSurfPlace = () => {
  
  
  //using array destructuring, "useForm" returns an array with two objects

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
  
    const placeSubmitHandler = event => {
      event.preventDefault(); //avoid the browser to submit request and causing page reload
      console.log("LD send to BE -> "); 
      console.log(formState.inputs); 
    };
  
  
    return (
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {/* //LD going to call personalised "Input.js" */}
        
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
  
        <Button type="submit" disabled={!formState.isValid}>
          ADD SURF PLACE
        </Button>
  
      </form>
    );
  };
  

export default NewSurfPlace;