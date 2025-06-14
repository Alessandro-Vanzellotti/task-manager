import { Dispatch, MouseEvent, MouseEventHandler, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import './OptionsDropdown.scss';

type Props = {
  toggleModal: () => void;
};

export const OptionsDropdown: React.FC<Props> = ({toggleModal}) => {
  
    const [open, setOpen] = useState<boolean>(false);
    const dropdownRef = useRef<any>(null);

    const handleClick = (e: any) => {
        //if (open && !(e.target as Node).closest(`.${dropdownRef.current?.className}`)) {
        if (open && !dropdownRef.current.contains(e.target)) {
            setOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        }
    })

    return (
        <div className='options' >
            <button
              className='options__button'
              onClick={() => setOpen(!open)}
                ref={dropdownRef}              
            >
              <HiOutlineDotsHorizontal />
            </button>
            {open && (
            <ul className='options__dropdown'>
                <li onClick={toggleModal}>Details</li>
                <li>Edit</li>
                <li>Delete</li>
            </ul>
            )}
        </div>
    );
};