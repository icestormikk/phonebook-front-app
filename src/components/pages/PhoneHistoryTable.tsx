import React from 'react';
import {fetchAllPersons} from "../../axios/personQueries";
import {fetchEntireHistory} from "../../axios/phoneHistoryQueries";
import {AiOutlineClockCircle} from "react-icons/ai";
import {ImCheckmark} from "react-icons/im";
import SearchBar from "../SearchBar";

/**
 * Component for displaying information about objects of the PhoneHistory class
 * @constructor
 */
function PhoneHistoryTable() {
    const [persons, setPersons] = React.useState<Array<any>>([])
    const [history, setHistory] = React.useState<Array<any>>([])
    const [updatedHistory, setUpdatedHistory] = React.useState<Array<any>>([...history])

    const fetchPersons = async () => {
        fetchAllPersons()
            .then((res) => {
                setPersons(res.data)
            })
    }
    const fetchHistory = async () => {
        fetchEntireHistory()
            .then((res) => {
                setHistory(res.data)
            })
    }

    const refreshHistData = React.useCallback(
        async (value: string) => {
            if (value.length === 0) {
                setUpdatedHistory(history)
            }
            setUpdatedHistory(history.filter((el) => el.phone.includes(value)))
        },
        [history]
    )

    React.useEffect(
        () => {
            fetchPersons().then(() => {})
            fetchHistory().then(() => {})
        },
        []
    )

    React.useEffect(
        () => {
            refreshHistData('').then(() => {})
        },
        [history]
    )

    return (
        <div className="w-2/3">
            <h1 className="text-center mb-4">История изменения номеров</h1>
            <SearchBar fieldTitle="" onSearch={refreshHistData}/>
            <ul>
                {
                    persons.map((person, index) => (
                        <li key={index} className="mt-4">
                            <i className="text-xl">{`${person.surname} ${person.name} ${person.patronymic ? person.patronymic : ''}`}</i>
                            <ul className="ml-4 font-light">
                                {
                                    updatedHistory.filter((entity) => entity.personID === person.id).map((entity, index) => (
                                        <li
                                            key={index}
                                            className="flex flex-row gap-2 justify-between hover:bg-gray-200 px-2"
                                        >
                                            <b>{entity.phone}</b>
                                            <div className="centered flex-row gap-2">
                                                {
                                                    entity.endDate !== null ? (
                                                        <>
                                                            <p className="flex gap-1">
                                                                Использовался с <b>{new Date(entity.startDate).toLocaleString('ru')}</b>
                                                                по <b>{new Date(entity.endDate).toLocaleString('ru')}</b>
                                                            </p>
                                                            <AiOutlineClockCircle/>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <p>Действующий номер</p>
                                                            <ImCheckmark className="text-green-400"/>
                                                        </>
                                                    )
                                                }
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default PhoneHistoryTable;