import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import { GET_ONE_USER } from '../utils/queries';
import { useQuery } from '@apollo/client';

const User = () => {
    const { id } = useParams();
    const userId = Auth.getProfile().data._id;
    const navigate = useNavigate();

    const { loading, error, data } = useQuery(GET_ONE_USER, {
        variables: { userId: userId }
    });

    useEffect(() => {
        if (loading || error || !data) {
            return;
        }

        const user = data.user;

        if (Auth.loggedIn() && user.isAdmin) {
            navigate('/account/admin');
        }

        if (id !== user._id) {
            navigate('/');
        }
    }, [loading, error, data, id, navigate]);

    if (loading) {
        return <p>Loading...</p>;
    } else if (error) {
        return <p>Error: {error.message}</p>;
    } else if (!data) {
        return <p>User not found!!</p>;
    }

    const user = data.user;

    return (
        <main className="user-page">
            <h2>User page :PP</h2>
            <h2>Welcome {user.firstName + ' ' + user.lastName}</h2>
            <p>This page serves no purpose yet.</p>
        </main>
    );
};

export default User;
