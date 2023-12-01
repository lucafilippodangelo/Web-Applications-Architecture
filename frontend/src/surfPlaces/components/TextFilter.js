import TextField from "@mui/material/TextField";
import React from "react";

const TextFilter = props => {

    return (

        <TextField
            sx={{mb: 3}}
            label={"Search"}
            value={props.textFilter}
            onChange={e => props.setTextFilter(e.target.value)}
            fullWidth={true}/>

    )

}

export default TextFilter;