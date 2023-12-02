import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {useState} from "react";

const SortSelect = props => {

    const options = [
        {
            label: "Name ASC",
            func: () => (a, b) => a.name.localeCompare(b.name)
        },
        {
            label: "Name DESC",
            func: () => (a, b) => b.name.localeCompare(a.name)
        },
        {
            label: "Description ASC",
            func: () => (a, b) => a.description.localeCompare(b.description)
        },
        {
            label: "Description DESC",
            func: () => (a, b) => b.description.localeCompare(a.description)
        },
        {
            label: "Address ASC",
            func: () => (a, b) => a.address.localeCompare(b.address)
        },
        {
            label: "Address DESC",
            func: () => (a, b) => b.address.localeCompare(a.address)
        },
    ];

    const [sortValue, setSortValue] = useState(options[0]);

    const onSortChange = e => {

        const option = options.find(o => o.label === e.target.value)
        props.onSortSelected(option);
        setSortValue(option);

    }

    return (
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sortValue.label}
                label="Sort"
                onChange={onSortChange}
            >
                {options.map(o =>
                    <MenuItem key={o.label} value={o.label}>{o.label}</MenuItem>
                )}
            </Select>
        </FormControl>
    )

}

export default SortSelect;