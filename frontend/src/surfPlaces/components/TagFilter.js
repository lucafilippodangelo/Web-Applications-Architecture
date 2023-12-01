import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React from "react";

const TagFilter = props => {


    return (

        <Autocomplete
            sx={{mb: 3}}
            fullWidth={true}
            multiple
            options={props.tags}
            inputValue={props.tagFilterInput}
            onChange={(_, value) => { props.setSelectedTags(value)}}
            value={undefined}
            onInputChange={(_, value) => props.setTagFilterInput(value)}
            renderInput={(params) => {
                return <TextField label='Tags' {...params} />;
            }}
        />

    );
}

export default TagFilter;