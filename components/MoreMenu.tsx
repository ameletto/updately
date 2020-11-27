import {FaEllipsisV} from "react-icons/fa";
import {ReactNode, useEffect, useRef, useState} from "react";
import short from "short-uuid";
import MenuButton from "./MenuButton";
import MenuLink from "./MenuLink";

export default function MoreMenu({items, buttonText = <FaEllipsisV/>, buttonClassName, className} : {
    items: {label: string, href?: string, onClick?: () => any}[],
    buttonText?: string | ReactNode,
    buttonClassName?: string,
    className?: string,
}) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const thisButton = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const moreButtonClickHandler = e => {
            if (thisButton.current !== null) {
                const isNotButton = e.target !== thisButton.current && !(thisButton.current.contains(e.target));
                if (isNotButton) {
                    setIsOpen(false);
                }
            }
        };

        window.addEventListener('click', moreButtonClickHandler);

        return function cleanup(){
            window.removeEventListener("click", moreButtonClickHandler);
        }
    }, []);

    return (
        <div className={className || "relative"}>
            <button
                className={buttonClassName || "up-button text"}
                onClick={() => setIsOpen(!isOpen)}
                id={short.generate()}
                ref={thisButton}
            >{buttonText}</button>
            {isOpen && (
                <div className="absolute top-0 mt-16 shadow-lg rounded-md z-10 bg-white">
                    {items.map(item => item.href ? (
                        <MenuLink text={item.label} href={item.href}/>
                    ) : (item.onClick && (
                        <MenuButton text={item.label} onClick={item.onClick}/>
                    )))}
                </div>
            )}
        </div>
    )
}