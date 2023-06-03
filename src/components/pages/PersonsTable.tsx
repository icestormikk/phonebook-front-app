import React, {FormEvent, useRef} from 'react';
import EntityTable from "../EntityTable";
import {
    addPerson,
    deletePersonById,
    fetchAllPersons, fetchAllPersonsWithTitles,
    fetchPersonByPhone,
    setAvatar,
    updatePerson
} from "../../axios/personQueries";
import {fetchAllCategories} from "../../axios/categoryQueries";
import {fetchAllAddressesWithTitles} from "../../axios/addressesQueries";

/**
 * Component for displaying information about objects of the Person class
 * @constructor
 */
function PersonsTable() {
    const [categories, setCategories] = React.useState<Array<any>>([])
    const [addresses, setAddresses] = React.useState<Array<any>>([])
    const [viewMode, setViewMode] = React.useState<"id"|"title">("id")
    const ref = useRef<HTMLInputElement>()

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
                    onClick={() => setViewMode("title")}
                    className={viewMode === "title" ? "selected" : ""}
                >
                    Показывать названия
                </button>
            </div>
            <EntityTable
                title="Информация о пользователях"
                onFetch={viewMode === "id" ? fetchAllPersons : fetchAllPersonsWithTitles}
                onDelete={deletePersonById}
                onAdd={async (event: FormEvent<HTMLFormElement>) => {
                    if (!ref.current?.files) { return }

                    const target = event.target as typeof event.target & {
                        name: {value: string},
                        surname: {value: string},
                        patronymic: {value: string},
                        email: {value: string},
                        isqId: {value: string},
                        avatar: {value: any},
                        addressId: {value: number},
                        categoryId: {value: number}
                    }
                    const data = new FormData()
                    const file = ref.current?.files[0]
                    data.append('avatar', file)

                    await addPerson(
                        target.name.value, target.surname.value, target.patronymic.value,
                        target.email.value, target.isqId.value, target.addressId.value,
                        target.categoryId.value
                    ).then(async (res) => {
                        if (file) {
                            await setAvatar(data, res.data.id)
                        }
                    })
                }}
                onEdit={async (event: FormEvent<HTMLFormElement>) => {
                    if (!ref.current?.files) { return }

                    const target = event.target as typeof event.target & {
                        id: {value: number},
                        name: {value: string},
                        surname: {value: string},
                        patronymic: {value: string},
                        email: {value: string},
                        isqId: {value: string},
                        avatar: {value: any},
                        addressID: {value: number},
                        categoryID: {value: number}
                    }
                    const data = new FormData()
                    const file = ref.current?.files[0]
                    data.append('avatar', file)

                    updatePerson(
                        target.id.value, target.name.value, target.surname.value,
                        target.patronymic.value, target.email.value, target.isqId.value,
                        target.addressID.value, target.categoryID.value
                    ).then(async (res) => {
                        if (file) {
                            await setAvatar(data, res.data.id)
                        }
                    })
                }}
                onSearch={async (event: FormEvent<HTMLFormElement>) => {
                    const target = event.target as typeof event.target & {
                        phone: {value: string}
                    }

                    if (target.phone.value.length === 0) {
                        return await fetchAllPersons()
                    }

                    return await fetchPersonByPhone(target.phone.value)
                }}
                updateFormFields={[
                    <input type="tel" name="phone" id="phone" placeholder="Введите номер телефона"/>
                ]}
                inputFields={(source) => [
                    <input type="text" name="name" id="name" placeholder="Имя пользователя" required defaultValue={source?.name}/>,
                    <input type="text" name="surname" id="surname" placeholder="Фамилия" required defaultValue={source?.surname}/>,
                    <input type="text" name="patronymic" id="patronymic" placeholder="Отчество (при наличии)" defaultValue={source?.patronymic}/>,
                    <input type="email" name="email" id="email" placeholder="E-mail пользователя" required defaultValue={source?.email}/>,
                    <input type="number" name="isqId" id="isqId" placeholder="ISQ ID пользователя" defaultValue={source?.isqId}/>,
                    // @ts-ignore
                    <input ref={ref} type="file" name="avatar" id="avatar"/>,
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
                    </label>,
                ]}
                searchableFieldTitles={["name", "surname", "patronymic", "email", "isqId"]}
                specialFieldHandlers={[
                    {
                        name: "avatar",
                        handler: (value) => {
                            return <img
                                src={"http://localhost:8080/files/filename?value=" + value}
                                alt="Аватар пользователя"
                                className="w-40 h-40 rounded-full"
                            />
                        }
                    }
                ]}
            />
        </div>
    );
}

export default PersonsTable;