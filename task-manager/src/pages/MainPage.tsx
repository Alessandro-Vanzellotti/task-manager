import { Link, Outlet } from 'react-router-dom';

export default function MainPage() {

    return (
        <>
            <div >
                <nav >
                    <div>
                        {/* <Link to='/' >
                            Home
                        </Link> */}
                        <p>Oi</p>
                    </div>
                </nav>
            </div>
            <div>
                <Outlet />
            </div>
        </>
    )
}