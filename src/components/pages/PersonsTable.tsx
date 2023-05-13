import React, {FormEvent} from 'react';
import EntityTable from "../EntityTable";
import {addPerson, deletePersonById, fetchAllPersons} from "../../axios/personQueries";
import {uploadFile} from "../../axios/filesQueries";

function PersonsTable() {
    const [selectedFile, setSelectedFile] = React.useState<any|undefined>(undefined)

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
                const data = new FormData()
                data.append('file', selectedFile)

                await addPerson(
                    target.name.value, target.surname.value, target.patronymic.value
                )
                await uploadFile(data)
            }}
            inputFields={[
                <input type="text" name="name" id="name" placeholder="Имя пользователя"/>,
                <input type="text" name="surname" id="surname" placeholder="Фамилия"/>,
                <input type="text" name="patronymic" id="patronymic" placeholder="Отчество (при наличии)"/>,
                <input type="file" name="avatar" id="avatar" onChange={(event) => setSelectedFile(event.target.value)}/>
            ]}
            searchableFieldTitles={["name", "surname", "patronymic"]}
        />
    );
}

export default PersonsTable;