import Header from "./components/Header";
import {Route, Routes} from "react-router-dom";
import React from "react";
import EntityTable from "./components/EntityTable";
import {deletePersonById, fetchAllPersons} from "./axios/personQueries";
import CategoriesTable from "./components/pages/CategoriesTable";
import AddressesTable from "./components/pages/AddressesTable";
import PersonsTable from "./components/pages/PersonsTable";
import CitiesTable from "./components/pages/address/CitiesTable";
import StreetsTable from "./components/pages/address/StreetsTable";
import CountriesTable from "./components/pages/address/CountriesTable";
import InfoBookTable from "./components/pages/InfoBookTable";

function App() {
    return (
        <div className="App">
            <Header/>
            <div className="h-full flex flex-col justify-start items-center pt-10">
                <Routes>
                    <Route path="/" element={(<h1>Hello Page</h1>)}/>
                    <Route
                        path="/categories"
                        element={(<CategoriesTable/>)}
                    />
                    <Route path="/addresses">
                        <Route index element={(<AddressesTable/>)}/>
                        <Route path="countries" element={(<CountriesTable/>)}/>
                        <Route path="cities" element={(<CitiesTable/>)}/>
                        <Route path="streets" element={(<StreetsTable/>)}/>
                    </Route>
                    <Route path="/infos" element={(<InfoBookTable/>)}/>
                    <Route
                        path="/persons"
                        element={(<PersonsTable/>)}
                    />
                </Routes>
            </div>
        </div>
    )
}

export default App
