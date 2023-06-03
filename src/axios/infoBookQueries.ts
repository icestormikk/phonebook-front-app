import {axiosInstance} from "./index";

const INFOS_URL = '/infos';

export async function fetchAllInfos() {
    return await axiosInstance.get(INFOS_URL)
}

export async function fetchAllInfosWithMoreInfo() {
    return await axiosInstance.get(INFOS_URL, {params: {withMoreInfo: true}})
}

export async function fetchInfosByInitials(
    name: string, surname: string, patronymic: string, categoryId: number
) {
    return await axiosInstance.get(INFOS_URL + '/initials', {params: {name, surname, patronymic, categoryId}})
}

export async function addInfo(
    phoneNumber: string, personID: number, phoneTypeID: number
) {
    return await axiosInstance.post(
        INFOS_URL,
        {
            phoneNumber, personID, phoneTypeID
        }
    )
}

export async function removeInfoById(id: number) {
    return await axiosInstance.delete(INFOS_URL, {params: {id}})
}

export async function updateInfoEntity(
    id: number, phoneNumber: string, personID: number, phoneTypeID: number
) {
    return await axiosInstance.put(
        INFOS_URL,
        {
            id, phoneNumber, personID, phoneTypeID
        }
    )
}