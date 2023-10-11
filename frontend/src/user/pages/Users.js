import React from 'react';

//LD going to nest this structure users page -> User list -> user item
import UsersList from '../components/UsersList'


const Users = () => {
//     return <h2> surfing users </h2>
// }
    const SURFERS = [
      {
        id: 'u1',
        name: 'Luca',
        image:
          'this should be a link to a repo with an image. Will be probbaly saved in DB in a second time. Not sure at the moment',
        places: 3 //number of visited places for this specific surfer
      },
      {
        id: 'u2',
        name: 'Dylan',
        image:
          'an image',
        places: 33 
      },
      {
        id: 'u3',
        name: 'Diana',
        image:
          'an image',
        places: 1 
      }
    ];

    return <UsersList items={SURFERS} />; //LD passing this dummy list down to props "items"
  };

export default Users;