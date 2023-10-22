import React, { useState, useContext } from 'react';

import UserBox from '../../shared/components/UI/UserBox';
import Input from '../../shared/components/FormComponents/Input';
import Button from '../../shared/components/FormComponents/Button';
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

  const authSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);

    //LD this will call the login function that I have in "App.Js". The function
    // will call update of a state that then will cause the re-rendering
    auth.login(); 
  };

  return (
    <UserBox className="auth">
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
		{/* //LD conditional */}
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
  );
};

export default Authenticate;