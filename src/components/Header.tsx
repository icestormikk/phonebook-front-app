import React from 'react';
import {Link} from "react-router-dom";
import HeaderTab from "./HeaderTab";
import {HttpStatusCode} from "axios";
import {ping} from "../axios";

/**
 * The component that displays the site header
 * @constructor
 */
function Header() {
    const [status, setStatus] = React.useState<HttpStatusCode|undefined>(undefined)
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
                    address: '/infos',
                    variants: [
                        {
                            title: 'Типы телефонов',
                            subAddress: '/types'
                        },
                        {
                            title: 'История изменений',
                            subAddress: '/history'
                        }
                    ]
                }
            ]
        },
        []
    )

    React.useEffect(
        () => {
            ping()
                .then((res) => {
                    setStatus(res.status)
                })
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
                        <HeaderTab
                            key={index}
                            title={tab.title}
                            address={tab.address}
                            variants={tab.variants}
                            isLocked={status !== 200}
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Header;