import { Link } from 'react-router-dom';
import Slideshow from '../components/Slideshow';
import ItemCard from '../components/ItemCard';

import {useQuery} from '@apollo/client';
import {GET_VARIETIES, GET_ITEMS} from '../utils/queries';

const Home = () => {
    document.title = 'Bloom & Petal Floristry';
    
    const {loading, error, data} = useQuery(GET_VARIETIES);
    const {loading: itemLoad, error: itemError, data: itemData} = useQuery(GET_ITEMS);

    if (error || itemError) {
        return <p>Error: {error.message}</p>
    }

    if (loading || itemLoad) {
        return <p>Loading...</p>
    }

    if (!data || !itemData) {
        return <p>No categories found!</p>
    }

    const featuredItems = itemData.items.filter(item => item.isFeatured === true);

    return(
        <main className='home-page'>
            <Slideshow />
            <section id='featured-section'>
                <h2>Featured Items</h2>
                <section className='display'>
                    {featuredItems.map(item => (
                        <ItemCard key={item._id} item={item} />
                    ))}
                </section>
            </section>
            <div className='divider'></div>
            <section id='categories-section'>
                <h2>Categories</h2>
                <section className='display'>
                    {data.varieties.map(variety => (
                        <Link key={variety._id} to={`/category/${variety.varietyName.toLowerCase()}`}>
                            <section className='card'>
                                <img src={variety.varietyImage} />
                                <h3>{variety.varietyName}</h3>
                            </section>
                        </Link>
                    ))}
                </section>
            </section>
        </main>
    );
};

export default Home;