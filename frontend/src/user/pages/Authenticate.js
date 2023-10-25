import React, { useState, useContext } from 'react';

import UserBox from '../../shared/components/UI/UserBox';
import Input from '../../shared/components/FormComponents/Input';
import Button from '../../shared/components/FormComponents/Button';
import ErrorModal from '../../shared/components/UI/ErrorM';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,

} from '../../shared/useful/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { authenticationContext } from '../../shared/reactContext/authenticationContext';
import './Authenticate.css';

const Authenticate = () => {

	const auth = useContext(authenticationContext);  //LD listening to shared context

	//LD need a state because every time switch login<=>signup react has to refresh/reload the form
  const [isLoginMode, setIsLoginMode] = useState(true);//LD initially set in login mode
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState();
  
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
    false
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
    console.log('LD -> INIZIO 001');

    setIsLoading(true); //REACT updates straight away with the spinner because 
    //detect that the below actions are async and there will be some time gap, 
    //so cannot group events and then update the page ones

    if (isLoginMode) { //LOGIN
      try {
        console.log('LD -> LOGIN MODE 001');
        const response = await fetch('http://localhost:3001/api/users/authenticate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        });
        const responseData = await response.json();

        //LD claim success only ig getting a 200 
        if (!response.ok){
          //we have a 400 or 500
          throw new Error(responseData.error);
          //the CATCH block should be triggered
        }

        setIsLoading(false);
        console.log("--> LD returned AUTHENTICATION TOKEN" + responseData.token);

        auth.token = responseData.token;
        console.log("--> LD CONTEXT TOKEN" + auth.token);

        auth.login();
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err.message || 'Something went wrong with LOGIN, PLease try again');
      }
    } 
    else { //SIGNUP
      try {
        console.log('LD -> INIZIO');
        setIsLoading(true); //REACT updates straight away with the spinner because 
        //detect that the below actions are async and there will be some time gap, 
        //so cannot group events and then update the page ones

        const response = await fetch('http://localhost:3001/api/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        });

        const responseData = await response.json();

        //LD claim success only ig getting a 200 
        if (!response.ok){
          //we have a 400 or 500
          throw new Error(responseData.error);
          //the CATCH block should be triggered
        }


        setIsLoading(false);
        auth.login();
        auth.token = responseData.token;
        console.log("--> LD CONTEXT TOKEN after SIGNUP " + auth.token);
        console.log("--> LD NEW USER DATA below ");
        console.log(responseData);

      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError(err.message || 'Something went wrong, PLease try again');
    
      }
    }

  };


  const errorHandler = () => {
    setError(null);
  };


  return (
    <React.Fragment>
    <ErrorModal error={error} onClear={errorHandler} />
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
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password, at least 5 characters."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </Button>
    </UserBox>
  </React.Fragment>
  );
};

export default Authenticate;