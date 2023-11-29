import React, { useState, useContext } from 'react';

import UserBox from '../../shared/components/UI/UserBox';
import Input from '../../shared/components/FormComponents/Input';
import ErrorModal from '../../shared/components/UI/ErrorM';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_CONTAINS_UPPERCASE,
  VALIDATOR_CONTAINS_NUMBER
} from '../../shared/useful/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { authenticationContext } from '../../shared/reactContext/authenticationContext';
import './Authenticate.css';
import {Button} from "@mui/material";

const Authenticate = () => {

	const auth = useContext(authenticationContext);  //LD listening to shared context

	//LD need a state because every time switch login<=>signup react has to refresh/reload the form
  const [isLoginMode, setIsLoginMode] = useState(true);//LD initially set in login mode

  /*
    //LD commenting code below because contained in "useHttpClient" hook
    const [isLoading,setIsLoading] = useState(false);
    const [error,setError] = useState();
  */
  //LD initialising this at the beginning of the page execution
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  
  //LD NOTE -> react execute code iteratively so this will be executed as second function. We will get populated the 3 returned variables.
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false //LD initial form validity
  );

  //LD to switch form mode
  const switchModeHandler = () => {
    	//LD I'm writing some logic around "setFormData" to manage correctly when switching between signin<=>signup
	    //NOTE I did extract the constant "setFormData" from "useForm"
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs, //LD need to copy all the fields and pass them back. Otherwise will get "undefined"
          name: undefined
        },
        //LD passing validity condition. In this case in SIGNUUP and switching to LOGIN. The below has to be valid
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      //LD moving to signup mode
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          }
        },
        false
      );
    }

	//LD "prevMode" is a function to use if the new state is the opposite of the previous one in this case switch a boolean.
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler = async event => {
    event.preventDefault();

    if (isLoginMode) { //LOGIN
      try {
      
        const responseData = await sendRequest(
            'http://localhost:3001/api/users/authenticate',
            'POST',
            JSON.stringify({
              email: formState.inputs.email.value,
              password: formState.inputs.password.value
            }),
            {
              'Content-Type': 'application/json'
            }
          );
          auth.login(responseData.id, responseData.token);
    } catch (err) {} 
  }
    else { //SIGNUP
      try {
        const responseData = await sendRequest(
          'http://localhost:3001/api/users',
          'POST',
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          }),
          {
            'Content-Type': 'application/json'
          }
        );
        auth.login(responseData.id, responseData.token);

      } catch (err) {

      }
    }

  };


  return (
    <React.Fragment>
    <ErrorModal error={error} onClear={clearError} />
    <UserBox className="auth">
      {isLoading && <LoadingSpinner asOverlay />}
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
        )}
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_CONTAINS_UPPERCASE(), VALIDATOR_CONTAINS_NUMBER()]}
          errorText="Please enter a valid password -> at least 5 characters, at least one uppercase, at lease one number"
          onInput={inputHandler}
        />
        <Button variant={"contained"} type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button variant={"contained"} inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </Button>
    </UserBox>
  </React.Fragment>
  );
};

export default Authenticate;