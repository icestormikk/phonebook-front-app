import React from 'react';
import {Link} from "react-router-dom";
import HeaderTab from "./HeaderTab";

function Header() {
    const tabs = React.useMemo(
        () => {
            return [
                {
                    title: 'Категории',
                    address: '/categories'
                },
                {
                    title: 'Адреса',
                    address: '/addresses',
                    variants: [
                        {
                            title: 'Страны',
                            subAddress: '/countries'
                        },
                        {
                            title: 'Города',
                            subAddress: '/cities'
                        },
                        {
                            title: 'Улицы',
                            subAddress: '/streets'
                        }
                    ]
                },
                {
                    title: 'Пользователи',
                    address: '/persons'
                },
                {
                    title: 'Телефонная книга',
                    address: '/infos'
                }
            ]
        },
        []
    )

    return (
        <div id="header-block">
            <Link to="/" className="text-2xl font-light">
                Приложение "Телефонная книга"
            </Link>
            <div className="centered gap-4 uppercase">
                {
                    tabs.map((tab, index) => (
                        <HeaderTab key={index} title={tab.title} address={tab.address} variants={tab.variants}/>
                    ))
                }
            </div>
        </div>
    );
}

export default Header;