import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import ErrorModal from '../../shared/components/UI/ErrorM';
import LoadingSpinner from '../../shared/components/UI/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

//LD NOTE -> send a request any time the page load 
const Users = () => {

  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  //LD useEffect
  useEffect(() => {
    const fetchUsers  = async () => {
      try {
        const responseData = await sendRequest(
          'http://localhost:3001/api/users'
        );
        setLoadedUsers(responseData);
        console.log(responseData);
      } catch (err) { }
    };
    fetchUsers ();
  }, [sendRequest]); // LD "sendRequest" is now coming outside the "useEffect" that's why this is a dependency now

  
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
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