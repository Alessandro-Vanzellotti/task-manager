import { createContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { TaskType } from '../../types';
import { TaskListContext } from '../../TaskListContext';
import './Navbar.scss';

export default function Navbar() {

    return (
        <>
            <nav className={'nav'}>
                    <Link to='/' className={'link'} >
                        Home
                    </Link>
            </nav>
        </>

    )
}