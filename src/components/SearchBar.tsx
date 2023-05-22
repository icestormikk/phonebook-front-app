import React from 'react';
import {BiSearchAlt} from "react-icons/bi";

interface SearchBarProps<T> {
    /**
     * Search bar title
     */
    fieldTitle: string,
    /**
     * The function of filtering the list based on the value
     * entered the search bar
     * @param value the value from the search bar
     */
    onSearch: (value: string) => void
}

/**
 * A component that represents a search bar. Allows you to filter the list based
 * on string values of fields
 * @param props
 * @constructor
 */
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
                defaultValue=""
            />
        </div>
    );
}

export default SearchBar;