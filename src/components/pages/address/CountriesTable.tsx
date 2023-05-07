import React from 'react';
import EntityTable from "../../EntityTable";
import {addCountry, fetchAllCountries, removeCountryById} from "../../../axios/countriesQueries";

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
            inputFields={[
                <input type="text" name="title" id="title" placeholder="Название"/>
            ]}
        />
    );
}

export default CountriesTable;