import React from 'react';
import {Link} from "react-router-dom";
import {AiFillCaretDown, AiOutlineCaretUp} from "react-icons/ai";

interface HeaderTabProps {
    title: string,
    address: string,
    variants?: Array<{title: string, subAddress: string}>
}

function HeaderTab({title, address, variants}: HeaderTabProps) {
    const ref = React.useRef<HTMLDivElement>(null)
    const [isOpen, setIsOpen] = React.useState(false)

    React.useEffect(() => {
        const checkIfClickedOutside = (e: MouseEvent) => {
            if (isOpen && ref.current && !ref.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }

        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [isOpen])

    return (
        <div ref={ref} className="centered relative gap-0.5">
            <div className="centered gap-0.5">
                <Link to={address}>
                    {title}
                </Link>
                {
                    variants && (
                        <button
                            type="button"
                            onClick={() => setIsOpen((prevState) => !prevState)}
                        >
                            {
                                isOpen ? <AiOutlineCaretUp/> : <AiFillCaretDown/>
                            }
                        </button>
                    )
                }
            </div>
            {
                (variants && isOpen) && (
                    <ul className="absolute top-full left-0 bg-gray-300">
                        {
                            variants.map((variant, index) => (
                                <li key={index} className="hover:bg-gray-400/80 px-2 py-1">
                                    <Link to={address + variant.subAddress}>
                                        {variant.title}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </div>
    );
}

export default HeaderTab;