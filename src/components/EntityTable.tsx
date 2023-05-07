import React, {FormEvent} from 'react';
import {AxiosResponse} from "axios";
import DynamicTable from "./DynamicTable";

interface EntityTableProps {
    title: string,
    onFetch: (...args: Array<any>) => Promise<AxiosResponse<any, any>>,
    onDelete: (...args: Array<any>) => Promise<AxiosResponse<any, any>>,
    onAdd: (event: FormEvent<HTMLFormElement>) => any,
    inputFields: Array<JSX.Element>
}

function EntityTable(props: EntityTableProps) {
    const [isLoading, setIsLoading] = React.useState(true)
    const [error, setError] = React.useState<string | undefined>(undefined)
    const [entities, setEntities] = React.useState<Array<any>>([])

    React.useEffect(
        () => {
            setIsLoading(true)
            props.onFetch()
                .then(
                    (res) => {
                        setEntities(res.data)
                    }
                )
                .catch(
                    (err) => {
                        setError(err)
                    }
                )
                .finally(() => {
                    setIsLoading(false)
                })
        },
        [props.onFetch]
    )

    const deleteAndRefreshData = React.useCallback(
        async (id: number) => {
            props.onDelete(id)
                .then(
                    () => {
                        props.onFetch()
                            .then((res) => setEntities(res.data))
                            .catch(() => setError('Данные отсутствуют'))
                    }
                )
        },
        [props.onFetch]
    )

    const addAndRefreshData = React.useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            props.onAdd(event)
                .then(
                    () => {
                        props.onFetch()
                            .then((res) => setEntities(res.data))
                            .catch(() => setError('Данные отсутствуют'))
                    }
                )
        },
        [props.onFetch]
    )

    return (
        <>
            <p className="table-header">{props.title}</p>
            {
                !isLoading ? (
                    error === undefined ? (
                        <DynamicTable
                            source={entities}
                            onDelete={deleteAndRefreshData}
                            inputFields={props.inputFields}
                            onAdd={addAndRefreshData}
                        />
                    ) : (
                        <p className="text-red-300">
                            Произошла ошибка: ${error}
                        </p>
                    )
                ) : (
                    <p>Загружаем данные</p>
                )
            }
        </>
    );
}

export default EntityTable;