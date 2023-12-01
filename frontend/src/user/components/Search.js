import './Search.css';
import React, {useState} from 'react';
import SearchList from './SearchList';
import {Container} from "@mui/material";
import TextField from "@mui/material/TextField";

function Search({details}) {

    const [searchField, setSearchField] = useState("");


    const filteredList = details.items.filter((po) => {
        return po.name.toLowerCase().includes(searchField.trim().toLowerCase());
    });


    const handleChange = e => {
        setSearchField(e.target.value);
    };

    function searchList() {
        return (
            // <Scroll>
            <SearchList filteredList={filteredList}/>
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
                    label={"Search Surfers"}
                    fullWidth={true}
                    name={"search"}
                    type={"text"}
                    sx={{mb: 3}}
                />

                {searchList()}

            </Container>


        </>
    );
}

export default Search;

//LD RESOURCE -> https://medium.com/geekculture/create-a-simple-search-component-in-react-js-using-react-hooks-710c1dfe8b58