import { useLocation } from "react-router-dom";
import { GET_ITEMS, GET_VARIETIES } from "../utils/queries";
import { useQuery } from "@apollo/client";

import './Variety.css';

import ItemCard from "../components/ItemCard";

const Variety = () => {
    const currentPage = useLocation().pathname;
    const currentVariety = currentPage.split('/').pop().trim();

    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const Variety = capitalize(currentVariety);

    document.title = 'B&P | ' + Variety;

    const {loading, error, data} = useQuery(GET_ITEMS);
    const {loading: varLoading, error: varError, data: varData} = useQuery(GET_VARIETIES);

    // if variety exists, show page
    if (varLoading) {
        return <p>Loading...</p>
    } else if (varError) {
        return <p>Error: {varError.message}</p>
    } else if (!varData) {
        return <p>This category doesn&#39;t exist!</p>
    }

    const varietyNames = varData.varieties.map(variety => variety.varietyName);
    const varietyInfo = varData.varieties.find(variety => variety.varietyName === Variety);

    if (!varietyNames.includes(Variety)) {
        return <p>This category doesn&#39;t exist!</p>
    }

    const {varietyName, varietyDescription} = varietyInfo;

    if (loading) {
        return <p>Loading...</p>
    } else if (error) {
        return <p>Error: {error.message}</p>
    } else if (!data) {
        return <p>No items found under this variety!</p>
    }

    const filteredItems = data.items.filter(item =>
        item.variety.includes(varietyName)
    );

    return(
        <main className="variety-page">
            <h2>{varietyName}</h2>
            <p>{varietyDescription}</p>
            <div className="variety-divider"></div>
            <section className="item-display">
                {filteredItems.map((item) => (
                    <ItemCard key={item._id} item={item} />
                ))}
            </section>
            <div className="variety-divider"></div>
        </main>
    )
}

export default Variety;