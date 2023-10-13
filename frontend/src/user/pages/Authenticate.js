import React from 'react';
import Input from '../../shared/components/FormComponents/Input';

import './Authenticate.css';

const Authenticate = () => {

	return (

		<form className="auth-form" >
			<Input
				id="email"
				element="input"
				type="text"
				label="Email"
				errorText="Please enter a valid Email."
			/>
	   </form>

	);
};



export default Authenticate;