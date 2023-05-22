import React from 'react';
import {ping} from "../../axios";
import {HttpStatusCode} from "axios";

/**
 * Component for displaying the start page of the site
 * @constructor
 */
function Main() {
    const [response, setResponse] = React.useState<{ code: HttpStatusCode, message: string }|undefined>(undefined)

    const connectionStatus = async () => {
        ping()
            .then((res) => {
                setResponse({
                    code: res.status,
                    message: res.data
                })
            })
            .catch(() => {
                setResponse({
                    code: HttpStatusCode.ServiceUnavailable,
                    message: "Сервер не доступен!"
                })
            })
    }

    React.useEffect(
        () => {
            connectionStatus().then(() => {})
        },
        []
    )

    return (
        <div className="centered flex-col">
            <div className={"centered flex-col gap-2 text-2xl " + (response?.code === 200 ? "text-green-600" : "text-gray-500")}>
                {
                    response?.code ? (
                        <p>Статус сервера: {response.code}</p>
                    ) : (
                        <p>Загрузка</p>
                    )
                }
                {
                    response?.message && (
                        <p>Сообщение от сервера: {response.message}</p>
                    )
                }
            </div>
        </div>
    );
}

export default Main;