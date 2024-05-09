import { Link } from "react-router-dom";

import './ItemCard.css';

const ItemCard = ({item}) => {
    return(
        <Link to={`/items/${item._id}`} className='item-card'>
            <section>
                <img src={item.image} />
                <h3>{item.itemName}</h3>
            </section>
            <h4>${item.price}</h4>
        </Link>
    )
}

export default ItemCard;