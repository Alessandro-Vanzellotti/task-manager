import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import './OptionsDropdown.scss';

type Props = {
  toggleModal: () => void;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export const OptionsDropdown: React.FC<Props> = ({ toggleModal, setIsEditing }) => {
  
    const [open, setOpen] = useState<boolean>(false);
    const dropdownRef = useRef<any>(null);

    const handleClick = (e: any) => {
        //if (open && !(e.target as Node).closest(`.${dropdownRef.current?.className}`)) {
        if (open && !dropdownRef.current.contains(e.target)) {
            setOpen(false);
        }
    }

    const handleDetails = () => {
        setIsEditing(false);
        toggleModal();
    }

    const handleEditing = () => {
        setIsEditing(true);
        toggleModal();
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
            <div className='options__dropdown'>
                <button onClick={handleDetails}>Details</button>
                <button onClick={handleEditing} >Edit</button>
                <button>Delete</button>
            </div>
            )}
            
        </div>
    );
};