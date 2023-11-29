import React, { useCallback, useReducer } from 'react';

import Input from '../../shared/components/FormComponents/Input';
import Button from '../../shared/components/FormComponents/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/useful/validators';
import './NewSurfPlace.css';

const formReducer = (state, action) => {
    switch (action.type) {
      case 'INPUT_CHANGE':
        let formIsValid = true;
        //go through all the inputs to verify if they are valid. first time it gets executed this for loops the default state
        for (const inputId in state.inputs) {
          if (inputId === action.inputId) {
            formIsValid = formIsValid && action.isValid;
          } else {
            formIsValid = formIsValid && state.inputs[inputId].isValid;
          }
        }
        return {
          ...state,
          inputs: {
            ...state.inputs,
            //below I'm updating the specific object with "value" and "isValid" current content
            [action.inputId]: { value: action.value, isValid: action.isValid }
          },
          isValid: formIsValid
        };
      default:
        return state;
    }
  };
  
  const NewSurfPlace = () => {
  
  
    const [formState, dispatch] = useReducer(formReducer, { //DEFINING INITIAL STATE
      inputs: { //store validity of the individual inputs
        title: { //using the ID field 
            value: '',
            isValid: false
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
    isValid: false//store validity of the overall form
  });
  
  
    //INPUT HANDLERS are useful to manage OVERALL FORM VALIDITY
    //LD "useCallback" will avoid to call in infinite loop "useEffect" in child component
    const InputHandler = useCallback((id, value, isValid) =>{
      dispatch({type: 'INPUT_CHANGE', value: value, isValid: isValid, inputId:id}); //need to pass in all the "action" attributes
    }, []); 
  
  
    const placeSubmitHandler = event => {
      event.preventDefault(); //avoid the browser to submit request and causing page reload


    };
  
  
    return (
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {/* //LD going to call personalised "Input.js" */}
        
        <Input 
          id= "title"
          element="input" 
          type="text" 
          label="Title" 
          validators={[VALIDATOR_REQUIRE()]} //LD check input not empty
          errorText="Please enter a valid title."
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
          ADD PLACE
        </Button>
  
      </form>
    );
  };
  

export default NewSurfPlace;