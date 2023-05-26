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
import {fetchAllAddressesWithTitles} from "../../axios/addressesQueries";

/**
 * Component for displaying information about objects of the InfoBook class
 * @constructor
 */
function InfoBookTable() {
    const [persons, setPersons] = React.useState<Array<any>>([])
    const [categories, setCategories] = React.useState<Array<any>>([])
    const [addresses, setAddresses] = React.useState<Array<any>>([])
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

    const fetchAddresses = async () => {
        fetchAllAddressesWithTitles()
            .then((res) => {
                setAddresses(res.data)
            })
    }

    React.useEffect(
        () => {
            fetchPersons()
                .then(() => {})
            fetchCategories()
                .then(() => {})
            fetchAddresses()
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
                    <label htmlFor="addressID">
                        Адрес:
                        <select name="addressID" id="addressID" required defaultValue={source?.addressID}>
                            {
                                addresses.map((address, index) => (
                                    <option key={index} value={address.id}>
                                        {`${address.country}, г.${address.city}, ул.${address.street}, ` +
                                            `д.${address.houseNumber}` + (address.flatNumber ? `, кв. ${address.flatNumber}` : '')
                                        }
                                    </option>
                                ))
                            }
                        </select>
                    </label>,
                    <label htmlFor="categoryID">
                        Категория:
                        <select name="categoryID" id="categoryID" required defaultValue={source?.categoryID}>
                            {
                                categories.map((category, index) => (
                                    <option key={index} value={category.id}>
                                        {category.title}
                                    </option>
                                ))
                            }
                        </select>
                    </label>
                ]}
                onAdd={async (event) => {
                    const target = event.target as typeof event.target & {
                        phone: {value: string}, personID: {value: number}, categoryID: {value: number},
                        addressID: {value: number}
                    }

                    if (target.personID.value === undefined || target.categoryID.value === undefined || target.addressID.value === undefined) {
                        return
                    }

                    await addInfo(
                        target.phone.value, target.personID.value, target.categoryID.value, target.addressID.value
                    )
                }}
                onEdit={async (event) => {
                    const target = event.target as typeof event.target & {
                        id: {value: number}, phone: {value: string}, personID: {value: number},
                        categoryID: {value: number}, addressID: {value: number}
                    }

                    if (target.personID.value === undefined || target.categoryID.value === undefined || target.addressID.value === undefined) {
                        return
                    }

                    await updateInfoEntity(
                        target.id.value, target.phone.value, target.personID.value, target.categoryID.value, target.addressID.value
                    )
                }}
                onSearch={async (event) => {
                    const target = event.target as typeof event.target & {
                        name: {value: string},
                        surname: {value: string},
                        patronymic: {value: string},
                        category: {value: string}
                    }
                    const isEmpty = target.name.value.length + target.surname.value.length
                        + target.patronymic.value.length === 0

                    if (isEmpty) {
                        return await fetchAllInfos()
                    }

                    return await fetchInfosByInitials(
                        target.name.value, target.surname.value, target.patronymic.value, target.category.value
                    )
                }}
                updateFormFields={[
                    <input type="text" name="name" id="name" placeholder="Введите имя"/>,
                    <input type="text" name="surname" id="surname" placeholder="Введите фамилию"/>,
                    <input type="text" name="patronymic" id="patronymic" placeholder="Введите отчество"/>,
                    <select name="category" id="category">
                        {
                            categories.map((category, index) => (
                                <option value={category.title} key={index}>{category.title}</option>
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