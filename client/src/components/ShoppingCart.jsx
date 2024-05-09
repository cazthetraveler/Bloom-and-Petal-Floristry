import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ONE_USER, GET_ITEMS } from '../utils/queries';
import { REMOVE_FROM_CART } from '../utils/mutations';
import Auth from '../utils/auth';

import './ShoppingCart.css';

const ShoppingCart = ({onClose, cartVisible}) => {
    const isAuthenticated = Auth.loggedIn();
    const userId = isAuthenticated ? Auth.getProfile().data._id : null;

    const {loading, error, data} = useQuery(GET_ONE_USER, {
        variables: {userId: userId},
        skip: !isAuthenticated
    });

    const {loading: itemLoad, error: itemError, data: itemData} = useQuery(GET_ITEMS);

    const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
        refetchQueries: [{query: GET_ONE_USER, variables: {userId: userId}}]
    });

    const handleRemoveFromCart = (index) => {
        removeFromCart({variables: {_id: userId, index: index}})
    };

    if (error) {
        return <p>{error.message}</p>
    } else if (loading) {
        return <p>Loading...</p>
    }

    if (itemError) {
        return <p>{itemError.message}</p>
    } else if (itemLoad) {
        return <p>Loading...</p>
    }

    const cartItems = isAuthenticated ? data.user.cart || [] : [];
    const items = itemData.items;

    const cartItemDetails = cartItems.map((cartItem) => {
        const [itemId, quantity] = cartItem.split(' - ');
        const item = items.find((item) => item._id === itemId);
        return {
            itemId,
            quantity,
            item
        };
    });

    const totalPrice = cartItemDetails.reduce((total, item) => total + Number(item.item.price) * Number(item.quantity), 0).toFixed(2);

    return (
        <section className={cartVisible ? 'cart-modal active' : 'cart-modal'}>
            <section className='cart-title'>
                <button onClick={onClose} id='close-cart-button' className='material-symbols-outlined'>close</button>
                <h2>Shopping Cart</h2>
            </section>
            <section className='cart-item-container'>
                {cartItemDetails.length === 0 ? (
                    <p>Your cart is empty!</p>
                ) : (
                    cartItemDetails.map((item, index) => (
                        <div key={`${item.itemId}-${index}`} className='cart-item-card'>
                            <div className='cart-item-info'>
                                <img src={item.item.image} />
                                <div>
                                    <h3>{item.item.itemName}</h3>
                                    <h3>${item.item.price * item.quantity}</h3>
                                    <h3>Qty. {item.quantity}</h3>
                                </div>
                            </div>
                            <button onClick={() => handleRemoveFromCart(index)} className='delete-item-button material-symbols-outlined'>delete</button>
                        </div>
                    ))
                )}
            </section>
            <section className='cart-checkout'>
                <h3>Total: ${totalPrice}</h3>
                <Link id='checkout-button'>Proceed to Checkout</Link>
            </section>
        </section>
    );
};

export default ShoppingCart;