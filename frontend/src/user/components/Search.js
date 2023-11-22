
import './Search.css';
import React, { useState } from 'react';
import SearchList from './SearchList';
import {Container} from "@mui/material";
import TextField from "@mui/material/TextField";

function Search({ details }) {

  const [searchField, setSearchField] = useState("");

console.log("DETAILS -> ");
console.log(details);

const filteredList = details.items.filter((po) => {
    return po.name.toLowerCase().includes(searchField.toLowerCase());
  });

  console.log("filteredList -> ");
  console.log(filteredList);

  const handleChange = e => {
    setSearchField(e.target.value);
  };

  function searchList() {
    return (
      // <Scroll>
        <SearchList filteredList={filteredList} />
      // </Scroll>
    );
  }

  return (
    <>

        <Container>

            <TextField
                variant={"outlined"}
                value={searchField}
                onChange={handleChange}
                label={"Search Surf Places"}
                fullWidth={true}
            />

            {searchList()}

        </Container>


    </>
  );
}

export default Search;

//LD RESOURCE -> https://medium.com/geekculture/create-a-simple-search-component-in-react-js-using-react-hooks-710c1dfe8b58