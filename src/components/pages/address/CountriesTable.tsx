import React from 'react';
import EntityTable from "../../EntityTable";
import {addCountry, fetchAllCountries, removeCountryById, updateCountry} from "../../../axios/countriesQueries";

/**
 * Component for displaying information about objects of the Country class
 * @constructor
 */
function CountriesTable() {
    return (
        <EntityTable
            title="Информация о странах"
            onFetch={fetchAllCountries}
            onDelete={removeCountryById}
            onAdd={async (event) => {
                const target = event.target as typeof event.target & {
                    title: {value: string}
                }

                await addCountry(target.title.value)
            }}
            onEdit={async (event) => {
                const target = event.target as typeof event.target & {
                    id: {value: number}
                    title: {value: string},
                }

                await updateCountry(target.id.value, target.title.value)
            }}
            inputFields={(source: any) => [
                <input type="text" name="title" id="title" placeholder="Название" defaultValue={source?.title}/>
            ]}
            searchableFieldTitles={["title"]}
        />
    );
}

export default CountriesTable;