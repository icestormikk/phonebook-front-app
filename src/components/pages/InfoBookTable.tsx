import React from 'react';
import EntityTable from "../EntityTable";
import {
    addInfo,
    fetchAllInfos,
    fetchAllInfosWithMoreInfo, fetchInfosByInitials,
    removeInfoById,
    updateInfoEntity
} from "../../axios/infoBookQueries";
import {fetchAllPersons} from "../../axios/personQueries";
import {fetchAllCategories} from "../../axios/categoryQueries";
import {fetchAllTypes} from "../../axios/phoneTypeQueries";

/**
 * Component for displaying information about objects of the InfoBook class
 * @constructor
 */
function InfoBookTable() {
    const [persons, setPersons] = React.useState<Array<any>>([])
    const [categories, setCategories] = React.useState<Array<any>>([])
    const [phoneTypes, setPhoneTypes] = React.useState<Array<any>>([])
    const [viewMode, setViewMode] = React.useState<"id"|"all">("id")

    const fetchPersons = async () => {
        fetchAllPersons()
            .then((res) => {
                setPersons(res.data)
            })
    }

    const fetchCategories = async () => {
        fetchAllCategories()
            .then((res) => {
                setCategories(res.data)
            })
    }

    const fetchPhoneTypes = async () => {
        fetchAllTypes()
            .then((res) => {
                setPhoneTypes(res.data)
            })
    }

    React.useEffect(
        () => {
            fetchPersons()
                .then(() => {})
            fetchCategories()
                .then(() => {})
            fetchPhoneTypes()
                .then(() => {})
        },
        []
    )

    return (
        <div className="centered flex-col">
            <b>РЕЖИМЫ ОТОБРАЖЕНИЯ</b>
            <div className="view-table-mode">
                <button
                    type="button"
                    onClick={() => setViewMode("id")}
                    className={viewMode === "id" ? "selected" : ""}
                >
                    Показывать только Id
                </button>
                <button
                    type="button"
                    onClick={() => setViewMode("all")}
                    className={viewMode === "all" ? "selected" : ""}
                >
                    Показывать подробную информацию
                </button>
            </div>
            <EntityTable
                title="Телефонная книга"
                onFetch={viewMode === "id" ? fetchAllInfos : fetchAllInfosWithMoreInfo}
                onDelete={removeInfoById}
                inputFields={(source) => [
                    <input type="tel" name="phone" id="phone" placeholder="Номер телефона" required defaultValue={source?.phoneNumber}/>,
                    <label htmlFor="personID">
                        Пользователь:
                        <select name="personID" id="personID" required defaultValue={source?.personID}>
                            {
                                persons.map((person, index) => (
                                    <option key={index} value={person.id}>
                                        {`${person.surname} ${person.name} ` + (person.patronymic ? person.patronymic : "")}
                                    </option>
                                ))
                            }
                        </select>
                    </label>,
                    <label htmlFor="phoneTypeID">
                        Тип номера:
                        <select name="phoneTypeID" id="phoneTypeID" required defaultValue={source?.phoneType}>
                            {
                                phoneTypes.map((type, index) => (
                                    <option key={index} value={type.id}>
                                        {type.title}
                                    </option>
                                ))
                            }
                        </select>
                    </label>
                ]}
                onAdd={async (event) => {
                    const target = event.target as typeof event.target & {
                        phone: {value: string}, personID: {value: number}, phoneTypeID: {value: number}
                    }

                    if (target.personID.value === undefined) {
                        return
                    }

                    await addInfo(
                        target.phone.value, target.personID.value, target.phoneTypeID.value
                    )
                }}
                onEdit={async (event) => {
                    const target = event.target as typeof event.target & {
                        id: {value: number}, phone: {value: string}, personID: {value: number}, phoneTypeID: {value: number}
                    }

                    if (target.personID.value === undefined) {
                        return
                    }

                    await updateInfoEntity(
                        target.id.value, target.phone.value, target.personID.value, target.phoneTypeID.value
                    )
                }}
                onSearch={async (event) => {
                    const target = event.target as typeof event.target & {
                        name: {value: string},
                        surname: {value: string},
                        patronymic: {value: string},
                        categoryId: {value: number}
                    }
                    const isEmpty = target.name.value.length + target.surname.value.length
                        + target.patronymic.value.length === 0

                    if (isEmpty) {
                        return await fetchAllInfos()
                    }

                    return await fetchInfosByInitials(
                        target.name.value, target.surname.value, target.patronymic.value, target.categoryId.value
                    )
                }}
                updateFormFields={[
                    <input type="text" name="name" id="name" placeholder="Введите имя"/>,
                    <input type="text" name="surname" id="surname" placeholder="Введите фамилию"/>,
                    <input type="text" name="patronymic" id="patronymic" placeholder="Введите отчество"/>,
                    <select name="categoryId" id="categoryId">
                        {
                            categories.map((category, index) => (
                                <option value={category.id} key={index}>{category.title}</option>
                            ))
                        }
                    </select>
                ]}
                searchableFieldTitles={["phoneNumber"]}
            />
        </div>
    );
}

export default InfoBookTable;