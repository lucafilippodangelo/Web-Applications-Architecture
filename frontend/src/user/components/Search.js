
import './Search.css';
import React, { useState } from 'react';
import SearchList from './SearchList';

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
    <section>
      <div class="topnav">
        <input 
                    type = "search" 
                    aria-label="Search"
                    placeholder = "Search Surf Place Name.." 
                    onChange = {handleChange}
                  />
      </div>


      {searchList()}
    </section>
  );
}

export default Search;

//LD RESOURCE -> https://medium.com/geekculture/create-a-simple-search-component-in-react-js-using-react-hooks-710c1dfe8b58