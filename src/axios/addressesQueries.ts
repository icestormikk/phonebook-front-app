import {axiosInstance} from "./index";

const ADDRESSES_URL = '/addresses';

export async function fetchAllAddresses() {
    return await axiosInstance.get(ADDRESSES_URL)
}

export async function fetchAllAddressesWithTitles() {
    return await axiosInstance.get(ADDRESSES_URL, {params: {withTitles: true}})
}

export async function removeAddressById(id: number) {
    return await axiosInstance.delete(ADDRESSES_URL, {params: {id}})
}

export async function addAddress(
    countryID: number, cityID: number, streetID: number, houseNumber?: number, flatNumber?: number
) {
    return await axiosInstance.post(
        ADDRESSES_URL,
        {countryID, cityID, streetID, houseNumber, flatNumber}
    )
}
