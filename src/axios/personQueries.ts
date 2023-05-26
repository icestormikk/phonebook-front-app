import {axiosInstance} from "./index";

const PERSONS_URL = '/persons';

export async function fetchAllPersons() {
    return await axiosInstance.get<Array<any>>(PERSONS_URL)
}

export async function fetchPersonByPhone(phone: string) {
    return await axiosInstance.get(PERSONS_URL + '/phone', {params: {value: phone}})
}

export async function deletePersonById(id: number) {
    return await axiosInstance.delete(PERSONS_URL, {params: {id}})
}

export async function addPerson(name: string, surname: string, patronymic: string, email: string, isqId: string) {
    return await axiosInstance.post(
        PERSONS_URL,
        {
            name, surname, patronymic, email, isqId
        }
    )
}

export async function updatePerson(
    id: number, name: string, surname: string, patronymic: string, email: string, isqId: string
) {
    return await axiosInstance.put(
        PERSONS_URL,
        {
            id, name, surname, patronymic, email, isqId
        }
    )
}

export async function setAvatar(avatar: FormData, id: number) {
    return await axiosInstance.post(PERSONS_URL + '/avatar', avatar, {params: {id}, headers: {"Content-Type": "multipart/form-data"}})
}
