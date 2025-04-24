import { Link } from 'react-router-dom';
import './Navbar.scss';

export default function Navbar() {

    return (
        <>
            <nav className={'nav'}>
                <p className={'nav__title'}>Task Manager</p>
                <div className={'nav__links'}>
                    <Link to='/' className={'link'} >
                        Home
                    </Link>
                    <Link to='/tasks' className={'link'} >
                        Tasks
                    </Link>
                </div>
            </nav>
        </>

    )
}