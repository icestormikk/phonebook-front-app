import React from 'react';
import EntityTable from "../EntityTable";
import {addInfo, fetchAllInfos, fetchAllInfosWithMoreInfo, removeInfoById} from "../../axios/infoBookQueries";
import {fetchAllPersons} from "../../axios/personQueries";
import {fetchAllCategories} from "../../axios/categoryQueries";
import {fetchAllAddressesWithTitles} from "../../axios/addressesQueries";

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
                inputFields={[
                    <input type="tel" name="phone" id="phone" placeholder="Номер телефона" required/>,
                    <input type="email" name="email" id="email" placeholder="E-mail"/>,
                    <input type="number" name="isqID" id="isqID" placeholder="ISQ ID" pattern="/\d{9}/gm"/>,
                    <label htmlFor="personID">
                        Пользователь:
                        <select name="personID" id="personID" required>
                            {
                                persons.map((person, index) => (
                                    <option key={index} value={person.id}>
                                        {`${person.surname} ${person.name}` + (person.patronymic ? person.patronymic : "")}
                                    </option>
                                ))
                            }
                        </select>
                    </label>,
                    <label htmlFor="addressID">
                        Адрес:
                        <select name="addressID" id="addressID" required>
                            {
                                addresses.map((address, index) => (
                                    <option key={index} value={address.id}>
                                        {`${address.countryTitle}, г.${address.cityTitle}, ул.${address.streetTitle}, ` +
                                            `д.${address.houseNumber}` + (address.flatNumber ? `, кв. ${address.flatNumber}` : '')
                                        }
                                    </option>
                                ))
                            }
                        </select>
                    </label>,
                    <label htmlFor="categoryID">
                        Категория:
                        <select name="categoryID" id="categoryID" required>
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
                        phone: {value: string}, email: {value: string}, isqID: {value: number},
                        personID: {value: number}, categoryID: {value: number}, addressID: {value: number}
                    }

                    if (target.personID.value === undefined || target.categoryID.value === undefined || target.addressID.value === undefined) {
                        return
                    }

                    await addInfo(
                        target.phone.value, target.email.value, target.isqID.value,
                        target.personID.value, target.categoryID.value, target.addressID.value
                    )
                }}
                searchableFieldTitles={["phone", "email", "isqid"]}
            />
        </div>
    );
}

export default InfoBookTable;