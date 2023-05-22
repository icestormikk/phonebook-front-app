import React from 'react';
import EntityTable from "../EntityTable";
import {addCategory, fetchAllCategories, removeCategoryById, updateCategory} from "../../axios/categoryQueries";

/**
 * Component for displaying information about objects of the Category class
 * @constructor
 */
function CategoriesTable() {
    return (
        <EntityTable
            title="Категории пользователей"
            onFetch={fetchAllCategories}
            onDelete={removeCategoryById}
            onAdd={async (event) => {
                const target = event.target as typeof event.target & {
                    title: {value: string}
                }

                await addCategory(target.title.value)
            }}
            inputFields={(source) => [
                <input type="text" name="title" id="title" placeholder="Название категории" required defaultValue={source?.title}/>
            ]}
            onEdit={async (event) => {
                const target = event.target as typeof event.target & {
                    id: {value: number}
                    title: {value: string}
                }

                await updateCategory(target.id.value, target.title.value)
            }}
            searchableFieldTitles={["title"]}
        />
    );
}

export default CategoriesTable;