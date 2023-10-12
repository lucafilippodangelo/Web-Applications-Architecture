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
          'https://www.kgelite.ie/wp-content/uploads/2021/06/TU-Dublin-300x300.png',
        places: 3 //number of visited places for this specific surfer
      },
      {
        id: 'u2',
        name: 'Dylan',
        image:
          'https://www.kgelite.ie/wp-content/uploads/2021/06/TU-Dublin-300x300.png',
        places: 33 
      },
      {
        id: 'u3',
        name: 'Diana',
        image:
          'https://www.kgelite.ie/wp-content/uploads/2021/06/TU-Dublin-300x300.png',
        places: 1 
      },
      {
        id: 'u4',
        name: 'a surfer',
        image:
          'https://www.kgelite.ie/wp-content/uploads/2021/06/TU-Dublin-300x300.png',
        places: 4
      },
      {
        id: 'u5',
        name: 'a surfer 2',
        image:
          'https://www.kgelite.ie/wp-content/uploads/2021/06/TU-Dublin-300x300.png',
        places: 4
      },
      {
        id: 'u6',
        name: 'a surfer 3',
        image:
          'https://www.kgelite.ie/wp-content/uploads/2021/06/TU-Dublin-300x300.png',
        places: 4
      },
      {
        id: 'u7',
        name: 'a surfer 4',
        image:
          'https://www.kgelite.ie/wp-content/uploads/2021/06/TU-Dublin-300x300.png',
        places: 4
      }
    ];

    return <UsersList items={SURFERS} />; //LD passing this dummy list down to props "items"
  };

export default Users;