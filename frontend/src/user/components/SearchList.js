import React from 'react';
import UserItem from './UserItem';

function SearchList({ filteredList }) {
  return (
    <ul className="users-list">
    {filteredList.map(user => (
        <UserItem
        id={user.id}
        image={'https://www.kgelite.ie/wp-content/uploads/2021/06/TU-Dublin-300x300.png'}
        name={user.name}
        placeCount={user.places}
        />
    ))}
</ul>
  );
}

export default SearchList;

//this to map the input to a list of "UserItem"