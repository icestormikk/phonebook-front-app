import React, {FormEvent, Fragment} from 'react';

interface DynamicTableProps {
    source: Array<any>,
    onDelete: (...args: Array<any>) => any,
    onAdd: (event: FormEvent<HTMLFormElement>) => any
    inputFields: Array<JSX.Element>
}

function DynamicTable({source, onDelete, onAdd, inputFields}: DynamicTableProps) {
    const [isAddingEntity, setIsAddingEntity] = React.useState(false)
    const sortedSource = React.useMemo(
        () => {
            return source.sort((a, b) => a.id - b.id)
        },
        [source]
    )

    return (
        <div className="min-w-[40rem] mx-2">
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
                    isAddingEntity && (
                        <form onSubmit={(event) => {
                            event.preventDefault()
                            onAdd(event)
                        }}>
                            <div>
                                {inputFields.map((el, index) => (
                                    <Fragment key={index}>{el}</Fragment>
                                ))}
                            </div>
                            <input type="submit" value="Применить"/>
                        </form>
                    )
                }
            </div>
            {
                sortedSource.length !== 0 ? (
                    <table className="w-full text-xl bordered shadow-md text-center">
                        <tbody className="rounded-md overflow-hidden">
                        <tr>
                            {
                                Object.keys(sortedSource[0])
                                    .filter((key) => sortedSource[0][key] === null || typeof sortedSource[0][key] !== 'object')
                                    .map((key, index) => (
                                            <th key={index}>{key}</th>
                                        )
                                    )
                            }
                        </tr>
                        {
                            sortedSource.map((obj, index) => (
                                <tr key={index}>
                                    {
                                        Object.keys(obj)
                                            .filter((key) => sortedSource[0][key] === null || typeof obj[key] !== 'object')
                                            .map((key, index) => (
                                                <td key={index} className={!obj[key] ? "text-gray-400" : ""}>
                                                    {obj[key] ? obj[key] : 'Отсутствует'}
                                                </td>
                                            ))
                                    }
                                    <td className="additional-col">
                                        <button
                                            type="button"
                                            onClick={
                                                () => onDelete(obj.id)
                                            }
                                            className="text-base px-2"
                                        >
                                            Delete
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