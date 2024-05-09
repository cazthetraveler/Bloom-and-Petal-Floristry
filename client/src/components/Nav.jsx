import { Link } from 'react-router-dom';
import './Nav.css';

import { useState, useEffect } from 'react';
import {useQuery} from '@apollo/client';
import {GET_VARIETIES, GET_ITEMS} from '../utils/queries';

const Nav = ({onClose, navVisible}) => {
    const [catVisible, setCatVisible] = useState(false);
    const toggleCategory = () => {
      setCatVisible(!catVisible);
    };

    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= 1200);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [searchTerm, setSearchTerm] = useState('');

    const {loading, error, data} = useQuery(GET_VARIETIES);

    const {loading: searchLoading, error: searchError, data: searchData} = useQuery(GET_ITEMS);

    if (error) {
        return <p>Error: {error.message}</p>
    }

    if (loading) {
        return <p>Loading...</p>
    }

    if (!data) {
        return <p>No categories found!</p>
    }



    return(
        <nav className={navVisible ? 'active' : ''}>
            <section className='nav-title'>
                <button id='close-nav-button' onClick={onClose} className='material-symbols-outlined'>close</button>
                <img src='/icon-white.png' alt='bloom & petal white icon' />
            </section>
            {/* <section className='search-nav'>
                <input type='text' id='search-bar' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search...' />
                <button id='search-button' className='material-symbols-outlined'>search</button>
            </section> */}
            <section className='nav-links'>
                <Link onClick={onClose} to='/'>HOME</Link>
                <div className='dropdown'>
                    <button disabled={isDesktop ? true : false} onClick={toggleCategory}>CATEGORIES</button>
                    <div className={catVisible ? 'dropdown-content active' : 'dropdown-content'}>
                        {data.varieties.map(variety => (
                            <Link key={variety._id} onClick={() => {onClose(); isDesktop ? '' : toggleCategory()}} to={`/category/${variety.varietyName.toLowerCase()}`}>{variety.varietyName.toUpperCase()}</Link>
                        ))}
                    </div>
                </div>
                <Link onClick={onClose} to='/about-us'>ABOUT US</Link>
            </section>
        </nav>
    )
}

export default Nav;