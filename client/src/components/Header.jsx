import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import './Header.css';
const Header = ({onToggleModal, onToggleNav, onToggleCart}) => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    let userId;

    if (Auth.loggedIn()) {
        userId = Auth.getProfile().data._id;
    }

    return(
        <>
        <header>
            <section className='logo-address'>
                <Link to='/'><img id='logo' alt='logo' src='/logo-rose.png' /></Link>
                <section className='address'>
                    <p>50X North Main Street</p>
                    <p>Mt. Pleasant, SC 29429</p>
                    <p>Phone: (667)667-6677</p>
                </section>
            </section>
        </header>
        <section className='header'>
                <button id='nav-button' onClick={onToggleNav} className='material-symbols-outlined'>menu</button>
                <section className='user-cart-icons'>
                    {Auth.loggedIn() ? (
                        <div>
                            <Link to={`/account/${userId}`} id='user-icon' className='material-symbols-outlined'>account_circle</Link>
                            <button id='cart-button' onClick={onToggleCart} className='material-symbols-outlined'>shopping_cart</button>
                            <button id='logout-button' onClick={logout} className='material-symbols-outlined'>logout</button>
                        </div>
                    ) : (
                        <div>
                            <button id='user-icon' onClick={onToggleModal} className='material-symbols-outlined'>account_circle</button>
                            <button id='cart-button' onClick={onToggleModal} className='material-symbols-outlined'>shopping_cart</button>
                        </div>
                    )}

                </section>
        </section>
        </>

    );
};

export default Header;