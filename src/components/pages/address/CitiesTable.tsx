import React from 'react';
import EntityTable from "../../EntityTable";
import {addCity, fetchAllCities, removeCityById} from "../../../axios/citiesQueries";

function CitiesTable() {
    return (
        <EntityTable
            title="Информация о городах"
            onFetch={fetchAllCities}
            onDelete={removeCityById}
            onAdd={async (event) => {
                const target = event.target as typeof event.target & {
                    title: {value: string}
                }

                await addCity(target.title.value)
            }}
            inputFields={[
                <input type="text" name="title" id="title" placeholder="Название"/>
            ]}
            searchableFieldTitles={["title"]}
        />
    );
}

export default CitiesTable;