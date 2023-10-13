import React, { useReducer } from 'react';//import React, { useReducer, useEffect } from 'react';

import {validate} from '../../useful/validators';
import './Input.css';

//LD the "inputReducer" function gets in input "state and action". This function have always to return a state depending on action type
const inputReducer = (state, action) => {
  switch (action.type) {
    case 'TOUCH':
      return {
        ...state, //copy all the content of the input state in a variable created on the fly
        isTouched: true //this is a new field I need to add to the "Input" initial state
      };
      case 'CHANGE':
      return {
        ...state, //copy all the content of the input state in a variable created on the fly
        value: action.val, //then override keys, in this case the value validation logic. "action.validators" come from "changeHandler"
        isValid: validate(action.val, action.validators) 
      };
    default:
      return state; //by default returning same state got in input
  }
};

//LD "useReducer" hook is useful when having interconnected states
//NOTE: it gets a default initial state as input -> " { value: '',isTouched: false, isValid: false }"
// "useReducer" returns an array with two elements stored in constants: the "current state", in this case "inputState"
// and a "dispatch" function that can be called.
// That's how actions are dispatched to the "inputReducer" function that will then run its logic, then update
// in return "inputState".
const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isTouched: false,
    isValid: false
  });


  //LD -> useEffect(() => {}, [dependencies]);
 


  //LD this function will be triggered for every keystroke
  const changeHandler = event => {
    //LD i want to call "dispatch" passing an "action" object ("type" and "val") 
    // "event.target.value" -> we get "event" for free, "target" is the component 
    // where the event got triggered, "value" is the component current value.
    dispatch({ type: 'CHANGE', val: event.target.value, validators: props.validators });
  };

  const touchHandler = event => {
    dispatch({ type: 'TOUCH' });
  };

  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler} // "onBlur" triggered when the user looses focus from the element, so I know the user has
        //at least cliccked in the textbox. This approach avid to throw error at the user by default
        value={inputState.value} //LD need to have this always binded
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${!inputState.isValid && inputState.isTouched &&
        'form-control--invalid'}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {/*//LD I want to be flexible and decide from outside the elements to render in the form*/}
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;