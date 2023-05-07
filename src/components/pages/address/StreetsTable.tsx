import React from 'react';
import EntityTable from "../../EntityTable";
import {addStreet, fetchAllStreets, removeStreetById} from "../../../axios/streetsQueries";

function StreetsTable() {
    return (
        <EntityTable
            title="Информация об улицах"
            onFetch={fetchAllStreets}
            onDelete={removeStreetById}
            onAdd={async (event) => {
                const target = event.target as typeof event.target & {
                    title: {value: string}
                }

                await addStreet(target.title.value)
            }}
            inputFields={[
                <input type="text" name="title" id="title" placeholder="Название"/>
            ]}
        />
    );
}

export default StreetsTable;