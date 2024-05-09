import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import Auth from '../utils/auth';
import { GET_ONE_USER, GET_VARIETIES, GET_ITEMS } from '../utils/queries';
import { useQuery, useMutation } from '@apollo/client';

import './Admin.css';
import { ADD_VARIETY, EDIT_VARIETY, DELETE_VARIETY, ADD_ITEM, DELETE_ITEM, EDIT_ITEM } from '../utils/mutations';

const Admin = () => {

    document.title = 'B&P | Admin';

    const [selectedVariety, setSelectedVariety] = useState(null);

    const [selectedEditVariety, setSelectedEditVariety] = useState(null);

    const [addVarietyForm, setAddVarietyForm] = useState({
        varietyName: '',
        varietyDescription: '',
        varietyImage: ''
    });

    const [editVarietyForm, setEditVarietyForm] = useState({
        varietyName: '',
        varietyDescription: '',
        varietyImage: ''
    });

    const [addItemForm, setAddItemForm] = useState({
        itemName: '',
        itemDescription: '',
        variety: [],
        price: '',
        image: '',
        author: '',
        isFeatured: ''
    });

    const [editItemForm, setEditItemForm] = useState({
        itemName: '',
        itemDescription: '',
        variety: [],
        price: '',
        image: '',
        author: '',
        isFeatured: ''
    });

    const [selectedItem, setSelectedItem] = useState(null);

    const [selectedEditItem, setSelectedEditItem] = useState(null);

    const handleAddVarietyInput = (e) => {
        const {name, value} = e.target;
        setAddVarietyForm({...addVarietyForm, [name]:value});
    };

    const handleEditVarietyInput = (e) => {
        const {name, value} = e.target;
        setEditVarietyForm({...editVarietyForm, [name]: value});
    }

    const handleAddItemInput = (e) => {
        const {name, value} = e.target;
        const newValue = name === 'variety' ? value.split(',') : (name === 'isFeatured' ? (value === 'true') : value);
        setAddItemForm({...addItemForm, [name]: newValue});
    };

    const handleEditItemInput = (e) => {
        const {name, value} = e.target;
        const newValue = name === 'variety' ? value.split(',') : (name === 'isFeatured' ? (value === 'true') : value);
        setEditItemForm({...editItemForm, [name]: newValue});
    }

    const [addVariety, {addVarError}] = useMutation(ADD_VARIETY);
    const [editVariety, {editVarietyError}] = useMutation(EDIT_VARIETY);
    const [deleteVariety, {deleteVarError}] = useMutation(DELETE_VARIETY);
    const [addItem, {addItemError}] = useMutation(ADD_ITEM);
    const [editItem, {editItemError}] = useMutation(EDIT_ITEM);
    const [deleteItem, {deleteItemError}] = useMutation(DELETE_ITEM);

    const handleAddVarietySubmit = async () => {
        try {
            const {data} = await addVariety({
                variables: {...addVarietyForm}
            });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditVarietySubmit = async () => {
        try {
            const {data} = await editVariety({
                variables: {...editVarietyForm, _id: selectedEditVariety}
            });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteVarietySubmit = async () => {
        try {
            const {data} = await deleteVariety({
                variables: {_id: selectedVariety}
            });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddItemSubmit = async () => {
        try {
            const {data} = await addItem({
                variables: {...addItemForm}
            });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteItemSubmit = async () => {
        try {
            const {data} = await deleteItem({
                variables: {_id: selectedItem}
            });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditItemSubmit = async () => {
        try {
            const {data} = await editItem({
                variables: {...editItemForm, _id: selectedEditItem}
            });
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    const userId = Auth.getProfile().data._id;
    const navigate = useNavigate();

    const {loading, error, data} = useQuery(GET_ONE_USER, {
        variables: {userId: userId}
    });

    const {loading: varLoading, error: varError, data: varData} = useQuery(GET_VARIETIES);

    const {loading: itemLoading, error: itemError, data: itemData} = useQuery(GET_ITEMS);

    if (loading) {
        return <p>Loading...</p>
    } else if (error) {
        return <p>Error: {error.message}</p>
    } else if (!data) {
        return <p>User not found!!</p>
    }

    if (varLoading) {
        return <p>Loading...</p>
    } else if (varError) {
        return <p>Error: {varError.message}</p>
    } else if (!varData) {
        return <p>Category not found!!</p>
    }

    if (itemLoading) {
        return <p>Loading...</p>
    } else if (itemError) {
        return <p>Error: {itemError.message}</p>
    } else if (!itemData) {
        return <p>Item not found!!</p>
    }

    const user = data.user;
    const varieties = varData.varieties;
    const items = itemData.items;

    if (Auth.loggedIn && !user.isAdmin || !Auth.loggedIn && !user.isAdmin) {
        navigate('/');
    }

    return(
        <main className="admin-page">
            <h2>Administrator page</h2>
            <form id='add-variety-form' name='add-variety-form'>
                <h3>Add a Category</h3>
                <label htmlFor='variety-name'>Category:</label>
                <input id='variety-name' type='text' name='varietyName' value={addVarietyForm.varietyName} onChange={handleAddVarietyInput} placeholder='Category Name...'/>
                <label htmlFor='variety-name'>Description:</label>
                <textarea id='variety-description' name='varietyDescription' rows='5' value={addVarietyForm.varietyDescription} onChange={handleAddVarietyInput} placeholder='Category Description...'></textarea>
                <label htmlFor='variety-image'>Image:</label>
                <input id='variety-image' type='text' name='varietyImage' value={addVarietyForm.varietyImage} onChange={handleAddVarietyInput} placeholder='Category Image Link...'/>
                <button id='add-category-button' onClick={handleAddVarietySubmit}>Add Category</button>
            </form>

            <form id='edit-variety-form' name='edit-variety-form'>
                <h3>Edit a Category</h3>

                <label htmlFor='edit-variety'>Variety to Edit:</label>
                <select id='edit-variety' name='edit-variety' onChange={(e) => {
                    const selectedVarietyData = varieties.find(variety => variety._id === e.target.value);
                    setSelectedEditVariety(e.target.value);
                    setEditVarietyForm(selectedVarietyData);
                }}>
                    {varieties.map(variety => (
                        <option key={variety._id} value={variety._id}>{variety.varietyName}</option>
                    ))}
                </select>
                <label htmlFor='edit-variety-name'>Category:</label>
                <input id='edit-variety-name' type='text' name='varietyName' value={editVarietyForm.varietyName} onChange={handleEditVarietyInput} placeholder='Category Name...'/>
                <label htmlFor='edit-variety-name'>Description:</label>
                <textarea id='edit-variety-description' name='varietyDescription' rows='5' value={editVarietyForm.varietyDescription} onChange={handleEditVarietyInput} placeholder='Category Description...'></textarea>
                <label htmlFor='edit-variety-image'>Image:</label>
                <input id='edit-variety-image' type='text' name='varietyImage' value={editVarietyForm.varietyImage} onChange={handleEditVarietyInput} placeholder='Category Image Link...'/>
                <button id='edit-category-button' onClick={handleEditVarietySubmit}>Edit Category</button>
            </form>

            <form id='delete-variety-form' name='delete-variety-form'>
                <h3>Delete a Category</h3>
                <label htmlFor='delete-variety'>Category:</label>
                <select id='delete-variety' name='delete-variety' onChange={(e) => setSelectedVariety(e.target.value)}>
                    {varieties.map(variety => (
                        <option key={variety._id} value={variety._id}>{variety.varietyName}</option>
                    ))}
                </select>
                <button id='delete-category-button' onClick={handleDeleteVarietySubmit}>Delete Category</button>
            </form>

            <form id='add-item-form' name='add-item-form'>
                <h3>Add an Item</h3>
                <label htmlFor='item-name'>Item Name:</label>
                <input id='item-name' type='text' name='itemName' value={addItemForm.itemName} onChange={handleAddItemInput} placeholder='Item Name...'/>
                <label htmlFor='item-description'>Description:</label>
                <textarea id='item-description' name='itemDescription' rows='5' value={addItemForm.itemDescription} onChange={handleAddItemInput} placeholder='Item Description...'></textarea>
                <label htmlFor='item-variety'>Categories (separate by commas):</label>
                <input id='item-variety' type='text' name='variety' value={addItemForm.variety} onChange={handleAddItemInput} placeholder='Birthday,Gift,Etc...'/>
                <label htmlFor='item-price'>Price:</label>
                <input id='item-price' type='text' name='price' value={addItemForm.price} onChange={handleAddItemInput} placeholder='Price...'/>
                <label htmlFor='item-image'>Image:</label>
                <input id='item-image' type='text' name='image' value={addItemForm.image} onChange={handleAddItemInput} placeholder='Item Image Link...'/>
                <label htmlFor='item-image'>Author:</label>
                <input id='item-author' type='text' name='author' value={addItemForm.author} onChange={handleAddItemInput} placeholder='Author Image...'/>
                <h4>Featured Item:</h4>
                <div>
                    <input id='item-featured-true' type='radio' name='isFeatured' value='true' checked={addItemForm.isFeatured === true} onChange={handleAddItemInput} />
                    <label htmlFor='item-featured-true'>True</label>
                    <input id='item-featured-false' type='radio' name='isFeatured' value='false' checked={addItemForm.isFeatured === false} onChange={handleAddItemInput} />
                    <label htmlFor='item-featured-false'>False</label>
                </div>
                <button id='add-item-button' onClick={handleAddItemSubmit}>Add Item</button>
            </form>

            <form id='edit-item-form' name='edit-item-form'>
                <h3>Edit an Item</h3>

                <label htmlFor='item-to-edit'>Item to Edit:</label>
                <select id='item-to-edit' name='item-to-edit' onChange={(e) => {
                    const selectedItemData = items.find(item => item._id === e.target.value);
                    setSelectedEditItem(e.target.value);
                    setEditItemForm(selectedItemData);
                    console.log(e.target.value);
                }}>
                    {items.map(item => (
                        <option key={item._id} value={item._id}>{item.itemName}</option>
                    ))}
                </select>
                <label htmlFor='edit-item-name'>Item Name:</label>
                <input id='edit-item-name' type='text' name='itemName' value={editItemForm.itemName} onChange={handleEditItemInput} placeholder='Item Name...'/>
                <label htmlFor='edit-variety-name'>Description:</label>
                <textarea id='edit-item-description' name='itemDescription' rows='5' value={editItemForm.itemDescription} onChange={handleEditItemInput} placeholder='Item Description...'></textarea>
                <label htmlFor='edit-item-variety'>Categories (separate by commas):</label>
                <input id='edit-item-variety' type='text' name='variety' value={editItemForm.variety} onChange={handleEditItemInput} placeholder='Birthday,Gift,Etc...'/>
                <label htmlFor='edit-item-price'>Price:</label>
                <input id='edit-item-price' type='text' name='price' value={editItemForm.price} onChange={handleEditItemInput} placeholder='Price...'/>
                <label htmlFor='edit-item-image'>Image:</label>
                <input id='edit-item-image' type='text' name='image' value={editItemForm.image} onChange={handleEditItemInput} placeholder='Item Image Link...'/>
                <label htmlFor='item-image'>Author:</label>
                <input id='edit-item-author' type='text' name='author' value={editItemForm.author} onChange={handleEditItemInput} placeholder='Author Image...'/>
                <div>
                    <input id='edit-item-featured-true' type='radio' name='isFeatured' value='true' checked={editItemForm.isFeatured === true} onChange={handleEditItemInput} />
                    <label htmlFor='edit-item-featured-true'>True</label>
                    <input id='edit-item-featured-false' type='radio' name='isFeatured' value='false' checked={editItemForm.isFeatured === false} onChange={handleEditItemInput} />
                    <label htmlFor='edit-item-featured-false'>False</label>
                </div>
                <button id='edit-item-button' onClick={handleEditItemSubmit}>Edit Item</button>
            </form>

            <form id='delete-item-form' name='delete-item-form'>
            <h3>Delete an Item</h3>
                <label htmlFor='delete-item'>Category:</label>
                <select id='delete-item' name='delete-item' onChange={(e) => setSelectedItem(e.target.value)}>
                    {items.map(item => (
                        <option key={item._id} value={item._id}>{item.itemName}</option>
                    ))}
                </select>
                <button id='delete-item-button' onClick={handleDeleteItemSubmit}>Delete Item</button>
            </form>
        </main>
    )
};

export default Admin;