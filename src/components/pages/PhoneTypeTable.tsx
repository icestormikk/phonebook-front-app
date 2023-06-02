import React from 'react';
import EntityTable from "../EntityTable";
import {addType, deleteTypeById, fetchAllTypes, updateType} from "../../axios/phoneTypeQueries";

function PhoneTypeTable() {
    return (
        <EntityTable
            title="Информация о типах телефонов"
            onFetch={fetchAllTypes}
            onDelete={deleteTypeById}
            onAdd={async (event) => {
                const target = event.target as typeof event.target & {
                    title: {value: string}
                }

                await addType(target.title.value)
            }}
            onEdit={async (event) => {
                const target = event.target as typeof event.target & {
                    id: {value: number},
                    title: {value: string}
                }

                await updateType(target.id.value, target.title.value)
            }}
            inputFields={(source) => [
                <input type="text" name="title" id="title" placeholder="Введите название типа телефона" defaultValue={source?.title}/>
            ]}
            searchableFieldTitles={['title']}
        />
    );
}

export default PhoneTypeTable;