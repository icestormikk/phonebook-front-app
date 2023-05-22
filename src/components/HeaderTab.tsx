import React from 'react';
import {Link} from "react-router-dom";
import {AiFillCaretDown, AiOutlineCaretUp} from "react-icons/ai";
import {HiOutlineLockClosed} from "react-icons/hi";

interface HeaderTabProps {
    title: string,
    address: string,
    isLocked?: boolean
    variants?: Array<{title: string, subAddress: string}>
}

/**
 * The structural unit of the site header contains a link to one
 * page of the site, as well as subsections with their own links
 * @param title title of the section with a link
 * @param address the address to which the user will go when clicking on the link
 * @param isLocked a parameter indicating whether a click on a link is allowed
 * @param variants a set of sublinks
 * @constructor
 */
function HeaderTab({title, address, isLocked = false, variants}: HeaderTabProps) {
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
                {
                    isLocked ? (
                        <div className="centered gap-2">
                            <p>{title}</p>
                            <HiOutlineLockClosed/>
                        </div>
                    ) : (
                        <>
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
                        </>
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