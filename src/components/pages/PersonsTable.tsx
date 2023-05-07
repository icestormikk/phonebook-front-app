import React, {FormEvent} from 'react';
import EntityTable from "../EntityTable";
import {addPerson, deletePersonById, fetchAllPersons} from "../../axios/personQueries";

function PersonsTable() {
    return (
        <EntityTable
            title="Информация о пользователях"
            onFetch={fetchAllPersons}
            onDelete={deletePersonById}
            onAdd={async (event: FormEvent<HTMLFormElement>) => {
                const target = event.target as typeof event.target & {
                    name: {value: string},
                    surname: {value: string},
                    patronymic: {value: string}
                }
                await addPerson(
                    target.name.value, target.surname.value, target.patronymic.value
                )
            }}
            inputFields={[
                <input type="text" name="name" id="name" placeholder="Имя пользователя"/>,
                <input type="text" name="surname" id="surname" placeholder="Фамилия"/>,
                <input type="text" name="patronymic" id="patronymic" placeholder="Отчество (при наличии)"/>
            ]}
        />
    );
}

export default PersonsTable;