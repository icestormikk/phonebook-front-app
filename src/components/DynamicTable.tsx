import React, {FormEvent, Fragment, ReactNode} from 'react';
import {BiSearchAlt} from "react-icons/bi";
import SearchBar from "./SearchBar";
import {BsTrash} from "react-icons/bs";
import ModalWindow from "./modal/ModalWindow";
import {AiFillEdit} from "react-icons/ai";

interface DynamicTableProps {
    source: Array<any>,
    onDelete: (...args: Array<any>) => any,
    onAdd: (event: FormEvent<HTMLFormElement>) => Promise<any>,
    onAddError: string|undefined,
    onAddForm?: JSX.Element,
    onEdit: (event: FormEvent<HTMLFormElement>) => Promise<any>,
    onEditError: string|undefined,
    onEditForm?: JSX.Element,
    onSpecialSearch?: (event: FormEvent<HTMLFormElement>) => Promise<any>,
    onSearchError?: string,
    searchFormFields?: Array<JSX.Element>,
    inputFields: (source: any) => Array<JSX.Element>,
    searchableFieldTitles: Array<string>,
    specialFieldHandlers?: Array<{name: string, handler: (value: any) => ReactNode|string}>
}

/**
 * A dynamically changing table of entities of the specified type. The basic component
 * for all tables in this application
 * @param source list of entities to display information about
 * @param onDelete a function performed during the deletion of an entity
 * @param onAdd a function performed during the creation of a new entity
 * @param onEdit a function performed during the change of entity parameters
 * @param onAddForm custom form for adding a new entity
 * @param inputFields a set of fields for entering information about a new or editable entity
 * @param searchableFieldTitles names of fields that are allowed to search through the search bar
 * @param specialFieldHandlers a special handler for displaying information in a specific field
 * @param onAddError error message that occurred while adding a new entity
 * @param onEditError error message that occurred while changing entity parameters
 * @param onEditForm custom form for changing entity parameters
 * @param onSpecialSearch a function that performs a specific search on some entity fields
 * @param searchFormFields fields from which the {@link onSpecialSearch} function takes values
 * @param onSearchError the text of the error that may occur during the execution of the
 * {@link onSpecialSearch} function
 * @constructor
 */
function DynamicTable({
    source, onDelete, onAdd, onEdit, onAddForm, inputFields, searchableFieldTitles, specialFieldHandlers,
    onAddError, onEditError, onEditForm, onSpecialSearch, searchFormFields, onSearchError
}: DynamicTableProps) {
    const [isAddingEntity, setIsAddingEntity] = React.useState(false)
    const [isEditingEntity, setIsEditingEntity] = React.useState(false)
    const [entityToEdit, setEntityToEdit] = React.useState<any>()
    const [selectedField, setSelectedField] = React.useState(searchableFieldTitles[0])
    const [updatedSource, setUpdatedSource] = React.useState(source)

    const refreshData = React.useCallback(
        (value: string) => {
            if (value.length === 0) {
                setUpdatedSource(source)
            }
            setUpdatedSource(source.filter((el) => `${el[selectedField]}`.includes(value)))
        },
        [selectedField, source]
    )

    React.useEffect(
        () => {
            refreshData('')
        },
        [source]
    )

    return (
        <div className="min-w-[40rem] mx-2 flex flex-col gap-2">
            <div className="flex flex-col justify-start items-start my-4
                bordered rounded-md p-2 w-full">
                <button
                    type="button"
                    className={(isAddingEntity ? "bg-red-600/80" : "bg-green-600/80") + " text-white px-2 py-0.5"}
                    onClick={() => setIsAddingEntity((prevState) => !prevState)}
                >
                    {
                        isAddingEntity ? "Скрыть -" : "Добавить +"
                    }
                </button>
                {
                    isEditingEntity && (
                        <ModalWindow
                            isOpen={isEditingEntity}
                            setIsOpen={setIsEditingEntity}
                            title="Изменение параметров сущности"
                            content={(
                                onEditForm ? (
                                    onEditForm
                                ) : (
                                    <form className="p-2" onSubmit={(e) => {
                                        onEdit(e)
                                            .then(() => {
                                                setIsEditingEntity(onEditError !== undefined)
                                            })
                                    }}>
                                        <div>
                                            {
                                                inputFields(entityToEdit).map((el, index) => (
                                                    <Fragment key={index}>{el}</Fragment>
                                                ))
                                            }
                                            <input type="hidden" name="id" id="id" value={entityToEdit.id}/>
                                            {
                                                onEditError && (
                                                    <span className="error-text">{onEditError}</span>
                                                )
                                            }
                                        </div>
                                        <input type="submit" value="Применить"/>
                                    </form>
                                )
                            )}
                        />
                    )
                }
                {
                    isAddingEntity && (
                        onAddForm ? (
                            onAddForm
                        ) : (
                            <form onSubmit={(event) => {
                                onAdd(event)
                                    .then(() => {
                                        setIsEditingEntity(false)
                                        setEntityToEdit(undefined)
                                    })
                            }}>
                                <div>
                                    {
                                        inputFields(undefined).map((el, index) => (
                                            <Fragment key={index}>{el}</Fragment>
                                        ))
                                    }
                                </div>
                                <input type="submit" value="Применить"/>
                                {
                                    onAddError && (
                                        <span className="error-text">{onAddError}</span>
                                    )
                                }
                            </form>
                        )
                    )
                }
                {
                    onSpecialSearch && (
                        <form onSubmit={onSpecialSearch} className="flex gap-2">
                            {
                                searchFormFields && (
                                    <>
                                        {
                                            searchFormFields.map((field, index) => (
                                                <Fragment key={index}>{field}</Fragment>
                                            ))
                                        }
                                        <input type="submit" value="Применить"/>
                                    </>
                                )
                            }
                            {
                                onSearchError && (
                                    <span className="error-text">{onSearchError}</span>
                                )
                            }
                        </form>
                    )
                }
            </div>
            <SearchBar fieldTitle={""} onSearch={refreshData}/>
            {
                updatedSource.length !== 0 ? (
                    <table className="w-full text-xl bordered shadow-md text-center">
                        <tbody className="rounded-md overflow-hidden">
                        <tr>
                            {
                                Object.keys(updatedSource[0])
                                    .filter((key) => updatedSource[0][key] === null || typeof updatedSource[0][key] !== 'object')
                                    .map((key, index) => (
                                            <th
                                                key={index}
                                                className={"table-subheader " + (selectedField === key ? "bg-green-500/30" : "")}
                                                onClick={() => {
                                                    if (searchableFieldTitles.includes(key)) {
                                                        setSelectedField(key)
                                                    }
                                                }}
                                            >
                                                {key}
                                                {
                                                    searchableFieldTitles.includes(key) && (
                                                        <div className="search-sign-block">
                                                            <BiSearchAlt/>
                                                        </div>
                                                    )
                                                }
                                            </th>
                                        )
                                    )
                            }
                        </tr>
                        {
                            updatedSource.map((obj, index) => (
                                <tr key={index}>
                                    {
                                        Object.keys(obj)
                                            .filter((key) => {
                                                return obj[key] === null || typeof obj[key] !== 'object'
                                            })
                                            .map((key, index) => (
                                                <td key={index} className={!obj[key] ? "text-gray-400" : ""}>
                                                    {obj[key] ? (
                                                        specialFieldHandlers?.find((el) => el.name === key) !== undefined ? (
                                                            specialFieldHandlers.find((el) => el.name === key)!.handler(obj[key])
                                                        ) : (
                                                            obj[key]
                                                        )
                                                    ) : 'Отсутствует'}
                                                </td>
                                            ))
                                    }
                                    <td className="additional-col">
                                        <button
                                            type="button"
                                            onClick={
                                                () => onDelete(obj.id)
                                            }
                                            className="text-xl px-2 font-bold centered"
                                        >
                                            <BsTrash/>
                                        </button>
                                    </td>
                                    <td className="additional-col">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEntityToEdit(obj)
                                                setIsEditingEntity(true)
                                            }}
                                            className="text-xl px-2 font-bold centered"
                                        >
                                            <AiFillEdit/>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                ) : (
                    <p className="text-center">Отсутствуют данные</p>
                )
            }
        </div>
    );
}

export default DynamicTable;