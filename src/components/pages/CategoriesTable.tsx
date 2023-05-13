import React from 'react';
import EntityTable from "../EntityTable";
import {addCategory, fetchAllCategories, removeCategoryById} from "../../axios/categoryQueries";

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
            inputFields={[
                <input type="text" name="title" id="title" placeholder="Название категории"/>
            ]}
            searchableFieldTitles={["title"]}
        />
    );
}

export default CategoriesTable;