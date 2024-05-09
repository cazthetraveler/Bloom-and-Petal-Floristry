import { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';

import { LOGIN_USER, ADD_USER } from '../utils/mutations';

import './Login-Modal.css';

const LoginModal = ({onClose}) => {
    const toggleModal = () => {
        onClose();
    };

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });

    const [registerForm, setRegisterForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const handleLoginInput = (e) => {
        const {name, value} = e.target;
        setLoginForm({...loginForm, [name]:value});
    };

    const handleRegisterInput = (e) => {
        const {name, value} = e.target;
        setRegisterForm({...registerForm, [name]:value});
    };
    
    const [loginFormVisible, setLoginFormVisible] = useState(true);
    const toggleForm = (e) => {
        e.preventDefault();
        setLoginFormVisible(!loginFormVisible);
    };

    const [addUser, {error}] = useMutation(ADD_USER);
    const [loginUser, {loginError}] = useMutation(LOGIN_USER);

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        try {
            const {data} = await addUser({
                variables: {...registerForm}
            });
            Auth.login(data.addUser.token);
        } catch (error) {
            console.log(error);
            if (error.message.includes('duplicate key error')) {
                alert('Email already registered!');
            }
            alert('All fields must be filled out!');
        }
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            const {data} = await loginUser({
                variables: {...loginForm}
            });
            Auth.login(data.login.token);
        } catch (error) {
            console.log(error);
            alert('Invalid email or password!');
        }
    };

    const handleKeyPress = (event, submitFunction) => {
        if (event.key === 'Enter') {
            submitFunction(event);
        }
    };

    return(
        <section className='login-register-modal'>
            {loginFormVisible ? (
            <form id='login-form' name='login-form' onSubmit={handleLoginSubmit}>
                <section className='modal-title'>
                    <button id='close-modal-button' onClick={toggleModal} className='material-symbols-outlined'>close</button>
                    <h2>Login</h2>
                </section>

                <label htmlFor='login-email'>Email:</label>
                <input id='login-email' type='email' name='email' value={loginForm.email} onChange={handleLoginInput} onKeyPress={(e) => handleKeyPress(e, handleLoginSubmit)} placeholder='Email...'/>

                <label htmlFor='login-password'>Password:</label>
                <input id='login-password' type='password' name='password' value={loginForm.password} onChange={handleLoginInput} onKeyPress={(e) => handleKeyPress(e, handleLoginSubmit)} placeholder='Password...'/>

                <button id='to-register' onClick={toggleForm}>Don&#39;t have an account?</button>

                <button id='login-button'>LOGIN</button>
            </form>
            ) : (
                <form id='register-form' name='register-form' onSubmit={handleRegisterSubmit}>
                    <section className='modal-title'>
                        <button id='close-modal-button' onClick={toggleModal} className='material-symbols-outlined'>close</button>
                        <h2>Register</h2>
                    </section>
                    
                    <div>
                        <div>
                            <label htmlFor='register-first'>First Name:</label>
                            <input id='register-first' type='text' name='firstName' value={registerForm.firstName} onChange={handleRegisterInput} onKeyPress={(e) => handleKeyPress(e, handleRegisterSubmit)} placeholder='First Name' />
                        </div>
                        <div>
                            <label htmlFor='register-last'>Last Name:</label>
                            <input id='register-last' type='text' name='lastName' value={registerForm.lastName} onChange={handleRegisterInput} onKeyPress={(e) => handleKeyPress(e, handleRegisterSubmit)} placeholder='Last Name' />
                        </div>
                    </div>

                    <label htmlFor='register-email'>Email:</label>
                    <input id='register-email' type='email' name='email' value={registerForm.email} onChange={handleRegisterInput} onKeyPress={(e) => handleKeyPress(e, handleRegisterSubmit)} placeholder='Email...'/>

                    <label htmlFor='register-password'>Password:</label>
                    <input id='register-password' type='password' name='password' value={registerForm.password} onChange={handleRegisterInput} onKeyPress={(e) => handleKeyPress(e, handleRegisterSubmit)} placeholder='Password...'/>

                    <button id='to-login' onClick={toggleForm}>Already have an account?</button>

                    <button id='register-button'>REGISTER</button>
                </form>
            )}
        </section>
    );
};

export default LoginModal;