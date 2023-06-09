import React from 'react';
import EntityTable from "../EntityTable";
import {
    addAddress,
    fetchAllAddresses,
    fetchAllAddressesWithTitles,
    removeAddressById, updateAddress
} from "../../axios/addressesQueries";
import {fetchAllCountries} from "../../axios/countriesQueries";
import {fetchAllStreets} from "../../axios/streetsQueries";
import {fetchAllCities} from "../../axios/citiesQueries";

/**
 * Component for displaying information about objects of the Address class
 * @constructor
 */
function AddressesTable() {
    const [countries, setCountries] = React.useState<Array<any>>([])
    const [cities, setCities] = React.useState<Array<any>>([])
    const [streets, setStreets] = React.useState<Array<any>>([])
    const [viewMode, setViewMode] = React.useState<"id"|"title">("id")

    const fetchCountries = async () => {
        fetchAllCountries()
            .then((res) => {
                setCountries(res.data)
            })
    }

    const fetchCities = async () => {
        fetchAllCities()
            .then((res) => {
                setCities(res.data)
            })
    }

    const fetchStreets = async () => {
        fetchAllStreets()
            .then((res) => {
                setStreets(res.data)
            })
    }

    React.useEffect(
        () => {
            fetchCountries()
                .then(() => {})
            fetchCities()
                .then(() => {})
            fetchStreets()
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
                    onClick={() => setViewMode("title")}
                    className={viewMode === "title" ? "selected" : ""}
                >
                    Показывать названия
                </button>
            </div>
            <EntityTable
                title="Информация об адресах"
                onFetch={viewMode === "id" ? fetchAllAddresses : fetchAllAddressesWithTitles}
                onDelete={removeAddressById}
                inputFields={(source) => [
                    <label htmlFor="countryID">
                        Страна:
                        <select name="countryID" id="countryID" required defaultValue={source?.countryID}>
                            {
                                countries.map((country, index) => (
                                    <option key={index} value={country.id}>{country.title}</option>
                                ))
                            }
                        </select>
                    </label>,
                    <label htmlFor="cityID">
                        Город:
                        <select name="cityID" id="cityID" required defaultValue={source?.cityID}>
                            {
                                cities.map((country, index) => (
                                    <option key={index} value={country.id}>{country.title}</option>
                                ))
                            }
                        </select>
                    </label>,
                    <label htmlFor="streetID">
                        Улица:
                        <select name="streetID" id="streetID" required defaultValue={source?.streetID}>
                            {
                                streets.map((country, index) => (
                                    <option key={index} value={country.id}>{country.title}</option>
                                ))
                            }
                        </select>
                    </label>,
                    <input
                        type="number" name="houseNumber" id="houseNumber"
                        placeholder="Номер дома"
                        min={1} step={1} required
                        defaultValue={source?.houseNumber}
                    />,
                    <input
                        type="number" name="flatNumber" id="flatNumber"
                        placeholder="Номер квартиры (необ.)"
                        min={1} step={1}
                        defaultValue={source?.flatNumber}
                    />
                ]}
                onAdd={async (event) => {
                    const target = event.target as typeof event.target & {
                        countryID: {value: number},
                        cityID: {value: number},
                        streetID: {value: number},
                        houseNumber: {value: number},
                        flatNumber: {value: number},
                    }

                    if (target.countryID.value === undefined || target.cityID.value === undefined || target.streetID.value === undefined) {
                        return
                    }

                    await addAddress(
                        target.countryID.value,
                        target.cityID.value,
                        target.streetID.value,
                        target.houseNumber.value,
                        target.flatNumber.value
                    )
                }}
                onEdit={async (event) => {
                    const target = event.target as typeof event.target & {
                        id: {value: number},
                        countryID: {value: number},
                        cityID: {value: number},
                        streetID: {value: number},
                        houseNumber: {value: number},
                        flatNumber: {value: number},
                    }

                    if (target.countryID.value === undefined || target.cityID.value === undefined || target.streetID.value === undefined) {
                        return
                    }

                    await updateAddress(
                        target.id.value,
                        target.countryID.value,
                        target.cityID.value,
                        target.streetID.value,
                        target.houseNumber.value,
                        target.flatNumber.value
                    )
                }}
                searchableFieldTitles={[]}
            />
        </div>
    );
}

export default AddressesTable;