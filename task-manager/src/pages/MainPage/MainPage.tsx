import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import './MaingPage.scss';

export default function MainPage() {

    return (
        <>
                <Navbar />
                <div>
                    <Outlet />
                </div>
        </>
    )
}