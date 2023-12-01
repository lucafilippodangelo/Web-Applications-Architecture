import React from 'react';
import UserItem from './UserItem';
import Grid from '@mui/material/Unstable_Grid2/Grid2';


function SearchList({filteredList}) {

    const colorGenerator = function* (){

        const colors = ['#1976d2', '#7B1FA2', '#388E3C', '#FBC02D', '#D50000'];
        let index = Math.floor(Math.random() * 5);

        while (true){

            yield colors[index];
            index = index + 1 > colors.length - 1 ? 0 : index + 1;

        }

    }()

    return (
        <Grid container spacing={2}>
            {filteredList.map(user => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <UserItem
                        id={user.id}
                        image={'https://www.kgelite.ie/wp-content/uploads/2021/06/TU-Dublin-300x300.png'}
                        name={user.name}
                        placeCount={user.places}
                        color={colorGenerator.next().value}
                    />
                </Grid>
            ))}
        </Grid>
    );
}


export default SearchList;

//this to map the input to a list of "UserItem"