import {axiosInstance} from "./index";

const COUNTRIES_URL = '/countries';

export async function fetchAllCountries() {
    return await axiosInstance.get(COUNTRIES_URL)
}

export async function removeCountryById(id: number) {
    return await axiosInstance.delete(COUNTRIES_URL, {params: {id}})
}

export async function addCountry(title: string) {
    return await axiosInstance.post(COUNTRIES_URL, {title})
}

export async function updateCountry(id: number, title: string) {
    return await axiosInstance.put(COUNTRIES_URL, {id, title})
}