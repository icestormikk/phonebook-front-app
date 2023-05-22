import React from 'react';
import EntityTable from "../../EntityTable";
import {
    addCity,
    fetchAllCities,
    fetchAllCitiesWithTitles,
    removeCityById,
    updateCity
} from "../../../axios/citiesQueries";
import {fetchAllCountries} from "../../../axios/countriesQueries";

/**
 * Component for displaying information about objects of the City class
 * @constructor
 */
function CitiesTable() {
    const [countries, setCountries] = React.useState<Array<any>>([])
    const [viewMode, setViewMode] = React.useState<"titles"|"ids">("ids")

    const fetchCountries = async () => {
        const response = await fetchAllCountries()
        setCountries(response.data)
    }

    React.useEffect(
        () => {
            fetchCountries()
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
                    onClick={() => setViewMode("ids")}
                    className={viewMode === "ids" ? "selected" : ""}
                >
                    Показывать только Id
                </button>
                <button
                    type="button"
                    onClick={() => setViewMode("titles")}
                    className={viewMode === "titles" ? "selected" : ""}
                >
                    Показывать названия
                </button>
            </div>
            <EntityTable
                title="Информация о городах"
                onFetch={viewMode === "ids" ? fetchAllCities : fetchAllCitiesWithTitles}
                onDelete={removeCityById}
                onAdd={async (event) => {
                    const target = event.target as typeof event.target & {
                        title: {value: string},
                        countryId: {value: number}
                    }

                    await addCity(target.title.value, target.countryId.value)
                }}
                onEdit={async (event) => {
                    const target = event.target as typeof event.target & {
                        id: {value: number}
                        title: {value: string},
                        countryId: {value: number}
                    }
                    console.log(target.countryId)

                    await updateCity(target.id.value, target.title.value, target.countryId.value)
                }}
                inputFields={(source) => [
                    <label htmlFor="countryId">
                        Страна, в которую добавляется город:
                        <select name="countryId" id="countryId" required defaultValue={source?.countryID}>
                            {
                                countries.map((country, index) => (
                                    <option key={index} value={country.id}>{country.title}</option>
                                ))
                            }
                        </select>
                    </label>,
                    <input type="text" name="title" id="title" placeholder="Название" required defaultValue={source?.title}/>
                ]}
                searchableFieldTitles={["title"]}
            />
        </div>
    );
}

export default CitiesTable;