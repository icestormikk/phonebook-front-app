import React from 'react';
import EntityTable from "../../EntityTable";
import {
    addStreet,
    fetchAllStreets,
    fetchAllStreetsWithTitles,
    removeStreetById,
    updateStreet
} from "../../../axios/streetsQueries";
import {fetchAllCities} from "../../../axios/citiesQueries";

/**
 * Component for displaying information about objects of the Street class
 * @constructor
 */
function StreetsTable() {
    const [cities, setCities] = React.useState<Array<any>>([])
    const [viewMode, setViewMode] = React.useState<"titles" | "ids">("ids")

    const fetchCities = async () => {
        const response = await fetchAllCities()
        setCities(response.data)
    }

    React.useEffect(
        () => {
            fetchCities()
                .then(() => {
                })
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
                title="Информация об улицах"
                onFetch={viewMode === "ids" ? fetchAllStreets : fetchAllStreetsWithTitles}
                onDelete={removeStreetById}
                onAdd={async (event) => {
                    const target = event.target as typeof event.target & {
                        title: { value: string },
                        cityID: { value: number }
                    }

                    await addStreet(target.title.value, target.cityID.value)
                }}
                onEdit={async (event) => {
                    const target = event.target as typeof event.target & {
                        id: {value: number}
                        title: {value: string},
                        cityID: {value: number}
                    }
                    console.log(target.cityID.value)

                    await updateStreet(target.id.value, target.title.value, target.cityID.value)
                }}
                inputFields={(source) => [
                        <label htmlFor="cityID">
                            Город, в который добавляется улица:
                            <select name="cityID" id="cityID" required defaultValue={source?.cityID}>
                                {
                                    cities.map((city, index) => (
                                        <option key={index} value={city.id}>{city.title}</option>
                                    ))
                                }
                            </select>
                        </label>,
                        <input type="text" name="title" id="title" placeholder="Название" defaultValue={source?.title} required/>
                ]}
                searchableFieldTitles={["title"]}
            />
        </div>
    );
}

export default StreetsTable;