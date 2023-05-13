import React from 'react';
import {BiSearchAlt} from "react-icons/bi";

interface SearchBarProps<T> {
    fieldTitle: string,
    onSearch: (value: string) => void
}

function SearchBar(props: SearchBarProps<any>) {
    return (
        <div className="flex flex-row w-full bordered rounded-md bg-white overflow-hidden">
            <div className="centered p-2 bg-gray-100 w-min text-2xl">
                <BiSearchAlt/>
            </div>
            <input
                type="text"
                name="query"
                id="query"
                className="w-full"
                onChange={(event) => {
                    const value = event.target.value
                    props.onSearch(value)
                }}
            />
        </div>
    );
}

export default SearchBar;