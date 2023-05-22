import React from 'react';
import ModalHeader from "./ModalHeader";

interface ModalWindowProps {
    isOpen: boolean,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>,
    title: string,
    content: JSX.Element
}

/**
 * The basic component for a pop-up modal window with custom content filling
 * @param isOpen the value determines whether the window is open or not
 * @param setIsOpen a function that changes the value of the @{link isOpen} parameter
 * @param content content of the modal window
 * @param title title of the modal window
 * @constructor
 */
function ModalWindow({isOpen, setIsOpen, content, title}: ModalWindowProps) {
    const escPressedListener = React.useCallback(
        (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false)
            }
        },
        [setIsOpen]
    )

    React.useEffect(
        () => {
            document.body.addEventListener("keydown", escPressedListener)
            return function cleanup() {
                document.body.removeEventListener("keydown", escPressedListener)
            }
        },
        [escPressedListener]
    )

    return (
        <div
            className={"fixed top-0 left-0 h-screen w-screen bg-black/50 centered z-10 "
                + (isOpen ? 'flex' : 'hidden')}
            onClick={() => setIsOpen(false)}
        >
            <div
                className="w-max h-max rounded-md overflow-hidden bg-white z-10"
                onClick={(event) => event.stopPropagation()}
            >
                <ModalHeader title={title} setIsOpen={setIsOpen}/>
                {content}
            </div>
        </div>
    );
}

export default ModalWindow;