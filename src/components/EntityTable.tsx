import React, {FormEvent, ReactNode} from 'react';
import {AxiosResponse} from "axios";
import DynamicTable from "./DynamicTable";

interface EntityTableProps {
    title: string,
    onFetch: (...args: Array<any>) => Promise<AxiosResponse<any, any>>,
    onDelete: (...args: Array<any>) => Promise<AxiosResponse<any, any>>,
    onAdd?: (event: FormEvent<HTMLFormElement>) => Promise<any>,
    onEdit?: (event: FormEvent<HTMLFormElement>) => Promise<any>,
    onAddForm?: JSX.Element,
    onEditForm?: JSX.Element,
    inputFields: (source: any) => Array<JSX.Element>,
    searchableFieldTitles: Array<string>,
    specialFieldHandlers?: Array<{name: string, handler: (value: any) => ReactNode|string}>
}

/**
 * Wrapper over the Dynamic Table component. Adds action handlers for
 * manipulating various entities
 * @see DynamicTable
 * @param props
 * @constructor
 */
function EntityTable(props: EntityTableProps) {
    const [isLoading, setIsLoading] = React.useState(true)
    const [error, setError] = React.useState<string | undefined>(undefined)
    const [entities, setEntities] = React.useState<Array<any>>([])
    const [onAddError, setOnAddError] = React.useState<string|undefined>(undefined)
    const [onEditError, setOnEditError] = React.useState<string|undefined>(undefined)

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
                        setError(err.message)
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
            event.preventDefault()

            if (!props.onAdd) {return}
            props.onAdd(event)
                .then(
                    () => {
                        setOnAddError(undefined)
                        props.onFetch()
                            .then((res) => setEntities(res.data))
                            .catch(() => setError('Данные отсутствуют'))
                    }
                )
                .catch((err) => {
                    setOnAddError("Произошла ошибка: " + err.message)
                })
        },
        [props.onFetch]
    )

    const updateAndRefreshData = React.useCallback(
        async (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault()

            if (!props.onEdit) {return}
            await props.onEdit(event)
                .then(
                    () => {
                        setOnEditError(undefined)
                        props.onFetch()
                            .then((res) => setEntities(res.data))
                            .catch(() => setError('Данные отсутствуют'))
                    }
                )
                .catch((err) => {
                    setOnEditError("Произошла ошибка: " + err.message)
                })
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
                            onAddError={onAddError}
                            onEdit={updateAndRefreshData}
                            onEditError={onEditError}
                            onAddForm={props.onAddForm}
                            onEditForm={props.onEditForm}
                            searchableFieldTitles={props.searchableFieldTitles}
                            specialFieldHandlers={props.specialFieldHandlers}
                        />
                    ) : (
                        <p className="error-text">
                            Произошла ошибка: {error}
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