import React, { useReducer, useEffect } from 'react';

import {validate} from '../../useful/validators';
import TextField from "@mui/material/TextField";
import {Typography} from "@mui/material";

//LD the "inputReducer" function gets in input "state and action" and returns a state depending on action type.
const inputReducer = (state, action) => {
  //console.log("LD 001 OLD state.value-> "+ state.value);
  switch (action.type) {
    case 'TOUCH':
      return {
        ...state,
        isTouched: true //this is a new field I need to add to the "Input" initial state
      };
      case 'CHANGE':
        //console.log("LD 002 action.val -> "+ action.val);
      return {
        ...state, //copy all the content of the input state in a variable created on the fly
        value: action.val, //then override keys, in this case the value validation logic. "action.validators" come from "changeHandler"
        isValid: validate(action.val, action.validators) 
      };
    default:
      return state; //by default returning same state got in input
  }
};

// LD "useReducer" hook is useful when having interconnected states
// "useReducer" hook works getting the "current state"("inputState" in this case) and a "dispatch" function that gets called("inputReducer" in this case). 
// "inputReducer" function run its logic, then update in return "inputState"(an array with two elements stored in constants).
// NOTE: it gets a default initial "inputState" -> " { value: '', isTouched: false, isValid: false }".
const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '', //LD trying to get default value from props
    isTouched: false,
    isValid: props.initialValid || false //LD trying to get default value from props
  });


  // OBJECT DESTRUCTURING
  // from "props" I want to extrapolate "id" and "onInput" 
  const {id, onInput} = props; //so then I can call the function below like "onInput(id"  etc..
  const {value, isValid} = inputState; //LD this is updated by USE REDUCER

  //LD 
  // By default useEffect will trigger anytime an update happens to the React component. 
  // This means if the component receives new props from its parent component or even 
  //when you change the state locally, the effect will run again.
  useEffect(() => {
    //console.log("LD 003 USE EFFECT INVOKED");
    //console.log("LD 003a passing back to caller ID -> " + id);
    //console.log("LD 003b passing back to caller VALUE -> " + value);
    //console.log("LD 003c passing back to caller IS VALID -> " + isValid);

    onInput(id, value, isValid) //LD trigging "onInput" and passing back to "NewSurfPlace.js"
  }, [id, value, isValid, onInput]); //LD this function is triggered any time some of the dependencies changes


  // LD this function will be triggered for every keystroke
  const changeHandler = event => {
    //LD i want to call "dispatch" passing an "action" object ("type" and "val") 
    // "event.target.value" -> we get "event" for free, "target" is the component 
    // where the event got triggered, "value" is the component current value.
    // additionally including "validators" passed from "NewSurfPlace.js" to the action. 
    dispatch({ type: 'CHANGE', val: event.target.value, validators: props.validators });
  };

  const touchHandler = event => {
    dispatch({ type: 'TOUCH' });
  };

  const element =
    props.element === 'input' ? (
      <TextField
          variant={"filled"}
          sx={{mb:3}}
          fullWidth={true}
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler} // LD "onBlur" triggered when the user looses focus from the element, so I know the user has
        //at least cliccked in the textbox. This approach avid to throw error at the user by default
        value={inputState.value} //LD need to have current always binded
          error={!inputState.isValid && inputState.isTouched}
        label={props.label}
      />
    ) : (
      <TextField
          variant={"filled"}
          sx={{mb:3}}
          fullWidth={true}
          multiline={true}
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
          error={!inputState.isValid && inputState.isTouched}
          label={props.label}

      />
    );

  return (
    <>
      {/*LD I want to be flexible and decide from outside the elements to render in the form*/}
      {element}
      {!inputState.isValid && inputState.isTouched && <Typography sx={{mb:3}}>{props.errorText}</Typography>}
    </>


  );
};

export default Input;