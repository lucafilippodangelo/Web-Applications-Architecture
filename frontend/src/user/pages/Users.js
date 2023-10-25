import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UI/ErrorM';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';

//LD NOTE -> send a request any time the page load 
const Users = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();

  //LD useEffect
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3001/api/users', {
          mode:'cors',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json' }
        });
        //LD do not need to add "HEADERS" because not sending to the server anything in input so no body to attach.
        const responseData = await response.json();

        console.log("-- LD LIST OF USERS below ");
        console.log(responseData);

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setLoadedUsers(responseData);
        
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []); 
  // LD if dependencies "[]" empty, the code inside the useEffect "{}"will run only once.
  // NOTE doing the above I avoid to run fetch any time something change in user page.

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center"> 
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );

};

export default Users;