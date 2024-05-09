import React, { useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ONE_ITEM } from '../utils/queries';
import { ADD_TO_CART } from '../utils/mutations';

import './Item.css';

const Item = () => {
  const { id } = useParams();
  const quantityRef = useRef(null);

  const { loading, error, data } = useQuery(GET_ONE_ITEM, {
    variables: { itemId: id }
  });

  const [addToCart] = useMutation(ADD_TO_CART);

  const handleAddToCart = async () => {
    try {
      const userId = Auth.getProfile()?.data?._id;
      const itemId = id;
      const quantity = quantityRef.current?.value;
  
      addToCart({ variables: { _id: userId, cart: [`${itemId} - ${quantity}`] } });
      alert('Item successfully added to cart!');

    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };
  

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>No item found!</p>;
  }

  const item = data.item;

  document.title = 'B&P | ' + item.itemName;

  return (
    <main className='item-page'>
      <section className='item-info-container'>
        <section className='item-image'>
          <img src={item.image} alt={item.itemName} title={`Image by ${item.author} on Unsplash`} />
        </section>
        <section className='item-info'>
          <h2>{item.itemName}</h2>

          <h3>Description:</h3>
          <p>{item.itemDescription}</p>

          <h3>${item.price}</h3>

          <h3>Categories:</h3>
          <p className='category-links'>
            {data.item.variety.map((variety, index) => (
              <React.Fragment key={variety}>
                {index > 0 && ', '}
                  <Link to={`/category/${variety.toLowerCase()}`}>{variety}</Link>
              </React.Fragment>
            ))}
          </p>
        </section>
      </section>
      <section className='buy-item'>
        <div>
          <label htmlFor='item-quantity'>Quantity: </label>
          <select name='item-quantity' ref={quantityRef}>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
          </select>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <button id='add-to-cart-button' onClick={handleAddToCart}>Add to Cart</button>
          ) : (
            <p className='login-warning'>You must be logged in to shop!</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Item;
