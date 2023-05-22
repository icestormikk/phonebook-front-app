import {axiosInstance} from "./index";

const CITIES_URL = '/cities';

export async function fetchAllCities() {
    return await axiosInstance.get(CITIES_URL)
}

export async function fetchAllCitiesWithTitles() {
    return await axiosInstance.get(CITIES_URL, {params: {withTitles: true}})
}

export async function removeCityById(id: number) {
    return await axiosInstance.delete(CITIES_URL, {params: {id}})
}

export async function addCity(title: string, countryID: number) {
    return await axiosInstance.post(CITIES_URL, {title, countryID})
}

export async function updateCity(id: number, title: string, countryID: number) {
    return await axiosInstance.put(CITIES_URL, {id, title, countryID})
}