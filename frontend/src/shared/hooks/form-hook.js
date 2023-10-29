//LD when in this hook I do something that updates its state then the component using it get re-rendered.
// =====================================================
// Build your own React hooks (https://reactjs.org/docs/hooks-custom.html).
// This allows you to encapsulate and share stateful component logic.
// =====================================================

//GOAL is to hold all the user logic that was is in "NewSurfPlace.js"
import { useCallback, useReducer } from 'react';

//LD (STEP TWO)
//cut and pasting the "formReducer" from "NewSurfPlace.js". I can look at 
//"NewSurfPlace_BeforeHook" to see how it was before creating "form-hook.js" 
// NOTE -> THIS CREATE A NEW REACT STATE ANY TIME IT IS EXECUTED 
const formReducer = (state, action) => {
    switch (action.type) {
      case 'INPUT_CHANGE':
        console.log("LD IN INPUT BLOCK");
        let formIsValid = true;
        //go through all the inputs to verify if they are valid. first time it gets executed this for loops the default state
        for (const inputId in state.inputs) {
          console.log("LD IN INPUT BLOCK LOOPING");
          if(!state.inputs[inputId]){
            continue;
          }
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
        case 'SET_DATA':
          console.log("reducer SET_DATA");
          console.log(action.inputs);
            return {
              inputs: action.inputs,
              isValid: action.formIsValid
            };
      default:
        return state;
    }
  };


//LD (STEP ONE)
// this is the custom hook. Have to EXPORT and the name has to start with "use"(In this case "useForm")
export const useForm = (initialInputs, initialFormValidity) => {
  //LD (STEP THREE)
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity
  });

  //LD (STEP FOUR)
  // cut the "inputHandler" from "NewSurfPlace.js" and paste inside the hook function
  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, []);

  //LD new action, dispatch against our reducer.
  //the reference to the action is returned so in cese needed can be invoched
  const setFormData = useCallback((inputData, formValidity) => {
    console.log("LD form-hook.js, FORM INPUT DATA -> ");
    console.log(inputData);
    dispatch({
      type: 'SET_DATA',
      inputs: inputData,
      formIsValid: formValidity
    });
  }, []);


  //LD (STEP FIVE)
  // I want to return a pointer to "inputHandler" in order to call it. 
  // Then I want to return the form state
  return [formState, inputHandler, setFormData]; //LD returning the form state and an handler to the hunction "inoutHandler"
};
//EXPORT END