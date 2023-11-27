import React from 'react';
import UserItem from './UserItem';
import Grid from '@mui/material/Unstable_Grid2/Grid2';

function SearchList({ filteredList }) {
  return (
    <Grid container spacing={2}>
      {filteredList.map(user => (
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <UserItem
            id={user.id}
            image={'https://www.kgelite.ie/wp-content/uploads/2021/06/TU-Dublin-300x300.png'}
            name={user.name}
            placeCount={user.places}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default SearchList;

//this to map the input to a list of "UserItem"